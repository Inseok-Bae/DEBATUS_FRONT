<template>
  <div id="frame">
    <div id="titleWrapper">
      <p id="title">{{ title }}</p>
    </div>
    <hr id="titleBorder" />
    <div id="answerTextWrapper">
      <p v-for="(text, index) in answeredTextList" :key="index" class="texts">
        {{ text }}
      </p>
    </div>
    <div id="opinionArea">
      <b-row id="opinionsWrapper">
        <b-col>
          <p id="prosTitle">긍정</p>
          <Button
            v-if="$store.state.loginFlag"
            icon="pi pi-plus"
            class="p-button-rounded p-button-success addButton"
            v-tooltip.left-bottom="{
              content: '의견 추가',
              placement: 'left-bottom',
            }"
            @click="appendOpinion(1)"
          />
          <div id="prosOpinions" @wheel.stop>
            <opinion-view-card
              v-for="(data, index) in prosOpinions"
              class="opinionCards"
              :key="'pros' + index"
              :dataSource="data"
              color="green"
            />
            <p class="emptyMsg" v-if="prosOpinions.length == 0">
              아직 아무 피드백도 없어요.
            </p>
          </div>
        </b-col>
        <b-col>
          <p id="consTitle">부정</p>
          <Button
            v-if="$store.state.loginFlag"
            icon="pi pi-plus"
            class="p-button-rounded p-button-danger addButton"
            v-tooltip.left-bottom="{
              content: '의견 추가',
              placement: 'left-bottom',
            }"
            @click="appendOpinion(0)"
          />
          <div id="consOpinions" @wheel.stop>
            <opinion-view-card
              v-for="(data, index) in consOpinions"
              class="opinionCards"
              :key="'cons' + index"
              :dataSource="data"
              color="red"
            />
            <p class="emptyMsg" v-if="consOpinions.length == 0">
              아직 아무 피드백도 없어요.
            </p>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import opinionViewCard from "./OpinionViewCard";
import Button from "primevue/button";

export default {
  components: {
    opinionViewCard,
    Button,
  },
  props: {
    dataSource: Object,
    answeredTextList: Array,
    prosOpinions: Array,
    consOpinions: Array,
    feedbackIssue: Object,
  },
  computed: {
    title() {
      return this.dataSource.answeredFlag
        ? this.dataSource.answeredTitle
        : "아직 답변이 도착하지 않았어요.";
    },
  },
  methods: {
    appendOpinion(stand) {
      let issue = {
        title: this.feedbackIssue.title,
        id: this.feedbackIssue.issueId,
        stand: stand,
      };

      this.$store.commit("setOpinionModifyData", {
        source: {},
        opinions: [],
        issues: [issue],
        materials: [],
      });
      this.$router.push({
        name: "write",
        query: {
          mode: "opinionReturn",
        },
      });
    },
  },
};
</script>

<style scoped>
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
  text-align: left;
}
#titleBorder {
  width: 100%;
}
#answerTextWrapper {
  margin-top: 30px;
  text-align: left;
  height: 150px;
  padding: 10px 30px 10px 30px;
  overflow: auto;
  margin-bottom: 90px;
}
#opinionArea {
  width: 100%;
}
#opinionsWrapper {
  width: 100%;
  margin-top: 30px;
}
#consOpinions,
#prosOpinions {
  width: 100%;
  padding: 40px;
  height: 300px;
  overflow: auto;
}
#prosTitle,
#consTitle {
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
  margin-left: 5%;
  margin-bottom: 50px;
}
#prosTitle {
  color: green;
}
#consTitle {
  color: red;
}
.addButton {
  position: absolute;
  top: 0px;
  right: 0px;
}
.emptyMsg {
  margin-top: 70px;
  color: grey;
}
</style>
