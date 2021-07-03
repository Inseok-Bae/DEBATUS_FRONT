<template>
  <div id="opinionCardFrame">
    <div id="contentArea" @click="clicked">
      <p id="title">{{ item.title }}</p>
    </div>
    <div id="buttonArea">
      <div
        id="linkButton"
        @click="linkButtonClicked"
        v-tooltip.top-center="{
          content: '둘러보기',
          placement: 'top-center',
          offset: 10,
        }"
      >
        <b-icon icon="eye" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    clicked() {
      this.$router.push({
        name: "opinion",
        query: {
          id: this.item.opinionId,
        },
      });
    },
    linkButtonClicked(e) {
      this.$emit("linkButtonClicked", {
        id: this.item.opinionId,
        title: this.item.title,
        type: "opinion",
      });
    },
  },
};
</script>

<style scoped>
#opinionCardFrame {
  width: 100%;
  margin-bottom: 1em;
  padding: 1em;
}
#contentArea {
  display: inline-block;
  width: 92%;
  margin-right: 3%;
  height: 3em;
  border-bottom: 0.1em solid silver;
}
#contentArea:hover {
  border-bottom: 0.15em solid #b1e000;
  cursor: pointer;
}
#title {
  width: 90%;
  font-size: 1em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 0px 0.1px 0px;
}
.relatedIssue {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #b301fa;
  float: right;
  margin-left: 0.2em;
}
#buttonArea {
  display: inline-block;
  width: 5%;
}
#linkButton {
  width: 1.3em;
  height: 1.3em;
  font-size: 1.2em;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1em solid silver;
}
#linkButton:hover {
  border-color: gold;
}
</style>