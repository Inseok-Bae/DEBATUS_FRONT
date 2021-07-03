<template>
  <div>
    <div id="frame">
      <svg id="line">
        <line
          x1="0"
          x2="0"
          y1="0"
          y2="2000"
          stroke="#B301FA"
          stroke-width="7"
        />
      </svg>
      <div style="width: 100%">
        <b-row id="textArea">
          <p id="text">이슈</p>
        </b-row>
      </div>
    </div>
    <div class="loader" style="margin-left: 5.2%" />
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
  padding-left: 10%;
  font-size: 35px;
  color: #b301fa;
  margin-bottom: 80px;
}
#line {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 10px;
  height: 100%;
  margin-left: 50%;
}
</style>
