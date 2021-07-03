<template>
  <div>
    <b-row>
      <b-col cols="4">
        <div id="menuWrapper">
          <div id="infoWrapper" class="menuButtons" @click="movePage('info')">
            <p id="info">DEBATUS란?</p>
          </div>
          <div class="devider" />
          <div
            id="searchWrapper"
            class="menuButtons"
            @click="movePage('search')"
          >
            <b-icon icon="search" />
            <p id="search">검색</p>
          </div>
        </div>
      </b-col>
      <b-col cols="4">
        <div id="logoWrapper">
          <img
            src="../../assets/images/logo.png"
            id="logo"
            @click="movePage('home')"
          />
        </div>
      </b-col>
      <b-col cols="4">
        <div id="menuWrapper">
          <div
            id="signInMenuWrapper"
            class="menuButtons"
            @click="movePage('signIn')"
            v-show="!loginState"
          >
            <p id="signIn">회원가입</p>
          </div>
          <div
            id="loginMenuWrapper"
            class="menuButtons"
            @click="movePage('login')"
            v-show="!loginState"
          >
            <p id="login">로그인</p>
          </div>
          <div
            id="logOutMenuWrapper"
            class="menuButtons"
            @click="logOut"
            v-show="loginState"
          >
            <p id="logOut">로그아웃</p>
          </div>

          <div
            id="myPageMenuWrapper"
            class="menuButtons"
            @click="movePage('myPage')"
            v-show="loginState"
          >
            <p id="logOut">마이 페이지</p>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  methods: {
    logoClicked() {
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    loginState() {
      return this.$store.state.loginFlag;
    },
  },
  mounted() {
    d3.selectAll(".menuButtons").each((d, i, g) => {
      let button = d3.select(g[i]);
      button
        .on("mouseenter", () => {
          button.select("p").transition().style("color", "#B1E000");
          button.style("cursor", "pointer");
        })
        .on("mouseleave", () => {
          button.select("p").transition().style("color", "black");
          button.style("cursor", "default");
        });
    });
  },
  methods: {
    movePage(name) {
      this.$router.push({ name: name });
    },
    logOut() {
      this.$store.commit("setLoginFlag", false);
      window.sessionStorage.removeItem("jwt-auth-token");
      this.movePage("home");
    },
  },
};
</script>

<style scoped>
#logoWrapper {
  width: 100%;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
#menuWrapper {
  width: 100%;
  height: 50px;
  overflow: hidden;
  padding-right: 50px;
}
#logo {
  width: auto;
  height: 60%;
}
#logo:hover {
  cursor: pointer;
}
#loginMenuWrapper {
  width: auto;
  height: 50px;
  margin-right: 5%;
  overflow: hidden;
  float: right;
}
#signInMenuWrapper,
#logOutMenuWrapper,
#myPageMenuWrapper {
  width: auto;
  height: 50px;
  overflow: hidden;
  float: right;
}
#myPageMenuWrapper {
  margin-right: 25px;
}
#signIn,
#logOut,
#login,
#search {
  margin: 0px;
  margin-top: 15px;
  display: inline-block;
}
#search {
  margin-left: 12%;
  margin-top: 13px;
}
#searchWrapper {
  width: 100px;
  height: 50px;
  overflow: hidden;
  float: left;
  margin-left: 5%;
}
#infoWrapper {
  width: 130px;
  height: 50px;
  overflow: hidden;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 13px;
}
.devider {
  width: 2px;
  height: 50%;
  margin-top: 12px;
  background-color: silver;
  float: left;
}
</style>