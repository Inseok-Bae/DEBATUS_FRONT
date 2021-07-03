<template>
  <div id="frame">
    <div id="topMargin" />
    <b-row id="metaDataArea">
      <div id="metaDataWrapper">
        <p id="metaData">Writer : {{ dataSource.writer }}</p>
      </div>
    </b-row>
    <b-row id="contentArea">
      <div id="titleWrapper">
        <p id="title">{{ dataSource.title }}</p>
      </div>
      <div id="progressWrapper">
        <svg id="progressBar" height="30" />
        <div id="voteButton">
          <b-icon icon="person-plus" id="voteIcon" />
          Vote
        </div>
      </div>
      <div id="textWrapper">
        <p v-for="(text, index) in textList" :key="index" class="texts">
          {{ text }}
        </p>
      </div>
    </b-row>
    <b-row id="historyTitleArea">
      <div id="historyTitleWrapper">
        <p id="historyTitle">타임 라인</p>
        <div id="legend">
          <b-icon icon="circle-fill" id="opinionMarker" />
          <p id="opinionLabel">Hot Opinion</p>
          <b-icon icon="circle-fill" id="issueMarker" />
          <p id="issueLabel">Related Issue</p>
        </div>
      </div>
    </b-row>
    <b-row id="historyContentArea">
      <div id="timeline">
        <svg id="timelineSVG" height="100%" @wheel.stop />
      </div>
    </b-row>

    <b-row id="answerArea">
      <p id="answeredAreaLabel">답변</p>

      <answered-area
        id="answerAreaContent"
        :dataSource="dataSource"
        :answeredTextList="answeredTextList"
        :prosOpinions="prosOpinions"
        :consOpinions="consOpinions"
        :feedbackIssue="feedbackIssue"
      />
    </b-row>
    <div id="timeLineTooltip" />
    <issue-list />
    <navigator />
  </div>
</template>

<script>
import makeTimeLine from "./mixins/makeTimeLine";
import progressBar from "./mixins/progressBar";
import makeVoteButtonEvent from "./mixins/makeVoteButtonEvent";
import getDataSource from "./mixins/getDataSource";

import answeredArea from "./subView/AnsweredArea";
import issueList from "./subView/issueList/Main.vue";
import navigator from "./subView/Navigator.vue";

export default {
  components: {
    answeredArea,
    issueList,
    navigator,
  },
  mixins: [makeTimeLine, progressBar, makeVoteButtonEvent, getDataSource],
  data() {
    return {
      dataSource: {},
      textList: [],
      answeredTextList: [],
      issues: [],
      prosOpinions: [],
      consOpinions: [],
      feedbackIssue: {},
    };
  },
  computed: {
    loginFlag() {
      return this.$store.state.loginFlag;
    },
  },
  async mounted() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.$store.commit("setTopicScreenShow", true);

    await this.getDataSource(this.$route.query.id);
    this.makeHistoryData();
    this.makeHistoryLine();
    this.makeHistoryDots();
    this.makeHistoryAxis();
    this.makeHistoryText();
    this.makeBar();
    this.makeVoteButtonEvent();

    setTimeout(() => {
      this.$store.commit("setTopicScreenShow", false);
    }, 300);
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
  height: 60px;
}
#metaDataArea {
  width: 70%;
  min-width: 500px;
  height: auto;
  overflow: hidden;
  margin: 0px auto;
  padding-top: 90px;
}
#metaDataWrapper {
  width: 100%;
  text-align: right;
}
#metaData {
  font-size: 13px;
  color: grey;
}

#contentArea {
  width: 73%;
  min-width: 500px;
  margin: 0px auto;
}
#titleWrapper,
#textWrapper {
  width: 100%;
  word-break: break-all;
  white-space: pre-line;
  text-align: left;
}
#textWrapper {
  margin-top: 60px;
  height: auto;
  padding: 10px 30px 10px 30px;
  overflow: hidden;
}
#titleWrapper {
  width: 100%;
  height: 60px;
  overflow: hidden;
  padding: 0px 30px 0px 30px;
  display: flex;
}
#title {
  width: 100%;
  font-size: 20px;
  margin: 0px;
}
#progressWrapper {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
#progressBar {
  margin-left: 2%;
  margin-right: 2%;
}
#voteButton {
  float: right;
  width: 7%;
  padding: 10px;
  border: 1px solid #ff7100;
  border-radius: 10px;
  margin-bottom: 5px;
  font-size: 85%;
}
#voteIcon {
  font-size: 100%;
}

#historyTitleArea {
  width: 73%;
  min-width: 500px;
  height: 100px;
  padding-top: 50px;
  margin: 0px auto;
  margin-top: 2%;
}
#historyTitleWrapper {
  width: 100%;
}
#historyTitle {
  color: grey;
  font-size: 20px;
  display: inline-block;
  float: left;
}
#legend {
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}
#opinionMarker,
#opinionLabel,
#issueMarker,
#issueLabel {
  float: right;
  font-size: 12px;
  margin-bottom: 0px;
}
#issueMarker,
#opinionMarker {
  margin-right: 10px;
}
#issueMarker {
  margin-left: 25px;
  color: #b301fa;
}
#opinionMarker {
  color: #b1e000;
}

#historyContentArea {
  width: 73%;
  min-width: 500px;
  height: 270px;
  padding: 50px 50px 20px 50px;
  margin: 0px auto;
  border: 1px solid #e4e4e4;
  overflow: auto;
}
#timeline {
  width: auto;
}
#timeLineTooltip {
  position: absolute;
  max-width: 400px;
  height: 30px;
  padding: 2px 15px 2px 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: black;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#answerArea {
  width: 73%;
  min-width: 500px;
  height: 100%;
  overflow: hidden;
  margin: 0px auto;
  margin-top: 100px;
}
#answeredAreaLabel {
  color: #ff7100;
  font-size: 20px;
  display: inline-block;
  float: left;
}
#answerAreaContent {
  width: 100%;
  height: auto;
}
</style>
