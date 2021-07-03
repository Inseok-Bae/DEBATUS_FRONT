<template>
  <div>
    <div id="recommendButton" @click="clicked">
      <b-icon icon="person-plus-fill" scale="1.5" />
      <p id="count">{{ recommendCount }}</p>
    </div>
  </div>
</template>

<script>
import httpService from "../../../service/httpService";

export default {
  props: {
    recommendCount: Number,
  },
  methods: {
    async clicked() {
      let showModal = (msg) => {
        this.$bvModal.msgBoxOk(msg, {
          title: "Error",
          size: "mg",
          buttonSize: "mg",
          headerBgVariant: "danger",
          okVariant: "light",
          bodyClass: "longModalContent",
          titleClass: "textWhite",
          centered: true,
        });
      };

      try {
        let result = await httpService.patch(
          "/api/required/opinion/recommendCount",
          {
            opinionId: this.$route.query.id,
            recommendCount: 1,
          }
        );
        if (result == "dup") {
          this.$toast.add({
            severity: "warn",
            summary: `이미 추천했어요.`,
            life: 1500,
            closable: false,
          });
          return;
        }
      } catch (err) {
        showModal("알 수 없는 오류가 발생했어요. 나중에 다시 시도해주세요.");
        return;
      }

      this.$emit("updateRecommendCount", 1);
    },
  },
};
</script>

<style scoped>
#recommendButton {
  width: 120px;
  height: 40px;
  border: 1px solid silver;
  border-radius: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#recommendButton:hover {
  background-color: #afe000;
  color: white;
  cursor: pointer;
}
#count {
  width: 35px;
  margin: 0px;
  margin-left: 13px;
}
</style>
