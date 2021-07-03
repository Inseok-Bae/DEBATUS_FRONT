<template>
  <div id="issueCardFrame">
    <div id="contentArea" @click="clicked">
      <p id="title">{{ item.title }}</p>
      <div class="bar" :style="consBarStyle" />
      <div class="bar" :style="prosBarStyle" />
    </div>
    <div id="buttonArea">
      <div
        id="linkButton"
        @click="eyeButtonClicked"
        v-tooltip.top-center="{
          content: '둘러보기',
          placement: 'top-center',
          offset: 10,
        }"
      >
        <b-icon icon="eye" />
      </div>
    </div>
    <b-collapse id="standSelect" :visible.sync="linkButtonClickedFlag">
      <div id="prosButton" @click="selected(1)">찬성</div>
      <div id="consButton" @click="selected(0)">반대</div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    mode: String,
  },
  data() {
    return {
      linkButtonClickedFlag: false,
    };
  },
  computed: {
    prosBarStyle() {
      if (this.item.issueId == "NY") {
        return "width: 0px;";
      } else {
        let prosRatio =
          this.item.prosCount / (this.item.prosCount + this.item.consCount);
        return `background-color:green; width: ${
          prosRatio * 100
        }px; margin-right:5px;`;
      }
    },
    consBarStyle() {
      if (this.item.issueId == "NY") {
        return "width: 0px;";
      } else {
        let consRatio =
          this.item.consCount / (this.item.prosCount + this.item.consCount);
        return `background-color:red; width: ${consRatio * 100}px;`;
      }
    },
  },
  methods: {
    clicked() {
      if (this.mode == "topic") {
        this.$emit("linkButtonClicked", {
          id: this.item.issueId,
          title: this.item.title,
          type: "issue",
        });
        return;
      } else {
        this.linkButtonClickedFlag = !this.linkButtonClickedFlag;
      }
    },
    eyeButtonClicked() {
      if (this.item.issueId == "NY") {
        this.$bvModal.msgBoxOk("해당 이슈가 등록된 후 이동할 수 있어요.", {
          title: "Inform",
          size: "mg",
          buttonSize: "mg",
          headerBgVariant: "success",
          okVariant: "success",
          bodyClass: "longModalContent",
          titleClass: "textWhite",
          centered: true,
        });
        return;
      }
      this.$router.push({
        name: "issue",
        query: {
          id: this.item.issueId,
        },
      });
    },
    selected(e) {
      this.$emit("linkButtonClicked", {
        id: this.item.issueId,
        title: this.item.title,
        type: "issue",
        stand: e,
      });
      this.linkButtonClickedFlag = !this.linkButtonClickedFlag;
    },
  },
};
</script>

<style scoped>
#issueCardFrame {
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
  border-bottom: 0.15em solid #b301fa;
  cursor: pointer;
}
#title {
  width: 90%;
  font-size: 1em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0em 0em 0.1em 0em;
}
.bar {
  height: 0.2em;
  float: right;
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
  cursor: pointer;
}
#standSelect {
  width: 100%;
  height: 3rem;
  font-size: 1em;
  color: white;
  overflow: hidden;
}
#prosButton,
#consButton {
  display: inline-block;
  width: 50%;
  height: 100%;
  padding-top: 0.8em;
  text-align: center;
  border: 1px solid white;
}
#prosButton:hover,
#consButton:hover {
  background-color: gold;
  cursor: pointer;
}
#prosButton {
  background-color: green;
}
#consButton {
  background-color: red;
}
</style>
