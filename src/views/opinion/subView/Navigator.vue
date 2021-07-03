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
    noOpinions: Boolean,
    noMaterials: Boolean,
  },
  watch: {
    noOpinions(newVal) {
      if (newVal) {
        for (let i = 0; i < this.indexes.length; i += 1) {
          if (this.indexes[i].name === "연관 의견") {
            this.indexes.splice(i, 1);
          }
        }
      }
    },
    noMaterials(newVal) {
      if (newVal) {
        for (let i = 0; i < this.indexes.length; i += 1) {
          if (this.indexes[i].name === "자료") {
            this.indexes.splice(i, 1);
          }
        }
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
      d3.select(`#${pId}`).transition().style("color", "#b1e000");
      return p;
    },
  },
  data() {
    return {
      indexes: [
        {
          name: "내용",
          position: 0,
          id: "relatedTopicIndex",
        },
        {
          name: "연관 의견",
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
        case "연관 의견":
          index.position = d3.select("#relatedOpinionsTitle").node().offsetTop;
          break;
        case "자료":
          index.position = d3.select("#relatedMaterialsTitle").node().offsetTop;
          break;
      }
      console.log(this.indexes);
    }

    d3.selectAll(".indexes")
      .style("color", "grey")
      .each((d, i, g) => {
        let index = d3
          .select(g[i])
          .on("mouseover", () => {
            index
              .transition()
              .style("color", "#b1e000")
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