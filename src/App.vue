<template>
  <div id="app">
    <transition name="fade-out">
      <home-screen class="pageScreen" v-show="homeScreenShow" />
    </transition>
    <transition name="fade-out">
      <opinion-screen class="pageScreen" v-show="opinionScreenShow" />
    </transition>
    <transition name="fade-out">
      <issue-screen class="pageScreen" v-show="issueScreenShow" />
    </transition>
    <transition name="fade-out">
      <topic-screen class="pageScreen" v-show="topicScreenShow" />
    </transition>

    <top-bar id="topBar" v-show="screenSize > 1200" />

    <writeButton id="writeButton" v-if="writeButtonShow" />
    <transition :name="routerTransition" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <Toast position="bottom-left" />
    <Dialog
      :visible.sync="writingState"
      :closable="false"
      :style="{ width: '400px' }"
      position="bottomleft"
    >
      <template #header>
        <i class="pi pi-spin pi-spinner" style="fontsize: 2rem"></i>
        <p id="writeStateHeader">게시글 작성중</p>
      </template>
      <p style="text-align: left; margin: 0px">
        글 작성 창으로 돌아갈 수 있어요.
      </p>
      <template #footer>
        <Button
          label="취소하기"
          icon="pi pi-times"
          class="p-button-sm p-button-danger p-button-text"
          @click="closeWriteState('cancel')"
        />
        <Button
          label="돌아가기"
          icon="pi pi-check"
          class="p-button-sm p-button-success"
          @click="closeWriteState('return')"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import topBar from "../src/components/topBar/Main";

import writeButton from "../src/components/WriteButton";

import homeScreen from "../src/components/screen/Home";
import opinionScreen from "../src/components/screen/Opinion";
import issueScreen from "../src/components/screen/Issue";
import topicScreen from "../src/components/screen/Topic";

import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  components: {
    topBar,
    writeButton,

    homeScreen,
    opinionScreen,
    issueScreen,
    topicScreen,

    Toast,
    Dialog,
    Button,
  },
  data() {
    return {
      screenSize: window.innerWidth,
    };
  },
  watch: {
    screenSize(newVal) {
      if (newVal < 1200) {
        this.$router.push({ name: "mobile" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
  },
  computed: {
    homeScreenShow() {
      return this.$store.state.homeScreenShow;
    },
    opinionScreenShow() {
      return this.$store.state.opinionScreenShow;
    },
    issueScreenShow() {
      return this.$store.state.issueScreenShow;
    },
    topicScreenShow() {
      return this.$store.state.topicScreenShow;
    },
    writeButtonShow() {
      return (
        this.$route.name !== "write" &&
        this.$route.name !== "info" &&
        this.$store.state.loginFlag &&
        !this.$store.state.landingFlag
      );
    },
    loginState() {
      return this.$store.state.loginFlag;
    },
    writingState() {
      if (!this.loginState) {
        this.$store.commit("setWritingState", false);
      }
      return this.$store.state.writingState;
    },
    routerTransition() {
      return this.$store.state.routerTransition;
    },
  },
  mounted() {
    this.screenSize = window.innerWidth;
    this.$store.commit("setWindowSize", window.innerWidth);
    if (this.screenSize < 1200) {
      this.$router.push({ name: "mobile" });
    }
    console.log(this.screenSize);
    window.onbeforeunload = () => {
      this.$store.commit("setMainImageShow", true);
    };
    window.onresize = () => {
      this.screenSize = window.innerWidth;
      this.$store.commit("setWindowSize", window.innerWidth);
    };
    window.onscroll = () => {
      this.$store.commit("setWindowScroll", window.scrollY);
    };
  },
  methods: {
    closeWriteState(e) {
      if (e == "cancel") {
        this.$store.commit("setWritingState", false);
      } else if (e == "return") {
        this.$store.commit("setWritingState", false);
        this.$router.push({
          name: "write",
          query: {
            mode: this.$store.state.writingStateMode,
          },
        });
      }
    },
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-family: rixsinhead-pro, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#topBar {
  z-index: 5000;
  position: fixed;
  opacity: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background: rgb(255, 255, 255);
  box-shadow: 0 4px 10px 1px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.05);
}
#navigatorButton,
#writeButton {
  position: fixed;
  right: 3%;
  z-index: 1000;
}

#navigatorButton {
  bottom: 150px;
}
#writeButton {
  bottom: 70px;
}

.tooltip,
.tooltip-arrow {
  z-index: 9999 !important;
}
.pageScreen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 5001;
}

.loader {
  position: fixed;
  top: calc(55% - 25px);
  left: calc(50% - 25px);
  border: 2px solid grey;
  border-top: 2px solid #f3f3f3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 5002;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.toastAppend {
  text-align: center;
}
.issueTabTitle {
  color: #b301fa;
}
.opinionTabTitle {
  color: #b1e000;
}
.longModalContent {
  height: 7em;
  display: flex;
  align-items: center;
  overflow: auto;
}
.textWhite {
  color: white;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(212, 212, 212);
}
.p-ripple.topic .p-ink {
  background: #ff710030;
}
.p-ripple.issue .p-ink {
  background: #b301fa30;
}
.p-ripple.opinion .p-ink {
  background: #b1e00030;
}
/* .p-toast {
  width: 40rem !important;
  margin-left: -17.5rem !important;
} */
.p-toast-summary {
  font-weight: 500 !important;
  text-align: left !important;
  white-space: normal;
  word-break: break-all;
}
#writeStateHeader {
  width: 100%;
  font-weight: bolder;
  font-size: 1vw;
  text-align: left;
  margin: 0px;
  margin-left: 7%;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 1s ease;
}
.slide-enter {
  transform: translate(50%, 0);
  opacity: 1;
}
.slide-leave-to {
  transform: translate(-50%, 0);
  opacity: 0;
}
.topicList .nav-tabs .nav-link.active {
  background-color: #ff7100;
  color: white;
  border: 1px solid #ff7100;
}
.topicList .nav-tabs {
  border-bottom: 1px solid #ff7100;
}
.topicList .nav-tabs .nav-link {
  color: grey;
}
#footer {
  margin-top: 100px;
  width: 100%;
  height: 150px;
  background: #030f29;
  z-index: 5001;
}
</style>
