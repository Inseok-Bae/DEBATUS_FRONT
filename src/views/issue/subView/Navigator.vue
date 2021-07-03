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
  props: {
    noTopic: Boolean,
  },
  watch: {
    noTopic(newVal) {
      if (newVal) {
        this.indexes.shift();
      }
    },
  },
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
      d3.select(`#${pId}`).transition().style("color", "#b301fa");
      return p;
    },
  },
  data() {
    return {
      indexes: [
        {
          name: "연관 토픽",
          position: 0,
          id: "relatedTopicIndex",
        },
        {
          name: "의견 목록",
          position: 0,
          id: "opinionsIndex",
        },
        {
          name: "자료",
          position: 0,
          id: "materialsIndex",
        },
      ],
    };
  },
  mounted() {
    for (let index of this.indexes) {
      switch (index.name) {
        case "의견 목록":
          index.position = d3.select("#title").node().offsetTop - 70;
          break;
        case "자료":
          index.position = d3.select("#materialTitle").node().offsetTop;
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
              .style("color", "#b301fa")
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