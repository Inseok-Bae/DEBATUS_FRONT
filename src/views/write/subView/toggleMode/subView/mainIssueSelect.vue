<template>
  <div>
    <Dialog
      :visible.sync="visible"
      :modal="true"
      :header="header"
      :style="{ width: '40vw' }"
      position="right"
      @hide="modalHide"
    >
      <div id="contentFrame">
        <List
          id="cardList"
          :dataSource="dataSource"
          type="issue"
          mode="topic"
          @linkButtonClicked="linkButtonClicked"
          @wheel.stop
        />
        <div style="width: 100%; height: 100%" v-if="dataSource.length == 0">
          <p id="noDataMsg">아직은 토픽을 만들 수 없어요.</p>
          <hr />
          <p
            class="condition"
            style="font-size: 17px; color: #ff7100; margin-left: 0px"
          >
            <b-icon icon="question-square" />
            토픽 생성 조건
          </p>
          <p class="condition">
            - 토픽은 1개 이상의
            <span style="color: #b301fa; font-weight: bolder">연관 이슈</span>를
            바탕으로 만들 수 있습니다.
          </p>
          <p class="condition">
            조건 1. 연관 이슈에 등록된 총 의견 수
            <span style="font-weight: bolder">10개</span> 이상
          </p>
          <p class="condition">
            조건 2. 연관 이슈에 자기가 등록한 의견
            <span style="font-weight: bolder">1개</span> 이상
          </p>
          <p class="condition">
            조건 3. 자기가 등록한 의견의 추천 수
            <span style="font-weight: bolder">20</span> 이상
          </p>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import List from "../../searchArea/subView/searchPanel/subView/List";
import Dialog from "primevue/dialog";

export default {
  props: {
    dataSource: Array,
  },
  components: {
    List,
    Dialog,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    header() {
      return this.dataSource.length == 0 ? "알림" : "중심 이슈 선택";
    },
  },
  methods: {
    linkButtonClicked(e) {
      this.$emit("linkButtonClicked", e);
    },
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
    modalHide() {
      this.$emit("modalHide");
    },
  },
};
</script>

<style scoped>
#cardList {
  margin: 0px auto;
  margin-top: 3%;
  margin-bottom: 3%;
  width: 100%;
  height: 23vw;
  overflow: auto;
  padding: 1%;
}
#noDataMsg {
  text-align: center;
  margin: 15px 0px;
  font-weight: 700;
  letter-spacing: -0.5px;
  font-size: 1vw;
}
#questionIcon {
  margin-top: 5%;
  color: grey;
}
#questionIcon:hover {
  cursor: pointer;
}
#contentFrame {
  padding-top: 3%;
}
.condition {
  font-size: 13px;
  text-align: left;
  margin-left: 15px;
}
</style>
