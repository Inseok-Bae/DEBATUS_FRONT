<template>
  <div id="issueListFrame" @click="toggleissueListShow">
    <img id="topicIcon" src="../../../../assets/images/topicIcon.svg" />
    <p id="issueListMsg">▼ 연관 이슈</p>
    <b-collapse v-model="issueListShow" class="mt-2 collapseArea">
      <div id="issueCardList">
        <issue-card
          v-for="(issueItem, index) of issueDataSource"
          :key="index"
          :item="issueItem.issue"
        />
      </div>
    </b-collapse>
    <svg id="issueLine">
      <line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#b301fa"
        stroke-width="3"
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
    this.issueDataSource = await httpService.get("/api/issue/byTopicId", {
      id: this.$route.query.id,
    });
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
      d3.select("#issueListFrame").transition().style("height", "100px");
    },
    show() {
      d3.select("#issueListFrame").transition().style("height", "500px");
      d3.selectAll(".indexes").transition().style("color", "grey");
      d3.select(`#relatedIssueIndex`).transition().style("color", "#ff7100");
      setTimeout(() => {
        scrollTo({
          top: 2000,
          behavior: "smooth",
        });
      }, 370);
    },
  },
};
</script>

<style scoped>
#issueListFrame {
  margin: 0px auto;
  width: 70%;
  position: relative;
  overflow: hidden;
}
#topicIcon {
  position: absolute;
  top: 0px;
  left: calc(50% - 25px);
  width: 50px;
}
#issueListFrame:hover {
  background: linear-gradient(
    0deg,
    #ffffff50,
    #ffffff50,
    #b301fa50,
    #ffffff50,
    #ffffff50
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
  margin-top: 10px;
  color: #b301fa;
}
#issueCardList {
  margin-top: 100px;
  height: 330px;
  padding: 30px;
  z-index: 1;
  overflow: auto;
}
#issueLine {
  position: absolute;
  top: 50px;
  left: 0px;
  width: 100%;
  height: 50px;
}
</style>