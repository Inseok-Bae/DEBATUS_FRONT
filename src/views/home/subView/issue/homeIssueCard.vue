<template>
  <div id="issueCardFrame" @click="clicked">
    <div id="content">
      <p id="title">{{ item.title }}</p>
      <p class="prosCount" v-show="item.prosCount !== 0">
        {{ `찬성 ${item.prosCount}` }}
      </p>
      <p class="consCount" v-show="item.consCount !== 0">
        {{ `반대 ${item.consCount}` }}
      </p>
      <svg width="100%" height="5">
        <rect x="0" y="0" :width="prosRatio + '%'" height="5" fill="green" />
        <rect
          :x="prosRatio + '%'"
          y="0"
          :width="100 - prosRatio + '%'"
          height="5"
          fill="red"
        />
      </svg>
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
        name: "issue",
        query: {
          id: this.item.issueId,
        },
      });
    },
  },
  computed: {
    prosRatio() {
      return (
        (this.item.prosCount / (this.item.consCount + this.item.prosCount)) *
        100
      );
    },
  },
};
</script>

<style scoped>
#issueCardFrame {
  float: left;
  width: 33.333%;
  height: 100%;
  padding: 10px;
}
#content {
  padding: 25px;
  width: 100%;
  height: 100%;
  border: 1px solid silver;
}
#content:hover {
  background-color: #ce5cfc18;
  border: 2px solid #b301fa;
  cursor: pointer;
}
#title {
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: black;
  margin-bottom: 20px;
}
.prosCount,
.consCount {
  display: inline-block;
  font-size: 13px;
  margin: 0px;
}
.prosCount {
  float: left;
  color: green;
}
.consCount {
  float: right;
  color: red;
}
</style>