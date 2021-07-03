<template>
  <div>
    <!-- <p class="toggleModeTitle" id="toggleTopic">토픽 만들기</p>
    <div id="checkButton">
      <b-form-checkbox switch v-model="checked" @input="toggleMode" />
    </div>
    <p class="toggleModeTitle" id="toggleOpinion">의견 쓰기</p> -->
    <div id="buttonArea" @click="toggleMode">
      <div id="iconWrapper">
        <p style="color: #ff7100">▶ 토픽 만들기</p>
      </div>
    </div>
    <div id="colorBar"></div>
    <select-modal
      ref="modal"
      :dataSource="dataSource"
      @linkButtonClicked="linkButtonClicked"
      @modalHide="modalHide"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import httpService from "../../../../service/httpService";
import selectModal from "./subView/mainIssueSelect";

export default {
  components: {
    selectModal,
  },
  data() {
    return {
      checked: false,
      dataSource: [],
      visible: false,
      selected: false,
    };
  },
  mounted() {
    d3.select("#toggleTopic").style("color", "silver");
    d3.select("#toggleOpinion").style("color", "white");
  },
  methods: {
    async toggleMode() {
      try {
        this.dataSource = await httpService.get(
          "/api/required/user/publishableIssues"
        );
        this.$refs.modal.showModal();
      } catch (err) {
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
    modalHide() {
      if (this.selected) {
        this.$emit("toggleMode");
      }
    },
    linkButtonClicked(e) {
      this.$refs.modal.hideModal();
      this.$emit("toggleMode", e);
    },
  },
};
</script>

<style scoped>
#buttonArea {
  width: 90%;
  height: 100%;
  float: left;
  position: relative;
}
#colorBar {
  width: 10%;
  height: 100%;
  float: left;
  background-color: #ff7100;
}
#iconWrapper {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrowIcon {
  font-size: 25px;
}
#topicIcon {
  width: 50px;
  margin-left: 10px;
}
</style>
