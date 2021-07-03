<template>
  <div id="issueCardFrame" @click="clicked">
    <p id="title">{{ item.title }}</p>
    <div class="bar" :style="consBarStyle" />
    <div class="bar" :style="prosBarStyle" />
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    prosBarStyle() {
      let prosRatio =
        this.item.prosCount / (this.item.prosCount + this.item.consCount);
      return `background-color:green; width: ${
        prosRatio * 100
      }px; margin-right:5px;`;
    },
    consBarStyle() {
      let consRatio =
        this.item.consCount / (this.item.prosCount + this.item.consCount);
      return `background-color:red; width: ${consRatio * 100}px;`;
    },
  },
  methods: {
    clicked() {
      this.$router.push({
        name: "issue",
        query: {
          id: this.item.issueId,
        },
      });
    },
  },
};
</script>

<style scoped>
#issueCardFrame {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid silver;
  margin-bottom: 30px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.925);
}
#issueCardFrame:hover {
  background-color: #ce5cfc18;
  border-bottom: 2px solid #b301fa;
  cursor: pointer;
}
#title {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 0px 10px 0px;
  color: black;
}
.bar {
  height: 3px;
  float: right;
}
</style>