<template>
  <div id="frame">
    <div id="topMargin" />
    <b-row id="titleArea">
      <div id="titleWrapper">
        <p id="title">LOGIN</p>
      </div>
    </b-row>
    <b-row class="contentArea" v-for="menu in Object.keys(menus)" :key="menu">
      <b-col cols="4" style="padding: 0px">
        <p class="label">{{ menu }} :</p>
      </b-col>
      <b-col cols="8" style="padding: 0px">
        <input
          :type="menus[menu].type"
          class="textInputs"
          v-model="menus[menu].value"
          @keydown="inputEvent"
        />
      </b-col>
    </b-row>
    <b-row id="buttonArea" ref="buttonArea">
      <div id="buttonWrapper">
        <a
          class="submitBtn effect04"
          data-sm-link-text="WELCOME"
          target="_blank"
          @click="submit"
          ><span>LOGIN</span></a
        >
      </div>
    </b-row>
    <b-row id="warningArea">
      <p id="warning" v-show="warningFlag">{{ warningMsg }}</p>
    </b-row>
  </div>
</template>

<script>
import httpService from "../../service/httpService";

export default {
  data() {
    return {
      menus: {
        ID: {
          value: "",
          type: "text",
        },
        PASSWORD: {
          value: "",
          type: "password",
        },
      },
      warningFlag: false,
      warningMsg: "",
    };
  },
  methods: {
    async submit() {
      if (this.menus["ID"].value.length == 0) {
        this.warningMsg = "ID를 입력해주세요.";
        this.warningFlag = true;
        return;
      }

      if (this.menus["PASSWORD"].value.length == 0) {
        this.warningMsg = "PASSWORD를 입력해주세요.";
        this.warningFlag = true;
        return;
      }

      let loader = this.$loading.show({
        container: this.$refs.buttonArea,
        canCancel: false,
      });

      try {
        let response = await httpService.get("/api/user/login", {
          userId: this.menus["ID"].value,
          password: this.menus["PASSWORD"].value,
        });
        if (response.permit == "false") {
          this.warningMsg = response.reason;
          this.warningFlag = true;
          loader.hide();
        } else {
          this.$store.commit("setLoginFlag", true);
          this.$store.commit("setUserId", this.menus["ID"].value);
          window.sessionStorage.setItem("jwt-auth-token", response.token);
          loader.hide();
          this.$router.push({ name: "home" });
        }
      } catch (err) {
        loader.hide();
        this.$bvModal.msgBoxOk(
          "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
          {
            title: "Error",
            size: "mg",
            buttonSize: "mg",
            headerBgVariant: "danger",
            okVariant: "light",
            bodyClass: "longModalContent",
            titleClass: "textWhite",
            centered: true,
          }
        );
      }
    },
    inputEvent(e) {
      if (e.code == "Enter") {
        this.submit();
      }
    },
  },
};
</script>

<style scoped>
#frame {
  width: 100%;
  height: 100%;
}
#topMargin {
  width: 100%;
  height: 35%;
}
#titleArea,
.contentArea,
#buttonArea,
#warningArea {
  width: 25%;
  height: auto;
  overflow: hidden;
  margin: 0px auto;
}
#titleArea {
  margin-bottom: 50px;
}
.contentArea {
  margin-bottom: 30px;
}
#buttonArea {
  margin-top: 70px;
}
#titleWrapper,
#buttonWrapper {
  width: 100%;
  height: auto;
  overflow: hidden;
}
#title {
  width: 100%;
  text-align: left;
  font-weight: bolder;
  font-size: 20px;
}
.label {
  width: 100%;
  text-align: left;
  margin: 0px;
  margin-top: 15px;
  color: grey;
  font-size: 13px;
}
.textInputs {
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  height: 40px;
  padding: 10px;
  text-align: left;
  font-size: 13px;
}
.textInputs:focus {
  outline: none !important;
  border-bottom: 1px solid red;
  box-shadow: 0 0 15px #dbdbdb;
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
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 30%;
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

#warning {
  width: 100%;
  text-align: center;
  font-size: 13px;
  margin-top: 50px;
  color: red;
}
</style>
