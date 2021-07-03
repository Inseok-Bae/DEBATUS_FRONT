<template>
  <div id="frame">
    <bg-cover id="bgCover" :mainImageShow="mainImageShow" />

    <transition name="slide">
      <div style="width: 100%; height: 100%" v-show="!mainImageShow">
        <div id="content">
          <p class="topicTitle">
            <img
              src="../../assets/images/topicIcon.svg"
              style="width: 30px; margin-right: 5px"
            />
            토픽
          </p>

          <topic-list :topicDataSource="topicDataSource" class="topicList" />
          <hr style="margin: 80px 0px 80px 0px" />
          <p class="issueTitle">
            <img
              src="../../assets/images/issueIcon.svg"
              style="width: 30px; margin-right: 5px"
            />
            이슈
          </p>

          <issue-list />
        </div>
        <debatus-footer />
      </div>
    </transition>
  </div>
</template>

<script>
import issueList from "./subView/issue/List.vue";
import topicList from "./subView/topic/List.vue";
import bgCover from "./subView/bgCover.vue";
import debatusFooter from "./subView/DebatusFooter.vue";

import getDataSource from "./mixins/getDataSource";

export default {
  components: {
    issueList,
    topicList,
    bgCover,
    debatusFooter,
  },
  mixins: [getDataSource],
  data() {
    return {
      topicDataSource: [],
    };
  },
  computed: {
    mainImageShow() {
      return this.$store.state.mainImageShow;
    },
  },
  async created() {
    this.topicDataSource = await this.getTopicDataSource();
    this.$store.commit("setHomeScreenShow", false);
  },
  mounted() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  },
};
</script>

<style scoped>
#frame {
  padding-top: calc(50px + 3%);
  width: 100%;
  height: 100%;
}
#bgCover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
#content {
  width: 80%;
  height: 100%;
  margin: 0px auto;
}
.topicTitle,
.issueTitle {
  font-size: 25px;
  width: 100%;
  text-align: left;
}
.topicTitle {
  color: #ff7100;
}
.issueTitle {
  color: #b301fa;
}
</style>
