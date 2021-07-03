<template>
  <div>
    <div id="frame">
      <div style="width: 100%">
        <b-row id="textArea">
          <p id="text">의견</p>
        </b-row>
      </div>
    </div>
    <img src="../../assets/images/opinionBackground.svg" id="background" />
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
  color: #b1e000;
  margin-bottom: 80px;
}
#background {
  width: 60%;
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 1;
  opacity: 0.5;
}
</style>