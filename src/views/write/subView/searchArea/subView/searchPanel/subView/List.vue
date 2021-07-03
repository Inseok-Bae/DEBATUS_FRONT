<template>
  <div id="listFrame" v-show="dataSource.length !== 0">
    <component
      :is="type + 'Card'"
      v-for="(item, index) in dataSource"
      :key="index"
      :item="item"
      :mode="mode"
      @linkButtonClicked="linkButtonClicked"
    />
  </div>
</template>

<script>
import IssueCard from "./IssueCard.vue";
import OpinionCard from "./OpinionCard";
import MaterialCard from "./MaterialCard";

export default {
  components: {
    IssueCard,
    OpinionCard,
    MaterialCard,
  },
  props: {
    type: String,
    dataSource: Array,
    searchedFlag: Boolean,
    mode: String,
  },
  methods: {
    linkButtonClicked(e) {
      this.$emit("linkButtonClicked", e);
    },
  },
};
</script>

<style scoped>
#listFrame {
  width: 100%;
}
#emptyMessageBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#emptyMessage {
  line-height: 50px;
  color: silver;
}
</style>