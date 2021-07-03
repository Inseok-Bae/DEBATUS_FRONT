<template>
  <div>
    <img
      src="../../../assets/images/flowers.jpg"
      alt=""
      v-show="imageShow"
      style="width: 100%"
    />
    <transition name="slide">
      <div id="mainImage" v-if="imageShow" @click="open">
        <img id="logo" src="../../../assets/images/logo.png" alt="" />
        <img id="msg" src="../../../assets/images/main_msg.png" alt="" />
        <i class="pi pi-angle-double-right arrowMove"></i>
        <p>클릭하여 진입하기</p>
      </div>
    </transition>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    mainImageShow: Boolean,
  },
  data() {
    return {
      imageShow: "",
    };
  },
  mounted() {
    d3.select("#bgCover").style("z-index", 1);
    this.$store.state.landingFlag = true;
    this.imageShow = this.mainImageShow;
    if (!this.mainImageShow) {
      this.open();
    }
  },
  methods: {
    open() {
      this.$store.state.landingFlag = false;
      this.imageShow = false;

      setTimeout(() => {
        this.$store.commit("setMainImageShow", false);
        d3.select("#bgCover").style("z-index", -1);
      }, 800);
    },
  },
};
</script>

<style scoped>
#darkCover {
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    182deg,
    #e3ff00,
    #f4f7da,
    #ffffff,
    #ffffff,
    #f9fdda,
    #e3ff00
  );
  background-size: 1200% 1200%;

  -webkit-animation: gradientAnim 14s ease infinite;
  -moz-animation: gradientAnim 14s ease infinite;
  animation: gradientAnim 14s ease infinite;
  z-index: 2;
}
#mainImage {
  z-index: 3;
  width: 40vmax;
  height: 75%;
  position: absolute;
  top: calc(6% + 60px);
  left: calc(50% - 20vmax);
  padding: 5vmax;
  background-color: rgba(255, 255, 255, 0.91);
}

#mainImage:hover {
  cursor: pointer;
  animation: colorChange 1s linear;
  background-color: rgba(255, 255, 0, 0.91);
}

@keyframes colorChange {
  0% {
    background-color: rgba(255, 255, 255, 0.91);
  }
  100% {
    background-color: rgba(255, 255, 0, 0.91);
  }
}

#logo {
  width: 60%;
  margin-bottom: 4vmax;
}
#msg {
  width: 100%;
}
.arrowMove {
  animation: arrowMove 1s ease-in-out infinite;
}
@-webkit-keyframes gradientAnim {
  0% {
    background-position: 54% 0%;
  }
  50% {
    background-position: 47% 100%;
  }
  100% {
    background-position: 54% 0%;
  }
}
@-moz-keyframes gradientAnim {
  0% {
    background-position: 54% 0%;
  }
  50% {
    background-position: 47% 100%;
  }
  100% {
    background-position: 54% 0%;
  }
}
@keyframes gradientAnim {
  0% {
    background-position: 54% 0%;
  }
  50% {
    background-position: 47% 100%;
  }
  100% {
    background-position: 54% 0%;
  }
}

@-webkit-keyframes arrowMove {
  0% {
    margin-right: 10px;
  }
  100% {
    margin-right: -10px;
  }
}

@keyframes arrowMove {
  0% {
    margin-right: 10px;
  }
  100% {
    margin-right: -10px;
  }
}
</style>
