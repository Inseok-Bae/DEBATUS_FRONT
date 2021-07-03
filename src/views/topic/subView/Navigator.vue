<template>
  <div id="navigatorFrame" v-show="windowSize > 1400">
    <p v-show="false">{{ windowScroll }}</p>
    <li
      v-for="index of indexes"
      :key="index.name"
      class="indexes"
      @click="setPosition(index)"
      :id="index.id"
    >
      {{ index.name }}
    </li>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  computed: {
    windowSize() {
      return this.$store.state.windowSize;
    },
    windowScroll() {
      let p = this.$store.state.windowScroll;
      let pId;
      for (let index of this.indexes) {
        if (p + 70 >= index.position) {
          pId = index.id;
        }
      }
      d3.selectAll(".indexes").transition().style("color", "grey");
      d3.select(`#${pId}`).transition().style("color", "#ff7100");
      return p;
    },
  },
  data() {
    return {
      indexes: [
        {
          name: "내용",
          position: 0,
          id: "contextIndex",
        },
        {
          name: "타임 라인",
          position: 0,
          id: "timelineIndex",
        },
        {
          name: "답변",
          position: 0,
          id: "answerIndex",
        },
        {
          name: "연관 이슈",
          position: 0,
          id: "relatedIssueIndex",
        },
      ],
    };
  },
  mounted() {
    for (let index of this.indexes) {
      switch (index.name) {
        case "타임 라인":
          index.position = d3.select("#historyTitle").node().offsetTop - 70;
          break;
        case "답변":
          index.position =
            d3.select("#answeredAreaLabel").node().offsetTop - 70;
          break;
        case "연관 이슈":
          index.position = d3.select("#issueListFrame").node().offsetTop;
          break;
      }
    }

    d3.selectAll(".indexes")
      .style("color", "grey")
      .each((d, i, g) => {
        let index = d3
          .select(g[i])
          .on("mouseover", () => {
            index
              .transition()
              .style("color", "#ff7100")
              .style("cursor", "pointer");
          })
          .on("mouseleave", () => {
            index
              .transition()
              .style("color", "grey")
              .style("cursor", "default");
          });
      });
  },
  methods: {
    setPosition(item) {
      window.scrollTo({
        top: item.position,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
#navigatorFrame {
  position: fixed;
  right: 50px;
  top: 100px;
  width: auto;
  height: auto;
}
.indexes {
  text-align: left;
  font-size: 15px;
  line-height: 40px;
}
</style>