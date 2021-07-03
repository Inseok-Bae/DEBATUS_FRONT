<template>
  <div
    id="topicListFrame"
    @click="toggleTopicListShow"
    v-show="topicDataSource.length !== 0"
  >
    <b-collapse v-model="topicListShow" class="mt-2 collapseArea">
      <div id="topicCardList">
        <topic-card
          v-for="(topicItem, index) of topicDataSource"
          :key="index"
          :item="topicItem"
        />
      </div>
    </b-collapse>
    <img id="topicIcon" src="../../../../assets/images/topicIcon.svg" />
    <p id="topicListMsg">▲ 연관 토픽</p>
  </div>
</template>

<script>
import * as d3 from "d3";
import topicCard from "./subView/TopicCard.vue";

export default {
  components: {
    topicCard,
  },
  props: {
    topicDataSource: Array,
  },
  data() {
    return {
      topicListShow: false,
    };
  },
  async mounted() {
    this.hide();
  },
  methods: {
    toggleTopicListShow() {
      if (this.topicListShow) {
        this.hide();
      } else {
        this.show();
      }
      this.topicListShow = !this.topicListShow;
    },
    hide() {
      d3.select("#topicListFrame").transition().style("height", "70px");
      d3.select("#topicIcon")
        .transition()
        .style("top", "-80px")
        .style("bottom", null);
    },
    show() {
      d3.select("#topicListFrame").transition().style("height", "500px");
      d3.select("#topicIcon")
        .transition()
        .style("top", null)
        .style("bottom", "0px");
    },
  },
};
</script>

<style scoped>
#topicListFrame {
  width: 100%;
  position: relative;
  overflow: hidden;
}
#topicIcon {
  position: absolute;
  left: calc(50% - 75px);
  width: 150px;
}
#topicListFrame:hover {
  background: linear-gradient(
    0deg,
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
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}
#topicListMsg {
  float: right;
  margin-top: 10px;
  color: #ff7100;
}
#topicCardList {
  height: 330px;
  padding: 30px;
  overflow: auto;
}
</style>