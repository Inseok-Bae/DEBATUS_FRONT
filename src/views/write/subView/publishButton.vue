<template>
  <div id="publishButtonFrame" v-b-modal.publishConfirm>
    <p style="margin: 0px; color: black">
      <b-icon icon="vector-pen" scale="1.1" style="margin-right: 10px" />게시
    </p>
    <b-modal
      id="publishConfirm"
      centered
      hide-header
      ok-title="Publish"
      cancel-variant="no"
      ok-variant="success"
      @ok="publish"
    >
      <div id="modalContent">게시하시겠습니까?</div>
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    publish() {
      this.$emit("publish");
    },
  },
};
</script>

<style scoped>
#publishButtonFrame {
  position: fixed;
  z-index: 3;
  bottom: 30px;
  left: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  border: 3px solid #b1e000;
  box-shadow: 0.3em 0.3em 0em rgba(192, 192, 192, 0.562);
}
#publishButtonFrame:focus {
  outline: none;
}
#publishButtonFrame:hover {
  background-color: rgba(255, 255, 0, 0.158);
  cursor: pointer;
}
#modalContent {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
