<template>
  <div id="homeFrame">
    <div id="darkCover" />
    <transition name="slide">
      <div id="content">
        <div id="contentTop">
          <div id="topicArea">
            <p id="topiclabel">토픽</p>
            <List
              id="topicCardList"
              v-show="'topicCard' == selectedType + 'Card'"
              :dataSource="topicDataSource"
              type="topicCard"
              :searchedFlag="searchedFlag"
            />
            <topic-icon id="topicIcon" />
          </div>
        </div>
        <div id="contentBottom">
          <div id="issueArea">
            <p id="issuelabel">이슈</p>
            <List
              id="issueCardList"
              v-show="'issueCard' == selectedType + 'Card'"
              :dataSource="issueDataSource"
              type="issueCard"
              :searchedFlag="searchedFlag"
            />
            <div class="homeissue" />
          </div>

          <div id="opinionArea">
            <p id="opinionlabel">의견</p>
            <opinion-icon id="opinionIcon" />
            <List
              id="opinionCardList"
              v-show="'opinionCard' == selectedType + 'Card'"
              :dataSource="opinionDataSource"
              type="opinionCard"
              :searchedFlag="searchedFlag"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import flower from "../../components/Flower";
import List from "./subView/List";

import topicIcon from "./subView/icons/Topic";
import opinionIcon from "./subView/icons/Opinion";

import clickEvent from "./mixins/ClickEvent";
import getDataSource from "./mixins/GetDataSource";

export default {
  components: {
    flower,
    List,

    topicIcon,
    opinionIcon,
  },
  mixins: [clickEvent, getDataSource],
  data() {
    return {
      searchedFlag: true,
    };
  },
};
</script>

<style scoped>
#homeFrame {
  width: 100%;
  height: 100%;
  padding-bottom: 8%;
  overflow: hidden;
}

#content {
  position: absolute;
  left: 15%;
  top: calc(7% + 50px);
  width: 70%;
  height: 80%;
  z-index: 2;
  border-radius: 2%;
  overflow: hidden;
}
#topiclabel,
#issuelabel,
#opinionlabel {
  font-size: 25px;
  text-align: left;
}
#opinionlabel {
  text-align: right;
}
#contentTop {
  width: 100%;
  min-height: 40px;
  margin: 0px auto;
  z-index: 2;
}
#topicArea {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
}
#opinionArea {
  float: right;
  padding-right: 5%;
}
#issueArea {
  float: left;
  padding-left: 5%;
}
#opinionArea,
#issueArea {
  position: relative;
  height: 100%;
  display: inline-block;
}
#issueArea:hover,
#opinionArea:hover,
#topicArea:hover {
  cursor: pointer;
}
#contentBottom {
  width: 100%;
  margin: 0px auto;
  z-index: 2;
}
.buttons {
  border: none;
  width: 7em;
  height: 2.5em;
  border-radius: 5%;
  border: 1px solid silver;
}
.buttons:hover {
  border: 2px solid gold;
}

.buttonTexts {
  font-size: 1em;
  font-weight: bolder;
}
#opinionButton {
  float: left;
}
#issueButton {
  float: right;
}

#topicButton {
  margin-top: 1em;
}
#opinionCardList {
  margin-top: 5%;
  width: calc(100% - 90px);
  height: calc(85% - 30px);
  float: right;
  overflow: auto;
  padding: 1%;
  z-index: 9999;
}
#opinionIcon {
  position: absolute;
  left: 0px;
  height: 100%;
}
#issueCardList {
  margin-top: 5%;
  width: calc(100% - 90px);
  float: left;
  height: calc(85% - 53px);
  overflow: auto;
  padding: 1%;
}
.homeissue {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 7px;
}
#topicCardList {
  width: 100%;
  height: 75%;
  overflow: auto;
  padding: 1%;
}
#topicIcon {
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>



