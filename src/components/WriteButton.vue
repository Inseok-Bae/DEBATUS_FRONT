<template>
  <div id="frame">
    <transition name="slide">
      <div id="optionArea" v-show="buttonClicked">
        <div
          v-for="(option, index) in optionList"
          :key="'writeOption' + index"
          class="buttons"
          v-show="!option.disabled"
          @click="optionClicked(option.func)"
        >
          {{ option.func }}
        </div>
      </div>
    </transition>
    <svg
      width="80px"
      height="80px"
      x="0px"
      y="0px"
      viewBox="0 0 50 50"
      id="writeButtonFrame"
    >
      <g id="레이어_1">
        <g>
          <radialGradient
            id="SVGID_1_"
            cx="26.5"
            cy="23.5"
            r="20.5"
            gradientTransform="matrix(1 0 0 -1 0 50)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" style="stop-color: #000000" />
            <stop offset="0.3208" style="stop-color: #020202" />
            <stop offset="0.4578" style="stop-color: #090909" />
            <stop offset="0.5598" style="stop-color: #161616" />
            <stop offset="0.6445" style="stop-color: #272727" />
            <stop offset="0.7184" style="stop-color: #3f3f3f" />
            <stop offset="0.7848" style="stop-color: #5b5b5b" />
            <stop offset="0.8455" style="stop-color: #7d7d7d" />
            <stop offset="0.902" style="stop-color: #a5a5a5" />
            <stop offset="0.9529" style="stop-color: #d0d0d0" />
            <stop offset="1" style="stop-color: #ffffff" />
          </radialGradient>
          <circle class="st0" cx="26.5" cy="26.5" r="20.5" />
        </g>
        <circle class="st1 writeButtonBackground" cx="25" cy="25" r="19" />
      </g>
      <g id="레이어_2">
        <path
          class="st2"
          d="M22,31.7L20.9,31c-0.7-0.4-0.9-1.2-0.5-1.9l9.1-15.7c0.4-0.7,1.2-0.9,1.9-0.5l1.1,0.7c0.7,0.4,0.9,1.2,0.5,1.9
		l-9.1,15.7C23.6,31.8,22.7,32,22,31.7z"
        />
        <path
          class="st2"
          d="M19.9,33l0.2-3.2c0-0.4,0.5-0.6,0.8-0.4l2.4,1.4c0.4,0.2,0.4,0.7,0,0.9l-2.6,1.8C20.4,33.8,19.8,33.5,19.9,33z
		"
        />
        <rect
          x="18.6"
          y="34.9"
          transform="matrix(-0.866 -0.5 0.5 -0.866 16.5609 77.0152)"
          class="st3"
          width="0"
          height="2.8"
        />
        <line class="st4" x1="17.4" y1="38.1" x2="33.2" y2="38.1" />
      </g>
    </svg>
    <Dialog
      :visible.sync="standSelecting"
      :closable="false"
      :style="{ width: '400px' }"
      position="bottomright"
    >
      <template #header>
        <i class="pi pi-spin pi-spinner" style="fontsize: 2rem"></i>
        <p id="writeStateHeader">입장 선택</p>
      </template>
      입장을 선택해주세요.
      <template #footer>
        <Button
          label="반대"
          icon="pi pi-times"
          class="p-button-sm p-button-danger"
          @click="move(0)"
        />
        <Button
          label="찬성"
          icon="pi pi-check"
          class="p-button-sm p-button-success"
          @click="move(1)"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import * as d3 from "d3";
import httpService from "../service/httpService";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  components: {
    Dialog,
    Button,
  },
  data() {
    return {
      buttonClicked: false,
      standSelecting: false,
    };
  },
  computed: {
    optionList() {
      let categorys = ["삭제", "수정", "글쓰기", "연관글 쓰기", "답변"],
        result = [];

      for (let category of categorys) {
        let temp = {
          func: category,
        };

        if (category == "삭제" || category == "수정") {
          temp.disabled =
            !(this.$store.state.userId == this.$store.state.writer) ||
            this.$route.name == "home";
        } else if (category == "글쓰기") {
          temp.disabled = !(
            this.$route.name == "home" || this.$route.name == "search"
          );
        } else if (category == "연관글 쓰기") {
          temp.disabled =
            this.$route.name == "home" ||
            this.$route.name == "search" ||
            this.$route.name == "topic";
        } else if (category == "답변") {
          temp.disabled = !(
            this.$route.name == "topic" &&
            !this.$store.state.topicAnswered &&
            this.$store.state.userId === "admin"
          );
        }

        result.push(temp);
      }

      return result;
    },
  },
  mounted() {
    let background = d3.select(".writeButtonBackground").attr("fill", "white");

    let frame = d3
      .select("#writeButtonFrame")
      .on("mouseenter", () => {
        background.transition().attr("fill", "#ffff7b");
        frame.style("cursor", "pointer");
      })
      .on("mouseleave", () => {
        background.transition().attr("fill", "white");
        frame.style("cursor", "default");
      })
      .on("click", () => {
        this.buttonClicked = !this.buttonClicked;
      });
  },
  methods: {
    async optionClicked(func) {
      console.log("clicked!", func);
      let type = this.$route.name,
        id = this.$route.query.id,
        modalShow = (msg, title, variant, goHome) => {
          this.$bvModal
            .msgBoxOk(msg, {
              title: title,
              size: "mg",
              buttonSize: "mg",
              headerBgVariant: variant,
              okVariant: "light",
              bodyClass: "longModalContent",
              titleClass: "textWhite",
              centered: true,
            })
            .then(() => {
              if (goHome) {
                this.$router.push({
                  name: "home",
                });
              }
            });
        };

      switch (func) {
        case "글쓰기":
          this.$router.push({
            name: "write",
            query: {
              type: type,
              id: id,
            },
          });
          break;
        case "수정":
          if (type == "opinion") {
            this.$router.push({
              name: "write",
              query: {
                mode: "modify",
              },
            });
          } else if (type == "topic") {
            this.$router.push({
              name: "write",
              query: {
                mode: "modifyTopic",
              },
            });
          }
          break;
        case "삭제":
          this.$bvModal
            .msgBoxConfirm("정말로 삭제하시겠습니까?", {
              title: "Confirm",
              size: "mg",
              buttonSize: "mg",
              okVariant: "light",
              okTitle: "YES",
              headerBgVariant: "danger",
              cancelTitle: "NO",
              bodyClass: "longModalContent",
              titleClass: "textWhite",
              hideHeaderClose: true,
              centered: true,
            })
            .then(async (value) => {
              if (value) {
                try {
                  let res = "";
                  if (type == "opinion") {
                    res = await httpService.delete("/api/required/opinion", {
                      id: id,
                    });
                  } else if (type == "topic") {
                    res = await httpService.delete("/api/required/topic", {
                      id: id,
                    });
                  }
                  if (res == "OK") {
                    modalShow("삭제되었어요.", "Success", "success", true);
                  } else {
                    modalShow(
                      "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
                      "Error",
                      "danger",
                      false
                    );
                  }
                } catch (err) {
                  modalShow(
                    "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
                    "Error",
                    "danger",
                    false
                  );
                }
              }
            });
          break;
        case "답변":
          this.$router.push({
            name: "write",
            query: {
              mode: "answer",
              id: id,
            },
          });
          break;
        case "연관글 쓰기":
          if (this.$route.name == "opinion") {
            this.$router.push({
              name: "write",
              query: {
                relatedOpinions: JSON.stringify([
                  {
                    id: this.$store.state.opinionModifyData.source.opinionId,
                    title: this.$store.state.opinionModifyData.source.title,
                  },
                ]),
              },
            });
          } else if (this.$route.name == "issue") {
            this.standSelecting = true;
          }
          break;
      }
    },
    move(stand) {
      this.$router.push({
        name: "write",
        query: {
          relatedIssues: JSON.stringify([
            {
              id: this.$route.query.id,
              title: this.$store.state.currentIssueTitle,
              stand: stand,
            },
          ]),
        },
      });
    },
  },
};
</script>

<style scoped>
#optionArea {
  border: 1px solid rgba(0, 0, 0, 0.356);
  float: left;
  margin-top: 25px;
  margin-right: 10px;
  overflow: hidden;
}
.buttons {
  width: 100px;
  height: 50px;
  background-color: white;
  opacity: 0.7;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.buttons:hover {
  background-color: rgba(230, 230, 230, 0.575);
  opacity: 1;
  color: green;
  cursor: pointer;
}
#writeButtonFrame {
  float: left;
}
.st0 {
  fill: url(#SVGID_1_);
}
.st1 {
  stroke: silver;
  stroke-width: 0.5;
  stroke-miterlimit: 10;
}
.st2 {
  fill: #ffffff;
  stroke: #000000;
  stroke-miterlimit: 10;
}
.st3 {
  fill: #2215ff;
  stroke: #000000;
  stroke-width: 0.75;
  stroke-miterlimit: 10;
}
.st4 {
  fill: none;
  stroke: #000000;
  stroke-miterlimit: 10;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(30px);
  opacity: 0;
}
</style>
