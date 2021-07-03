<template>
  <div id="mainFrame">
    <div id="backgroundCircle" />
    <div id="backgroundLine" />
    <div id="titleArea" class="content">
      {{ materialDataSource.title }}
    </div>
    <div id="textArea" class="content">
      {{ materialDataSource.text }}
    </div>
  </div>
</template>

<script>
import httpService from "../../service/httpService";

export default {
  data() {
    return {
      materialDataSource: {},
    };
  },
  async mounted() {
    await this.getDataSource();
  },
  methods: {
    async getDataSource() {
      this.materialDataSource = await httpService.get("/api/material/one", {
        id: this.$route.query.id,
      });
    },
  },
};
</script>

<style scoped>
#mainFrame {
  width: 100%;
  height: 100%;
  padding-top: calc(60px + 5%);
}

.content {
  width: 70%;
  margin: 0px auto;
  word-break: break-all;
  white-space: pre-line;
  text-align: left;
  overflow: auto;
}

#titleArea {
  font-size: 20px;
  height: 6%;
  border-bottom: 1px solid #b301fa;
}
#textArea {
  padding: 10px;
  line-height: 35px;
  margin-top: 5vmax;
  height: 70%;
}
#backgroundCircle {
  position: absolute;
  left: 5%;
  top: calc(9% + 60px);
  width: 3vmax;
  height: 3vmax;
  background-color: #b301fa;
  border-radius: 50%;
}
#backgroundLine {
  position: absolute;
  left: calc(5% + 1.5vmax);
  top: 0%;
  width: 2px;
  height: calc(9% + 60px);
  background-color: #b301fa;
}
</style>
