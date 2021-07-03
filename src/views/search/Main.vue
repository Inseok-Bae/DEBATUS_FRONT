<template>
  <div id="frame">
    <div id="searchArea">
      <input
        type="text"
        v-model="searchInputData"
        id="searchInput"
        @keydown="searchInputEvent"
      /><button class="searchButtons" @click="search">
        <b-icon style="font-size: 25px" icon="search" />
      </button>
    </div>
    <div id="bottomArea">
      <search-result
        :topicDataSource="topicDataSource"
        :issueDataSource="issueDataSource"
        :opinionDataSource="opinionDataSource"
      />
    </div>
  </div>
</template>

<script>
import search from "./mixins/Search";

import searchResult from "./subView/SearchResult";

export default {
  components: {
    searchResult,
  },
  mixins: [search],
  mounted() {
    this.$store.commit("setWriter", "not2");
  },
  data() {
    return {
      topicDataSource: [],
      issueDataSource: [],
      opinionDataSource: [],
    };
  },
};
</script>

<style scoped>
#frame {
  width: 100%;
  height: 100%;
  padding-top: 100px;
}
#searchArea {
  width: 50%;
  min-width: 550px;
  height: auto;
  overflow: hidden;
  margin: 0px auto;
}

#searchInput {
  float: left;
  width: 89%;
  height: 35px;
  border: 1px solid rgb(223, 223, 223);
  padding: 10px;
}
#searchInput:focus {
  outline: none !important;
  box-shadow: 0 0 15px #dbdbdb;
}
.searchButtons {
  float: left;
  background-color: white;
  margin-top: 5px;
  margin-left: 10px;
  border: none;
}
.searchButtons:hover {
  color: gold;
}
#bottomArea {
  margin: 0px auto;
  margin-top: 4%;
  width: 85%;
  min-width: 500px;
  height: calc(100% - 135px);
  overflow: hidden;
}
</style>