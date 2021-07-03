<template>
  <div id="opinionCardFrame">
    <div id="markerArea">
      <div
        id="marker"
        :style="{
          width: markerSize + 'px',
          height: markerSize + 'px',
        }"
      />
    </div>
    <div id="contentArea" @click="clicked">
      <p id="title">{{ dataSource.title }}</p>
      <div
        class="relatedIssue"
        v-for="issue in dataSource.relatedIssues"
        :key="issue.id"
        v-tooltip.bottom-center="{
          content: issue.title,
          placement: 'bottom-center',
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: Object,
    minRecommend: Number,
    maxRecommend: Number,
  },
  data() {
    return {
      markerSize: 0,
    };
  },
  mounted() {
    this.markerSize =
      ((this.dataSource.recommendCount - this.minRecommend) /
        (this.maxRecommend - this.minRecommend)) *
      50;

    if (this.maxRecommend - this.minRecommend == 0 || this.markerSize == 0) {
      this.markerSize = 10;
    }
  },
  methods: {
    clicked() {
      this.$router.push({
        name: "opinion",
        query: {
          id: this.dataSource.opinionId,
        },
      });
    },
  },
};
</script>

<style scoped>
#opinionCardFrame {
  height: 60px;
  width: 100%;
}
#markerArea {
  float: left;
  width: 20%;
  height: 100%;
}
#marker {
  margin: 0px auto;
  border-radius: 50%;
  background-color: #b1e000;
}
#contentArea {
  border-bottom: 1px solid #b1e000;
  padding: 10px;
  float: left;
  width: 80%;
  height: 100%;
}
#contentArea:hover {
  background-color: #afe00010;
  cursor: pointer;
}
#title {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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