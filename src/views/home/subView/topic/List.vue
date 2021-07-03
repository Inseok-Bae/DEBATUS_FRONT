<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab
        id="tabFrame"
        v-for="(datum, index) of topicData"
        :key="'tab' + index"
        :title="datum.title"
        ><div
          v-for="(items, index) of datum.source"
          :key="'voting' + index"
          class="topicCardWrapper"
        >
          <topic-card
            v-for="item of items"
            :key="item.topicId"
            :item="item"
            :voting="datum.voting"
          /></div
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import topicCard from "./TopicCard.vue";

export default {
  props: {
    topicDataSource: Array,
  },
  components: {
    topicCard,
  },
  data() {
    return {
      answeredDataSource: [],
      votingDataSource: [],
      votedDataSource: [],
    };
  },
  watch: {
    topicDataSource(topicList) {
      let answered = 0;
      let voting = 0;
      let voted = 0;

      let pushDataSource = (source, count, topic) => {
        if (count % 3 === 0) {
          source.push([]);
        }
        source[source.length - 1].push(topic);
        return count + 1;
      };

      for (let topic of topicList) {
        if (topic.answeredFlag) {
          answered = pushDataSource(this.answeredDataSource, answered, topic);
        } else if (topic.votingCount < 100) {
          voting = pushDataSource(this.votingDataSource, voting, topic);
        } else {
          voted = pushDataSource(this.votedDataSource, voted, topic);
        }
      }
    },
  },
  computed: {
    topicData() {
      return [
        {
          title: "동의 중",
          source: this.votingDataSource,
          voting: true,
        },
        {
          title: "동의 완료",
          source: this.votedDataSource,
          voting: false,
        },
        {
          title: "답변 완료",
          source: this.answeredDataSource,
          voting: false,
        },
      ];
    },
  },
  methods: {},
};
</script>

<style scoped>
.TopicListLabel {
  color: #ff7100;
}
.topicCardWrapper {
  width: 100%;
  height: 140px;
}
#tabFrame {
  height: 140px;
  overflow: auto;
}
</style>