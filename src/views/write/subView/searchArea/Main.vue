<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab
        title="연관 이슈"
        title-link-class="issueTabTitle"
        active
        @click="tabClicked('issue')"
        ><div class="searchPanelArea">
          <search-panel
            @linkButtonClicked="appendNode"
            type="issue"
            :relatedIssues="relatedIssues"
            :topicWriteModeFlag="topicWriteModeFlag"
          />
        </div>

        <div class="nodeListArea">
          <node-list
            :nodes="relatedIssues"
            type="issue"
            @removeItem="removeItem"
          /></div
      ></b-tab>
      <b-tab
        v-if="showFlag"
        title="연관 의견"
        title-link-class="opinionTabTitle"
        @click="tabClicked('opinion')"
        ><div class="searchPanelArea">
          <search-panel @linkButtonClicked="appendNode" type="opinion" />
        </div>

        <div class="nodeListArea">
          <node-list
            :nodes="relatedOpinions"
            type="opinion"
            @removeItem="removeItem"
          /></div
      ></b-tab>
      <b-tab v-if="showFlag" title="연관 자료" @click="tabClicked('material')">
        <div class="searchPanelArea">
          <search-panel @linkButtonClicked="appendNode" type="material" />
        </div>

        <div class="nodeListArea">
          <node-list
            :nodes="relatedMaterials"
            type="material"
            @removeItem="removeItem"
          />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import * as d3 from "d3";

import searchPanel from "./subView/searchPanel/Main";
import nodeList from "./subView/NodeList";

import appendNode from "./mixins/AppendNode";

export default {
  components: {
    searchPanel,
    nodeList,
  },
  props: {
    mainIssueId: Number,
    topicWriteModeFlag: Boolean,
  },
  mixins: [appendNode],
  data() {
    return {
      issueStandPopupShow: true,
      relatedIssues: [],
      relatedOpinions: [],
      relatedMaterials: [],
    };
  },
  computed: {
    showFlag() {
      return this.$route.query.mode == "topic" ||
        this.$route.query.mode == "modifyTopic" ||
        this.$route.query.mode == "topicReturn" ||
        this.$route.query.mode == "material"
        ? false
        : true;
    },
  },
  methods: {
    removeItem(e) {
      let items = {
        issue: this.relatedIssues,
        opinion: this.relatedOpinions,
        material: this.relatedMaterials,
      };

      for (let i = 0; i < items[e.type].length; i++) {
        if (items[e.type][i].id == e.id) {
          items[e.type].splice(i, 1);
        }
      }
    },
    tabClicked(e) {
      let colorSet = {
        material: "black",
        issue: "#B301FA",
        opinion: "#B1E000",
      };

      d3.select("#searchArea").style(
        "border-left",
        `0.5em solid ${colorSet[e]}`
      );
    },
    setNodes(e) {
      this.relatedIssues = e.issues;
      this.relatedOpinions = e.opinions;
      this.relatedMaterials = e.materials;
    },
  },
};
</script>

<style scoped>
.searchPanelArea {
  width: 100%;
  min-height: 7%;
  height: auto;
  overflow: hidden;
}
.nodeListArea {
  width: 100%;
  margin-top: 1.5%;
  height: 5%;
  overflow: auto;
  display: flex;
  align-items: center;
}
</style>