<template>
  <div>
    <div id="frame">
      <div style="width: 100%">
        <b-row id="textArea">
          <p id="text">토픽</p>
        </b-row>
      </div>
    </div>
    <div id="backgroundWrapper">
      <img src="../../assets/images/topicBackground.svg" id="background" />
    </div>
    <div class="loader" />
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
#text {
  width: 100%;
  font-size: 35px;
  color: #ff7100;
  margin-bottom: 80px;
}
#backgroundWrapper {
  position: fixed;
  width: 6%;
  height: 300px;
  overflow: hidden;
  top: 350px;
  left: 0px;
}
#background {
  width: 200%;
  position: absolute;
  left: -100%;
}
</style>