<template>
  <div :id="'materialFrame' + dataSource.materialId" class="frame">
    <p :id="'materialTitle' + dataSource.materialId" class="title">
      {{ dataSource.title }}
    </p>
    <b-collapse v-model="collapseFlag" class="mt-2 collapseArea">
      <b-card class="collapseBody">
        <p id="text">{{ text }}</p>
        <b-icon
          icon="arrow-up-right-square-fill"
          scale="2"
          :id="'materialIcon' + dataSource.materialId"
        />
      </b-card>
    </b-collapse>
    <hr />
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    dataSource: Object,
    color: String,
  },
  data() {
    return {
      collapseFlag: false,
    };
  },
  computed: {
    text() {
      return this.dataSource.text.substring(0, 70) + "...";
    },
  },
  mounted() {
    d3.select("#materialLeaf" + this.dataSource.materialId).attr(
      "fill",
      this.color
    );

    let button = d3
      .select("#materialIcon" + this.dataSource.materialId)
      .on("mouseover", () => {
        button.transition().attr("stroke", "yellow");
      })
      .on("mouseleave", () => {
        button.transition().attr("stroke", "white");
      })
      .on("click", () => {
        this.$router.push({
          name: "material",
          query: { id: this.dataSource.materialId },
        });
      });

    let frame = d3
      .select("#materialFrame" + this.dataSource.materialId)
      .on("mouseover", () => {
        frame.transition().style("color", "#B301FA").style("cursor", "pointer");
        d3.select("#materialLeaf" + this.dataSource.materialId)
          .transition()
          .attr("fill", "#B301FA");
      })
      .on("mouseleave", () => {
        frame.transition().style("color", "black").style("cursor", "default");
        d3.select("#materialLeaf" + this.dataSource.materialId)
          .transition()
          .attr("fill", this.color);
      })
      .on("click", () => {
        this.collapseFlag = !this.collapseFlag;
      });
  },
};
</script>

<style scoped>
.frame {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.title {
  width: 85%;
  float: left;
  font-size: 15px;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
}

.collapseArea {
  float: left;
  margin-bottom: 15px;
  margin-left: 5px;
  width: 100%;
}
.collapseBody {
  float: left;
  width: 99%;
}
#text {
  float: left;
  margin-left: 2%;
  width: 90%;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
}
hr {
  float: left;
  width: 85%;
}
</style>