<template>
  <div id="footerFrame">
    <b-row
      no-gutters
      style="
        width: 100%;
        height: 100%;
        padding: 25px 10% 0% 10%;
        background-color: rgba(233, 233, 233, 0.692);
      "
    >
      <b-col cols="2"
        ><img
          src="../../../assets/images/logo.png"
          style="height: 40px; margin-left: 8px; margin-top: 12px; float: left"
        />
        <p
          style="
            width: 100%;
            font-size: 13px;
            color: black;
            font-style: italic;
            float: left;
            text-align: left;
          "
        >
          사람이 아닌 생각을 보다
        </p>
      </b-col>
      <b-col cols="9">
        <p style="text-align: left; margin-top: 12px">Contact</p>
        <p style="float: left; color: black; font-size: 13px">
          <span style="margin-right: 10px">Email : </span>qodlstjr1541@naver.com
        </p>
      </b-col>
      <b-col cols="1">
        <p
          style="
            margin-top: 55px;
            color: black;
            font-size: 14px;
            text-align: right;
          "
        >
          @2021.InSeok
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#footerFrame {
  width: 100%;
  overflow: hidden;
  height: 130px;
}
</style>
