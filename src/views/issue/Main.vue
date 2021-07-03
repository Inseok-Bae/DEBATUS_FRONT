<template>
  <div id="frame">
    <topic-list :topicDataSource="topicDataSource" />
    <div id="content">
      <issue-line id="issueLine" />
      <div id="titleArea">
        <p id="title">{{ issueDataSource.title }}</p>
      </div>
      <div id="contentArea">
        <div id="scoreWrapper">
          <div id="prosScore" />
          <div id="consScore" />
        </div>
        <div class="opinionViwer" @wheel.stop>
          <pros-card
            v-for="(data, index) in prosOpinions"
            class="opinionCards"
            :key="'pros' + index"
            :dataSource="data"
            color="#008000"
          />
        </div>
        <div class="opinionViwer" @wheel.stop>
          <cons-card
            v-for="(data, index) in consOpinions"
            class="opinionCards"
            :key="'cons' + index"
            :dataSource="data"
            color="#ff0000"
          />
        </div>
      </div>
      <div id="materialTitleArea">
        <p id="materialTitle">자료</p>
        <Button
          v-if="$store.state.loginFlag"
          id="materialAddButton"
          icon="pi pi-plus"
          class="p-button-rounded addButton"
          v-tooltip.right-bottom="{
            content: '자료 추가',
            placement: 'right-bottom',
            offset: 5,
          }"
          @click="writeMaterial"
        />
      </div>

      <div id="materialViewer" @wheel.stop>
        <material-card
          v-for="(data, index) in materialDataSource"
          class="materialCards"
          :key="'material' + index"
          :dataSource="data"
          color="#B301FA50"
        />
        <p id="materialEmptyMsg" v-show="materialDataSource.length == 0">
          "자료가 없어요."
        </p>
      </div>
    </div>
    <navigator :noTopic="noTopic" />
  </div>
</template>

<script>
import getDataSource from "./mixins/getDataSource";
import appendScore from "./mixins/appendScore";

import prosCard from "./subView/ProsCard";
import consCard from "./subView/ConsCard";
import materialCard from "./subView/MaterialCard";
import issueLine from "./subView/IssueLine.vue";
import topicList from "./subView/topicList/Main.vue";
import navigator from "./subView/Navigator.vue";

import Button from "primevue/button";

export default {
  mixins: [getDataSource, appendScore],
  components: {
    prosCard,
    consCard,
    materialCard,
    issueLine,
    Button,
    topicList,
    navigator,
  },
  data() {
    return {
      themeColor: "white",
    };
  },

  watch: {
    $route: async function (newVal) {
      if (newVal.name == "issue") {
        await this.getDataSource();
        this.appendScore();
      }
    },
  },

  async mounted() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
    await this.getDataSource();
    this.appendScore();
  },
  methods: {
    writeMaterial() {
      this.$router.push({
        name: "write",
        query: {
          mode: "material",
          mainIssueData: JSON.stringify({
            id: this.issueDataSource.issueId,
            title: this.issueDataSource.title,
          }),
        },
      });
    },
  },
};
</script>

<style scoped>
#issueLine {
  position: absolute;
  top: 0px;
  left: calc(50% - 35px);
  height: 1350px;
  width: 70px;
}
#frame {
  width: 70%;
  height: 100%;
  min-width: 870px;
  margin: 0px auto;
  padding-top: 50px;
}
#content {
  width: 100%;
  height: 100%;
  position: relative;
}
#titleArea {
  width: 100%;
  height: auto;
  overflow: hidden;
}
#title {
  margin-top: 160px;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: #b301fa;
  text-align: center;
  word-break: break-all;
  white-space: pre-line;
}
#contentArea {
  margin-top: 5%;
  width: 100%;
  height: 1000px;
}
#scoreWrapper {
  width: 100%;
  height: 15%;
  min-height: 150px;
}
#prosScore,
#consScore {
  width: 50%;
  float: left;
  height: 100%;
  padding: 0px;
}
.opinionViwer {
  float: left;
  width: 50%;
  height: 800px;
  overflow: auto;
  margin-top: 80px;
}
.opinionCards {
  margin-bottom: 30px;
}
#materialTitleArea {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-top: 100px;
}
#materialTitle {
  width: 100%;
  text-align: center;
  color: #b301fa;
  font-size: 30px;
}
#materialAddButton {
  float: right;
}
#materialViewer {
  width: 100%;
  min-height: 100px;
}
.materialCards {
  margin-bottom: 30px;
}
#margin {
  width: 100%;
  height: 30px;
}
#materialEmptyMsg {
  color: silver;
}
</style>
