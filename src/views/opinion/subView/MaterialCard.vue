<template>
  <div id="wrapper">
    <div id="markerArea">
      <div id="marker" />
    </div>
    <div :id="'frame' + dataSource.materialId" class="frame">
      <p :id="'title' + dataSource.materialId" class="title">
        {{ dataSource.title }}
      </p>
      <b-collapse v-model="collapseFlag" class="mt-2 collapseArea">
        <b-card class="collapseBody">
          <p id="text">{{ text }}</p>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    dataSource: Object,
  },
  data() {
    return {
      collapseFlag: false,
    };
  },
  computed: {
    text() {
      return this.dataSource.text.substring(0, 100);
    },
  },
  mounted() {
    let frame = d3
      .select("#frame" + this.dataSource.materialId)
      .on("click", () => {
        this.collapseFlag = !this.collapseFlag;
      });
  },
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: auto;
  overflow: hidden;
}
#markerArea {
  float: left;
  width: 20%;
  height: auto;
}
#marker {
  margin: 0px auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #b301fa;
}
.frame {
  width: 80%;
  float: left;
  padding: 10px;
  height: auto;
  overflow: hidden;
  border-bottom: 1px solid #b301fa;
}
.frame:hover {
  background-color: #b301fa10;
  cursor: pointer;
}
.title {
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.collapseArea {
  margin-bottom: 15px;
  margin-left: 5px;
  width: 100%;
}
.collapseBody {
  width: 100%;
}
#text {
  width: 100%;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
}
</style>