<template>
  <div>
    <p id="searchTitle">{{ pageString.title }}</p>
    <InputText
      id="searchInput"
      :class="'p-' + invalid"
      type="username"
      aria-describedby="searchInput-help"
      :placeholder="pageString.placeholder"
      v-model="searchInput"
      @keydown="searchInputEvent"
    />
    <button id="searchButton" @click="search">
      <b-icon style="font-size: 25px" icon="search" />
    </button>
    <p id="searchInput-help" :class="invalid">
      {{ titleHelper }}
    </p>

    <b-collapse id="searchResult" class="mt-2" :visible.sync="searched">
      <p id="noResultMsg" v-show="dataSource.length == 0">
        {{ `관련 ${this.pageString.korean} 없어요.` }}
      </p>
      <div v-if="type === 'issue'" id="addIssueButton" @click="addIssue">
        <b-icon icon="plus" scale="1.3" style="margin-right: 10px" /> 새로
        등록하기
      </div>
      <List
        v-show="!dataSource.length == 0"
        id="cardList"
        :dataSource="dataSource"
        :searchedFlag="true"
        :type="type"
        :mode="topicWriteModeFlag ? 'topic' : ''"
        @linkButtonClicked="linkButtonClicked"
        @wheel.stop
      />
      <div id="hideButton" @click="hideButtonCilcked">▲</div>
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false"
      />
    </b-collapse>
  </div>
</template>

<script>
import List from "./subView/List";
import httpService from "../../../../../../service/httpService";
import Loading from "vue-loading-overlay";

import InputText from "primevue/inputtext";

import addIssue from "./mixins/AddIssue";

export default {
  components: {
    List,
    Loading,
    InputText,
  },
  mixins: [addIssue],
  props: {
    type: String,
    relatedIssues: Array,
    topicWriteModeFlag: Boolean,
  },
  data() {
    return {
      searched: false,
      searchInput: "",
      dataSource: [],
      isLoading: false,
    };
  },
  computed: {
    pageString() {
      switch (this.type) {
        case "issue":
          return {
            title: "연관 이슈 등록 및 검색",
            placeholder: "등록하거나 검색하고자 하는 이슈의 제목을 입력하세요.",
            korean: "이슈가",
          };
        case "opinion":
          return {
            title: "연관 의견 검색",
            placeholder: "의견 제목을 입력하세요.",
            korean: "의견이",
          };

        case "material":
          return {
            title: "연관 자료 검색",
            placeholder: "자료 제목을 입력하세요.",
            korean: "자료가",
          };
      }
    },
    titleHelper() {
      if (this.searchInput.length <= 100) {
        return this.searchInput.length + " / 100";
      } else {
        return `100자 미만으로 작성해주세요. (현재 ${this.searchInput.length}자)`;
      }
    },
    invalid() {
      return this.searchInput.length <= 100 ? "" : "invalid";
    },
  },
  methods: {
    searchInputEvent(e) {
      if (e.code == "Enter" && !this.isLoading) {
        this.search();
      }
    },
    async search() {
      this.searched = true;
      this.isLoading = true;

      setTimeout(() => {
        scrollTo({
          top: 3000,
          behavior: "smooth",
        });
      }, 400);

      let param = {
        title: this.searchInput,
      };

      if (this.type == "opinion") {
        param.text = this.searchInput;
      }
      try {
        this.dataSource = await httpService.get(
          `/api/${this.type}/byContent`,
          param
        );
      } catch (err) {
        this.$bvModal.msgBoxOk("오류 발생! 잠시 후 다시 시도해주세요.", {
          title: "Error",
          size: "mg",
          buttonSize: "mg",
          headerBgVariant: "danger",
          okVariant: "light",
          bodyClass: "longModalContent",
          titleClass: "textWhite",
          centered: true,
        });
      }

      this.isLoading = false;
    },
    hideButtonCilcked() {
      this.searched = false;
      this.$emit("hideModal");
    },
    linkButtonClicked(e) {
      this.$emit("linkButtonClicked", e);
    },
  },
};
</script>

<style scoped>
#searchTitle {
  font-size: 1em;
  width: 100%;
  text-align: left;
  margin-bottom: 0.5%;
}
#searchInput {
  width: 94%;
  padding: 8px 20px;
  font-size: 1em;
}
#searchInput-help {
  margin-top: 10px;
  font-size: 12px;
  width: 100%;
  margin-left: 10px;
  text-align: left;
}
.invalid {
  color: red;
}
#searchInput:hover {
  border-color: black;
}
#searchInput:focus {
  outline: none !important;
  box-shadow: 0 0 15px #dbdbdb;
  border-color: black;
}
#searchButton {
  background-color: white;
  margin-top: 5px;
  margin-left: 1%;
  width: 4%;
  border: none;
}
#searchButton:hover {
  color: gold;
}
#searchResult {
  width: 100%;
}
#noResultMsg {
  font-size: 0.9em;
  color: grey;
  margin: 3% 5% 1.5% 5%;
}
#hideButton {
  width: 100%;
  padding: 0.1em;
  font-size: 0.7em;
  color: silver;
  background-color: #e6e6e670;
}
#hideButton:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}
#cardList {
  margin: 0px auto;
  margin-top: 3%;
  margin-bottom: 3%;
  width: 95%;
  height: 20em;
  overflow: auto;
  padding: 1%;
}
#addIssueButton {
  width: 130px;
  font-size: 13px;
  height: 2em;
  stroke: white;
  color: white;
  margin: 0px auto;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 128, 0, 0.685);
}
#addIssueButton:hover {
  background-color: rgba(231, 231, 5, 0.993);
  cursor: pointer;
}
</style>
