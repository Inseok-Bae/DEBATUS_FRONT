<template>
  <div id="topicCardFrame" @click="clicked">
    <p id="title">
      {{ item.title
      }}<b-icon
        id="answeredFlag"
        icon="check"
        variant="success"
        v-show="item.answered !== null"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
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
  width: 100%;
  height: 60px;
  border-bottom: 1px solid silver;
  margin-bottom: 30px;
  padding: 10px;
}
#topicCardFrame:hover {
  background-color: #ffb37525;
  border-bottom: 2px solid #ff7100;
  cursor: pointer;
}
#title {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: black;
}
#answeredFlag {
  float: right;
}
</style>