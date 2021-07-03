<template>
  <div id="issueListFrame" @click="toggleissueListShow">
    <b-collapse v-model="issueListShow" class="mt-2 collapseArea">
      <div id="issueCardList">
        <issue-card
          v-for="(issueItem, index) of issueDataSource"
          :key="index"
          :item="issueItem"
        />
      </div>
    </b-collapse>
    <p id="issueListMsg">◀ 연관 이슈</p>
    <svg id="issueLine">
      <line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#b301fa"
        stroke-width="10"
      />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import issueCard from "./subView/IssueCard.vue";
import httpService from "../../../../service/httpService";

export default {
  components: {
    issueCard,
  },
  data() {
    return {
      issueListShow: false,
      issueDataSource: [],
    };
  },
  async mounted() {
    this.hide();
    this.issueDataSource = await httpService.get("/api/issue/byOpinionId/all", {
      id: this.$route.query.id,
    });
    console.log(this.issueDataSource);
  },
  methods: {
    toggleissueListShow() {
      if (this.issueListShow) {
        this.hide();
      } else {
        this.show();
      }
      this.issueListShow = !this.issueListShow;
    },
    hide() {
      d3.select("#issueListFrame").transition().style("width", "100px");
      d3.select("#leafs").transition().style("left", "20px");
    },
    show() {
      d3.select("#issueListFrame").transition().style("width", "1000px");
      d3.select("#leafs").transition().style("left", "420px");
    },
  },
};
</script>

<style scoped>
#issueListFrame {
  position: fixed;
  padding-top: 50px;
  left: 0px;
  top: 0px;
  height: 100%;
  background-color: white;
  opacity: 0.8;
  overflow: hidden;
}
#issueListFrame:hover {
  background: linear-gradient(
    0deg,
    #ffffffcc,
    #ffffffcc,
    #b301facc,
    #ffffffcc,
    #ffffffcc
  );
  background-size: 1000% 1000%;
  animation: AnimationName 2s ease infinite;
  cursor: pointer;
}

@keyframes AnimationName {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}
#issueListMsg {
  float: right;
  display: inline-block;
  margin-top: 10px;
  color: #b301fa;
}
.collapseArea {
  height: 100%;
  float: left;
}
#issueCardList {
  height: 100%;
  width: 800px;
  padding: 30px;
  float: left;
  overflow: auto;
}
#issueLine {
  float: right;
  width: 10px;
  height: 100%;
}
</style>
