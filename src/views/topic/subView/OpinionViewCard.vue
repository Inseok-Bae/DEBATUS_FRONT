<template>
  <div :id="'frame' + dataSource.opinionId" class="frame">
    <p :id="'title' + dataSource.opinionId" class="title">
      {{ dataSource.title }}
    </p>
    <b-collapse v-model="collapseFlag" class="mt-2 collapseArea">
      <b-card class="collapseBody">
        <p id="text">{{ text }}</p>
        <b-icon
          icon="arrow-up-right-square-fill"
          scale="1.5"
          :id="'icon' + dataSource.opinionId"
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
    let button = d3
      .select("#icon" + this.dataSource.opinionId)
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
      .select("#frame" + this.dataSource.opinionId)
      .on("mouseover", () => {
        frame
          .transition()
          .style("color", this.color)
          .style("cursor", "pointer");
      })
      .on("mouseleave", () => {
        frame.transition().style("color", "black").style("cursor", "default");
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
  margin-bottom: 20px;
}
.title {
  width: 100%;
  float: left;
  font-size: 15px;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
  margin-bottom: 15px;
}
.collapseArea {
  float: left;
  margin-bottom: 15px;
  width: 100%;
}
.collapseBody {
  float: left;
  width: 100%;
}
#text {
  float: left;
  width: 80%;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
  margin: 0px;
}
#opinionIcon {
  float: right;
}
hr {
  float: left;
  width: 100%;
}
</style>