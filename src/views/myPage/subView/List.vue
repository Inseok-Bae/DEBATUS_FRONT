<template>
  <div id="listFrame" @scroll="scrollEvent">
    <div v-show="dataSource.length !== 0">
      <component
        :is="type"
        v-for="(item, index) in dataSource"
        :key="index"
        :item="item"
      />
    </div>
    <div id="emptyMessageBox" v-show="dataSource.length == 0">
      <p id="emptyMessage">
        아무 글도 존재하지 않아요. <br />새로운 {{ typeMsg }}의 주인이
        되어주세요.
      </p>
    </div>
  </div>
</template>

<script>
import opinionCard from "./cards/OpinionCard";
import issueCard from "./cards/IssueCard";
import topicCard from "./cards/TopicCard";

export default {
  components: {
    opinionCard,
    issueCard,
    topicCard,
  },
  props: {
    dataSource: Array,
    type: String,
    searchedFlag: Boolean,
  },
  computed: {
    typeMsg() {
      switch (this.type.replace("Card", "")) {
        case "opinion":
          return "의견";
          break;
        case "issue":
          return "이슈";
          break;
        case "topic":
          return "";
        default:
          return "";
      }
    },
  },
  methods: {
    scrollEvent(e) {
      if (
        e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight &&
        !this.searchedFlag
      ) {
        this.$emit("loadNewData", this.type.replace("Card", ""));
      }
    },
  },
};
</script>

<style scoped>
#emptyMessageBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#emptyMessage {
  line-height: 50px;
  color: silver;
}
</style>
