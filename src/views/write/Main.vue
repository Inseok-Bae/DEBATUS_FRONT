<template>
  <div id="frame">
    <div id="topMargin" />
    <div
      id="topMargin_answer"
      v-if="this.mode == 'answer' || this.mode == 'material'"
    />
    <div id="titleArea" class="content">
      <p id="title">{{ title }}</p>
    </div>
    <div id="textArea" class="content">
      <write-content ref="writeContent" @inputEvent="inputEvent" />
    </div>
    <div v-show="mainIssueShow" id="mainIssueArea" class="content">
      <p id="mainIssueTitle">
        <i class="pi pi-circle-on mainIssueIcon" />
        <span style="font-weight: bolder; margin-right: 5px">중심 이슈 : </span>
        {{ mainIssueTitle }}
      </p>
    </div>
    <div
      id="searchArea"
      class="content"
      v-if="!(this.mode == 'answer') && !(this.mode == 'material')"
    >
      <search-area
        ref="searchArea"
        :mainIssueId="mainIssueId"
        :topicWriteModeFlag="mainIssueShow"
        :relatedIssues.sync="relatedIssues"
        :relatedOpinions.sync="relatedOpinions"
        :relatedMaterials.sync="relatedMaterials"
      />
    </div>
    <div id="bottomMargin" class="content" />
    <publish-button @publish="publish" />
    <toggleMode
      id="toggleMode"
      v-if="toggleModeShow"
      @toggleMode="toggleMode"
    />
  </div>
</template>

<script>
import * as d3 from "d3";

import searchArea from "./subView/searchArea/Main";
import writeContent from "./subView/WriteContent";
import publishButton from "./subView/publishButton";
import toggleMode from "./subView/toggleMode/Main";

import publish from "./mixins/Publish";
import setData from "./mixins/SetData";

export default {
  components: {
    searchArea,
    writeContent,
    publishButton,
    toggleMode,
  },
  mixins: [publish, setData],
  computed: {
    title() {
      switch (this.mode) {
        case undefined:
          return "의견 쓰기";
          break;
        case "opinionReturn":
          return "의견 쓰기";
          break;
        case "topic":
          return "토픽 만들기";
          break;
        case "topicReturn":
          return "토픽 만들기";
          break;
        case "modify":
          return "의견 수정하기";
          break;
        case "modifyTopic":
          return "토픽 수정하기";
          break;
        case "answer":
          return "답변하기";
          break;
        case "material":
          return "자료 작성하기";
          break;
      }
    },
    toggleModeShow() {
      return this.mode == undefined || this.mode == "opinionReturn";
    },
    mainIssueShow() {
      return this.mode == "topic" ||
        this.mode == "modifyTopic" ||
        this.mode == "topicReturn" ||
        this.mode == "material"
        ? true
        : false;
    },
  },
  data() {
    return {
      mode: "",

      relatedIssues: [],
      relatedOpinions: [],
      relatedMaterials: [],
      content: {
        title: "",
        text: "",
      },
      mainIssueTitle: "",
      mainIssueId: 0,

      published: false,
      goTopic: false,
    };
  },
  mounted() {
    d3.select("#searchArea").style("border-left", "0.5em solid #b301fa");
    this.mode = this.$route.query.mode;

    if (this.$route.query.relatedOpinions != undefined) {
      this.setRelatedOpinions(this.$route.query.relatedOpinions);
    }

    if (this.$route.query.relatedIssues != undefined) {
      this.setRelatedIssues(this.$route.query.relatedIssues);
    }

    if (this.mode == "modify" || this.mode == "opinionReturn") {
      this.setOpinionData();
    } else if (
      this.mode == "topic" ||
      this.mode == "modifyTopic" ||
      this.mode == "topicReturn" ||
      this.mode == "material"
    ) {
      this.setTopicData();
    }
  },
  destroyed() {
    if (!this.published && !this.goTopic) {
      if (this.mode == "topic" || this.mode == "modifyTopic") {
        this.$store.commit("setWritingStateMode", "topicReturn");
        this.$store.commit("setTopicModifyData", {
          source: this.content,
          issues: this.relatedIssues,
          mainIssueData: {
            title: this.mainIssueTitle,
            id: this.mainIssueId,
          },
        });
      } else {
        this.$store.commit("setWritingStateMode", "opinionReturn");
        this.$store.commit("setOpinionModifyData", {
          source: this.content,
          opinions: this.relatedOpinions,
          issues: this.relatedIssues,
          materials: this.relatedMaterials,
        });
      }
      this.$store.commit("setWritingState", true);
    }
  },
  methods: {
    inputEvent(e) {
      this.content = e;
    },
    toggleMode(e) {
      this.goTopic = true;
      this.$router.push({
        name: "write",
        query: {
          mode: "topic",
          mainIssueData: JSON.stringify(e),
        },
      });
    },
  },
};
</script>

<style scoped>
#frame {
  width: 67%;
  min-width: 500px;
  height: 100%;
  margin: 0px auto;
}
#topMargin {
  width: 100%;
  height: 10%;
}
#topMargin_answer {
  width: 100%;
  height: 13%;
}
.content {
  width: 100%;
}
#titleArea {
  height: 4%;
  margin-bottom: 3%;
}
#title {
  text-align: left;
  font-size: 20px;
  margin-left: 1%;
  color: silver;
  font-weight: 1000;
}
#textArea {
  height: 43%;
  margin-bottom: 3%;
}
#searchArea {
  padding-left: 5%;
}
#mainIssueArea {
  height: 5%;
  margin-bottom: 1%;
}
.mainIssueIcon {
  color: #b301fa;
  margin-right: 10px;
}
#mainIssueTitle {
  text-align: left;
}
#bottomMargin {
  height: 5%;
}
#toggleMode {
  z-index: 1;
  height: 100%;
  width: 140px;
  position: fixed;
  top: 0%;
  right: 0%;
}
#toggleMode:hover {
  background: linear-gradient(
    269deg,
    #ffffff50,
    #ffffff50,
    #ff710050,
    #ffffff50,
    #ffffff50
  );
  background-size: 1000% 1000%;
  animation: AnimationName 2s ease infinite;
  cursor: pointer;
}

@keyframes AnimationName {
  0% {
    background-position: 100% 48%;
  }
  100% {
    background-position: 0% 53%;
  }
}
</style>