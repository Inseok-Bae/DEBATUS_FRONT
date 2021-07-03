<template>
  <div>
    <p id="nodesTitle">{{ nodesTitle }}</p>
    <div v-for="(node, index) in nodes" :key="index" class="nodesArea">
      <div
        class="nodes"
        :style="{
          backgroundColor: nodesColor,
        }"
        v-tooltip.right-center="{
          content:
            type == 'issue' && node.stand !== undefined
              ? node.stand == '1'
                ? '찬성' + ' : ' + node.title
                : '반대' + ' : ' + node.title
              : node.title,
          placement: 'right-center',
          offset: 5,
        }"
      />
      <b-icon
        class="removeIcons"
        icon="backspace"
        variant="danger"
        @click="removeItem({ id: node.id, type: type })"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodes: Array,
    type: String,
  },

  computed: {
    nodesTitle() {
      switch (this.type) {
        case "issue":
          return "연관 이슈  : ";
        case "opinion":
          return "연관 의견 : ";
        case "material":
          return "연관 자료 : ";
      }
    },
    nodesColor() {
      switch (this.type) {
        case "issue":
          return "#B301FA";
        case "opinion":
          return "#B1E000";
        case "material":
          return "black";
      }
    },
  },
  methods: {
    removeItem(e) {
      this.$emit("removeItem", e);
    },
  },
};
</script>

<style scoped>
#nodesTitle {
  display: inline-block;
  font-size: 0.9em;
  color: grey;
}
.nodesArea {
  display: inline-block;
  width: 2em;
  height: 2em;
  margin-left: 3em;
}
.nodes {
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  display: inline-block;
}
.removeIcons:hover {
  cursor: pointer;
  stroke: yellow;
}
</style>