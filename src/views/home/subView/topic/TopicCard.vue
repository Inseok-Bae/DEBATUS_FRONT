<template>
  <div id="topicCardFrame" @click="clicked">
    <div id="content">
      <p id="title">
        {{ item.title }}
      </p>

      <svg width="100%" height="5" v-if="voting">
        <rect x="0" y="0" width="100%" height="5" fill="silver" />
        <rect x="0" y="0" :width="votingGauge" height="5" fill="#ff7100" />
      </svg>
      <p id="votingGuage" v-if="voting">
        <span style="color: #ff7100">{{ item.votingCount }}</span> / 100
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    voting: Boolean,
  },
  computed: {
    votingGauge() {
      return (this.item.votingCount / 100) * 100 + "%";
    },
  },
  methods: {
    clicked() {
      this.$router.push({
        name: "topic",
        query: {
          id: this.item.topicId,
        },
      });
    },
  },
};
</script>

<style scoped>
#topicCardFrame {
  float: left;
  width: 33.333%;
  height: 100%;
  padding: 10px;
}
#content {
  padding: 25px;
  width: 100%;
  height: 100%;
  border: 1px solid silver;
}
#content:hover {
  background-color: #ffb37525;
  border: 1px solid #ff7100;
  cursor: pointer;
}
#title {
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: black;
}
#votingGuage {
  float: right;
  font-size: 13px;
  color: grey;
}
</style>