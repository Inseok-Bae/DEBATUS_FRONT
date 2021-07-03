<template>
  <div id="frame">
    <b-row id="margin" />
    <b-row id="personalPrivacyArea">
      <p>개인정보 수집 및 이용 동의</p>
      <div id="personalPrivacy">
        <div v-for="policy in policyText.policy" :key="policy.name">
          <p style="font-weight: bolder">* {{ policy.name }}</p>
          <p style="margin-left: 20px">- {{ policy.text }}</p>
        </div>
        <br />
        <p v-for="agreement in policyText.agreement" :key="agreement">
          {{ agreement }}
        </p>
      </div>
      <div style="width: 100%">
        <label id="agreeButton"
          ><input
            type="checkbox"
            v-model="policyChecked"
            id="checkbox"
          />동의합니다.</label
        >
      </div>
    </b-row>
    <b-row
      v-for="inputName in Object.keys(inputs)"
      :key="inputs[inputName].name"
      class="inputAreas"
    >
      <b-col cols="6">
        <p class="inputNames">{{ inputs[inputName].name }} :</p>
      </b-col>
      <b-col cols="6">
        <input
          :type="inputs[inputName].type"
          class="textInputs"
          :id="inputName + 'Input'"
          v-model="inputs[inputName].value"
          :placeholder="inputs[inputName].placeHolder"
          v-tooltip.bottom-right="{
            content: inputs[inputName].limit,
            placement: 'right',
            offset: 30,
            show: inputs[inputName].tooltipShow,
            trigger: 'manual',
          }"
        />
      </b-col>
    </b-row>
    <b-row id="submitArea">
      <a
        class="submitBtn effect04"
        data-sm-link-text="WELCOME"
        target="_blank"
        @click="submit"
        ><span>회원가입</span></a
      >
    </b-row>
    <b-modal
      :visible.sync="showModal"
      @hidden="modalHidden"
      hide-header
      hide-footer
      centered
    >
      <div id="modalContent">
        <p id="modalMessage" v-for="msg in modalMessage" :key="msg">
          {{ msg }}
        </p>
        <b-button @click="modalButtonClicked" id="modalbutton">OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import * as d3 from "d3";
import httpService from "../../service/httpService";

import inputsData from "./data/inputs";
import policyText from "./data/policyText";

import validation from "./mixins/validation";

export default {
  data() {
    return {
      policyText,
      policyChecked: false,
      idExist: false,
      inputs: {},
      showModal: false,
      modalMessage: "중복된 ID에요.",
      complete: false,
    };
  },
  mixins: [validation],
  created() {
    this.inputs = inputsData;
  },
  mounted() {
    d3.selectAll(".textInputs").style("border-bottom", "1px solid black");
  },
  methods: {
    modalButtonClicked() {
      if (this.complete) {
        this.$router.push({ name: "login" });
      }
      if (this.policyChecked == false || this.idExist == true) {
        this.showModal = false;
      }
    },
    async submit() {
      let flag = this.validate();

      if (!flag) {
        return;
      } else {
        this.idExist = await httpService.get("/api/user/exist", {
          userId: this.inputs["userId"].value,
        });

        if (this.policyChecked == false) {
          this.modalMessage = ["개인정보 수집 및 이용 동의에 체크해주세요."];
          this.showModal = true;
          return;
        } else if (this.idExist) {
          d3.select("#userIdInput").style("border-bottom", "1px solid red");
          this.modalMessage = [
            `${this.inputs["userId"].value} 는 중복된 ID에요.`,
          ];
          this.showModal = true;
          return;
        } else {
          this.complete = true;

          let tempBody = {};

          for (let attr of Object.keys(this.inputs)) {
            if (attr !== "confirmPassword") {
              tempBody[attr] = this.inputs[attr].value;
            }
          }

          try {
            await httpService.post("/api/user", tempBody);
          } catch (err) {
            this.$bvModal.msgBoxOk("오류 발생! 잠시 후 다시 시도해주세요.", {
              title: "Error",
              size: "mg",
              buttonSize: "mg",
              headerBgVariant: "danger",
              okVariant: "light",
              bodyClass: "longModalContent",
              titleClass: "textWhite",
              centered: true,
            });
            return;
          }

          this.modalMessage = [
            "회원가입이 완료되었어요.",
            "OK 버튼 클릭 시, 로그인 화면으로 이동할게요.",
          ];
          this.showModal = true;
          return;
        }
      }
    },
    modalHidden() {
      this.showModal = false;
      if (this.complete) {
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#frame {
  width: 100%;
  height: 100%;
}
#margin {
  width: 100%;
  height: 12%;
}
.inputAreas,
#submitArea {
  width: 37%;
  min-width: 650px;
  height: auto;
  overflow: hidden;
  margin: 0px auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputNames {
  width: 100%;
  text-align: left;
  font-size: 13px;
  margin: 0px;
  margin-top: 15px;
}
.textInputs {
  border: none;
  width: 100%;
  height: 40px;
  padding: 10px;
  text-align: center;
}
.textInputs:focus {
  outline: none !important;
  box-shadow: 0 0 15px #dbdbdb;
}
#personalPrivacyArea {
  width: 37%;
  min-width: 650px;
  margin: 0px auto;
  text-align: left;
  height: auto;
  overflow: hidden;
  margin-bottom: 30px;
}
#personalPrivacy {
  width: 100%;
  height: 120px;
  overflow: auto;
  padding: 20px;
  font-size: 13px;
  margin-bottom: 5px;
  border: 1px solid rgba(192, 192, 192, 0.555);
}
#agreeButton {
  float: right;
  font-size: 13px;
}
#checkbox {
  margin-right: 10px;
  width: 10px;
  height: 10px;
}
#modalContent {
  width: 100%;
  padding: 10px;
}
#modalMessage {
  height: 30px;
}
#modalbutton {
  float: right;
}
#submitArea {
  margin-top: 100px;
  margin-bottom: 50px;
}
#submitButton {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /*   padding: 2em 0em; */
}

.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #fff;
  padding: 40px 0px;
  width: 240px;
}

.submitBtn {
  letter-spacing: 0.1em;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 45px;
  max-width: 100px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
}
.submitBtn:hover {
  text-decoration: none;
}

/*btn_background*/
.effect04 {
  --uismLinkDisplay: var(--smLinkDisplay, inline-flex);
  display: var(--uismLinkDisplay);
  color: #000;
  outline: solid 2px #000;
  position: relative;
  transition-duration: 0.4s;
  overflow: hidden;
}

.effect04::before,
.effect04 span {
  margin: 0 auto;
  transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  transition-duration: 0.4s;
}

/* 文字1を上に */
.effect04:hover {
  background-color: #000;
}

/* HOVERしたら文字1を上に */
.effect04:hover span {
  -webkit-transform: translateY(-400%) scale(-0.1, 20);
  transform: translateY(-400%) scale(-0.1, 20);
}

/*文字2*/
.effect04::before {
  content: attr(data-sm-link-text);
  color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-transform: translateY(500%) scale(-0.1, 20);
  transform: translateY(500%) scale(-0.1, 20);
}

/* HOVERしたら文字2を上に */
.effect04:hover::before {
  letter-spacing: 0.05em;
  -webkit-transform: translateY(0) scale(1, 1);
  transform: translateY(0) scale(1, 1);
}
</style>
