<template>
  <div id="frame">
    <div id="metaDataArea" class="areas">
      <div
        id="line"
        :style="{
          height: lineHeight + 'px',
        }"
      />
      <recommend
        v-if="loginFlag"
        id="recommend"
        :recommendCount="dataSource.recommendCount"
        @updateRecommendCount="updateRecommendCount"
      />
      <p class="metaData">Writer : {{ dataSource.writer }}</p>
      <p class="metaData" style="margin-right: 5%">
        Writed : {{ writtenDate }}
      </p>
    </div>
    <div id="contentArea" class="areas">
      <div id="titleArea">
        <div id="titleRecommendMarker">
          <div
            id="marker"
            :style="{
              width: mainMarkerSize + 'px',
              height: mainMarkerSize + 'px',
            }"
          />
        </div>
        <div id="titleContent">
          <p id="title">{{ dataSource.title }}</p>
          <hr />
        </div>
      </div>
      <div id="textArea">
        <p v-for="(text, index) in textList" :key="index" class="texts">
          {{ text }}
        </p>
      </div>
    </div>

    <div
      id="relatedOpinionArea"
      class="areas"
      v-show="relatedOpinions.length > 0"
    >
      <div class="labels">
        <p style="color: #b1e000" id="relatedOpinionsTitle">
          <i class="pi pi-link" /> 이웃 의견
        </p>
        <hr />
      </div>

      <div class="cardList" @wheel.stop>
        <opinion-card
          v-for="(data, index) in relatedOpinions"
          class="cards"
          :key="'opinion' + index"
          :dataSource="data"
          :minRecommend="minRecommend"
          :maxRecommend="maxRecommend"
        />
      </div>
    </div>
    <div id="materialListArea" class="areas" v-show="materials.length > 0">
      <div class="labels">
        <p style="color: #b301fa" id="relatedMaterialsTitle">
          <i class="pi pi-link" /> 자료
        </p>
        <hr />
      </div>
      <div class="cardList" @wheel.stop>
        <material-card
          v-for="(data, index) in materials"
          class="cards"
          :key="'material' + index"
          :dataSource="data"
        />
      </div>
    </div>

    <issue-list />
    <img src="../../assets/images/opinionBackground.svg" id="leafs" />
    <navigator :noOpinions="noOpinions" :noMaterials="noMaterials" />
  </div>
</template>

<script>
import httpService from "../../service/httpService";

import materialCard from "./subView/MaterialCard";
import opinionCard from "./subView/OpinionCard";
import recommend from "./subView/Recommend";
import issueList from "./subView/issueList/Main.vue";
import navigator from "./subView/Navigator.vue";

import minMaxRecommendCount from "./mixins/minMaxRecommendCount";

export default {
  components: {
    materialCard,
    recommend,
    opinionCard,
    issueList,
    navigator,
  },
  mixins: [minMaxRecommendCount],
  data() {
    return {
      dataSource: {},
      textList: [],
      relatedOpinions: [],
      issueList: [],
      materials: [],
      materialShow: false,
      mainMarkerSize: 0,
      lineHeight: 0,
      noOpinions: false,
      noMaterials: false,
    };
  },
  computed: {
    writtenDate() {
      if (this.dataSource.writtenDate !== undefined) {
        let date = this.dataSource.writtenDate.split("T")[0];
        let time = this.dataSource.writtenDate.split("T")[1].split(".")[0];
        return date + " " + time;
      } else {
        return "";
      }
    },
    loginFlag() {
      return this.$store.state.loginFlag;
    },
  },
  async mounted() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
    await this.getDataSource(this.$route.query.id);
    this.mainMarkerSize =
      ((this.dataSource.recommendCount - this.minRecommend) /
        (this.maxRecommend - this.minRecommend)) *
      50;

    if (
      this.maxRecommend - this.minRecommend == 0 ||
      this.mainMarkerSize == 0
    ) {
      this.mainMarkerSize = 10;
    }

    this.lineHeight =
      700 + (this.relatedOpinions.length + this.materials.length) * 90;
  },
  methods: {
    async getDataSource(id) {
      this.$store.commit("setOpinionScreenShow", true);
      try {
        this.dataSource = await httpService.get("/api/opinion/byId", {
          id: id,
        });
        this.$store.commit("setWriter", this.dataSource.writer);

        this.textList = this.dataSource.text.split("\\n");
        this.relatedOpinions = await httpService.get("/api/opinion/groupById", {
          id: id,
        });
        if (this.relatedOpinions.length === 0) {
          this.noOpinions = true;
        }
        this.issueList = await httpService.get(
          "/api/issue/byOpinionId/detail",
          {
            id: id,
          }
        );
        this.materials = await httpService.get("/api/material", {
          ids: encodeURI(this.dataSource.materialIds),
        });
        if (this.materials.length === 0) {
          this.noMaterials = true;
        }

        if (!this.$store.state.writingState) {
          this.$store.commit("setOpinionModifyData", {
            source: this.dataSource,
            opinions: this.relatedOpinions,
            issues: this.issueList,
            materials: this.materials,
          });
        }

        setTimeout(() => {
          this.$store.commit("setOpinionScreenShow", false);
        }, 300);
      } catch (err) {
        this.$store.commit("setOpinionScreenShow", false);
        this.$bvModal
          .msgBoxOk(
            "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
            {
              title: "Error",
              size: "mg",
              buttonSize: "mg",
              headerBgVariant: "danger",
              okVariant: "light",
              bodyClass: "longModalContent",
              titleClass: "textWhite",
              centered: true,
            }
          )
          .then((val) => {
            this.$store.commit("setOpinionScreenShow", false);
            this.$router.push({ name: "home" });
            return;
          });
      }
    },
    updateRecommendCount() {
      this.dataSource.recommendCount += 1;
    },
  },
};
</script>

<style scoped>
#frame {
  width: 100%;
  height: 100%;
  padding-top: calc(50px + 3%);
}
#line {
  width: 1px;
  background-color: silver;
  position: absolute;
  top: calc(50px + 3%);
  left: 10%;
  z-index: -1;
}
.areas {
  width: 75%;
  min-width: 500px;
  margin: 0px auto;
}
#metaDataArea {
  position: relative;
  height: 40px;
}
.metaData {
  float: right;
  font-size: 13px;
  color: grey;
  margin-top: 20px;
}
#contentArea {
  height: 45%;
  min-height: 300px;
  margin: 0px auto;
}
#text {
  float: left;
  height: 100%;
  width: 50%;
}
#titleArea,
#textArea {
  word-break: break-all;
  white-space: pre-line;
  text-align: left;
}
#titleArea {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 40px;
}
#titleRecommendMarker {
  width: 20%;
  min-height: 1px;
  float: left;
}
#marker {
  margin: 0px auto;
  border-radius: 50%;
  background-color: #b1e000;
}
#titleContent {
  width: 80%;
  float: left;
}
#title {
  font-size: 20px;
}
#textArea {
  width: 80%;
  margin-left: 20%;
  height: calc(70% - 40px);
  overflow: auto;
}
#materialListArea {
  height: 50%;
  margin-top: 50px;
}
.cardList {
  width: 100%;
  /* height: 60%; */
  margin: 0px auto;
  margin-bottom: 100px;
  overflow: auto;
}
.cards {
  margin-bottom: 30px;
}
#recommend {
  margin-left: 5%;
  float: right;
}
.labels {
  width: 80%;
  margin-left: 20%;
  margin-bottom: 4%;
  text-align: left;
}
#leafs {
  width: 60%;
  position: fixed;
  top: 10px;
  z-index: -200;
  opacity: 0.5;
}
</style>
