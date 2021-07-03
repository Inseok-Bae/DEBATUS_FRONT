<template>
  <div id="innerFrame">
    <div id="leftFrame">
      <div id="opinionArea">
        <p class="title" style="color: #b1e000">의견</p>
        <hr />
        <List
          id="opinionCardList"
          :dataSource="opinionDataSource"
          type="opinionCard"
          :searchedFlag="true"
        />
      </div>
    </div>
    <div id="rightFrame">
      <div id="issueArea">
        <p class="title" style="color: #b301fa">이슈</p>
        <hr />
        <List
          id="issueCardList"
          :dataSource="issueDataSource"
          type="issueCard"
          :searchedFlag="true"
        />
      </div>
      <div id="topicArea">
        <p class="title" style="color: #ff7100">토픽</p>
        <hr />
        <List
          id="topicCardList"
          :dataSource="topicDataSource"
          type="topicCard"
          :searchedFlag="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import List from "../../myPage/subView/List";

export default {
  components: {
    List,
  },
  props: {
    topicDataSource: Array,
    issueDataSource: Array,
    opinionDataSource: Array,
  },
};
</script>

<style scoped>
#innerFrame {
  width: 100%;
  height: 100%;
}
#leftFrame,
#rightFrame {
  float: left;
  width: 50%;
  height: 100%;
  overflow: hidden;
  padding: 2% 5% 2% 5%;
}
#opinionArea {
  width: 100%;
  height: 100%;
}
#issueArea,
#topicArea {
  width: 100%;
  height: 45%;
}
#topicArea {
  margin-top: 10%;
}
#opinionCardList,
#issueCardList,
#topicCardList {
  width: 100%;
  height: calc(100% - 43px);
  overflow: auto;
  padding: 1%;
}
.title {
  font-size: 18px;
  width: 100%;
  text-align: left;
}
</style>