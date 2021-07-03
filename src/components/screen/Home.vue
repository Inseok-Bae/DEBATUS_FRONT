<template>
  <div>
    <div id="frame">
      <div style="width: 100%">
        <b-row id="logoArea">
          <div id="logoWrapper">
            <img src="../../assets/images/logo.png" id="logo" />
          </div>
        </b-row>
        <b-row id="textArea">
          <p id="subText">사람이 아닌 생각을 보다.</p>
        </b-row>
      </div>
    </div>
    <!-- <div class="loader" /> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#frame {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
}
#logoArea {
  width: 50%;
  height: auto;
  overflow: hidden;
  margin: 0px auto;
  margin-bottom: 10px;
}
#logoWrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
#logo {
  width: 30%;
  height: auto;
}
#subText {
  width: 100%;
  font-size: 17px;
  color: #1a1a1a;
  margin-bottom: 80px;
}
</style>