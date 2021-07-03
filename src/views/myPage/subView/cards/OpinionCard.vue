<template>
  <div id="opinionCardFrame" @click="clicked">
    <p id="title">{{ item.title }}</p>
    <div
      class="relatedIssue"
      v-for="issue in item.relatedIssues"
      :key="issue.id"
      v-tooltip.bottom-center="{
        content: issue.title,
        placement: 'bottom-center',
      }"
    />
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
        name: "opinion",
        query: {
          id: this.item.opinionId,
        },
      });
    },
  },
};
</script>

<style scoped>
#opinionCardFrame {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid silver;
  margin-bottom: 30px;
  padding: 10px;
}
#opinionCardFrame:hover {
  background-color: #afe00010;
  border-bottom: 2px solid #b1e000;
  cursor: pointer;
}
#title {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 0px 5px 0px;
  color: black;
}
.relatedIssue {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #b301fa;
  float: right;
  margin-left: 10px;
}
</style>