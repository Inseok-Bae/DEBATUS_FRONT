<template>
  <div :id="'opinionFrame' + dataSource.opinionId" class="frame">
    <svg id="leaf" width="70" height="70" viewBox="50 50 30 30">
      <path
        :id="'opinionLeaf' + dataSource.opinionId"
        d="M60.5,64.9c-3.1,3.1-8.3,5.6-10,4c-1.8-1.7,0.3-8,4.5-11.2c3-2.3,7.8-3.6,9.2-1.9C65.7,57.6,63.1,62.3,60.5,64.9z"
      />
    </svg>
    <p :id="'opinionTitle' + dataSource.opinionId" class="title">
      {{ dataSource.title }}
    </p>

    <b-collapse v-model="collapseFlag" class="mt-2 collapseArea">
      <b-card class="collapseBody">
        <p id="text">{{ text }}</p>
        <b-icon
          icon="arrow-up-right-square-fill"
          scale="2"
          :id="'opinionIcon' + dataSource.opinionId"
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
      return this.dataSource.text.substring(0, 100);
    },
  },
  mounted() {
    d3.select("#opinionLeaf" + this.dataSource.opinionId).attr(
      "fill",
      this.color
    );

    let button = d3
      .select("#opinionIcon" + this.dataSource.opinionId)
      .on("mouseover", () => {
        button.transition().attr("stroke", "yellow");
      })
      .on("mouseleave", () => {
        button.transition().attr("stroke", "white");
      })
      .on("click", () => {
        this.$router.push({
          name: "opinion",
          query: { id: this.dataSource.opinionId },
        });
      });

    let frame = d3
      .select("#opinionFrame" + this.dataSource.opinionId)
      .on("mouseover", () => {
        frame.transition().style("color", "#B301FA").style("cursor", "pointer");
        d3.select("#opinionLeaf" + this.dataSource.opinionId)
          .transition()
          .attr("fill", "#B301FA");
      })
      .on("mouseleave", () => {
        frame.transition().style("color", "black").style("cursor", "default");
        d3.select("#opinionLeaf" + this.dataSource.opinionId)
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
  height: auto;
  background-color: white;
  overflow: hidden;
  padding-left: 3px;
}
.title {
  width: 85%;
  float: right;
  font-size: 15px;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
  margin-bottom: 15px;
}
#leaf {
  float: left;
}
.collapseArea {
  float: left;
  margin-bottom: 15px;
  padding-left: 13%;
  width: 100%;
}
.collapseBody {
  float: left;
  width: 100%;
}
#text {
  float: left;
  width: 70%;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
}
#opinionIcon {
  float: left;
}
hr {
  float: left;
  width: 85%;
}
</style>