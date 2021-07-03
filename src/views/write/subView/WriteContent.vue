<template>
  <div id="contentFrame">
    <div id="titleArea">
      <InputText
        id="title"
        :class="'p-' + invalid"
        type="username"
        aria-describedby="title-help"
        placeholder="제목"
        v-model="title"
        @input="textInputEvent"
      />
      <p id="title-help" :class="invalid">
        {{ titleHelper }}
      </p>
    </div>
    <div id="textArea">
      <Textarea
        id="textInput"
        v-model="text"
        @input="textInputEvent"
        placeholder="내용"
      />
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

export default {
  components: {
    InputText,
    Textarea,
  },
  data() {
    return {
      title: "",
      text: "",
    };
  },
  computed: {
    titleHelper() {
      if (this.title.length <= 100) {
        return this.title.length + " / 100";
      } else {
        return `100자 미만으로 작성해주세요. (현재 ${this.title.length}자)`;
      }
    },
    invalid() {
      return this.title.length <= 100 ? "" : "invalid";
    },
  },
  methods: {
    textInputEvent() {
      this.$emit("inputEvent", {
        title: this.title,
        text: this.text,
      });
    },
    setContent(e) {
      this.title = e.title;
      this.text = e.text;
    },
  },
};
</script>

<style scoped>
#contentFrame {
  height: 100%;
}
#titleArea {
  width: 100%;
  height: 20%;
}
#title {
  width: 100%;
  padding: 8px 20px;
}
#title-help {
  margin-top: 10px;
  font-size: 12px;
  width: 100%;
  text-align: right;
}
.invalid {
  color: red;
}
#textArea {
  width: 100%;
  height: 80%;
}
#textInput {
  resize: none;
  font-size: 1em;
  line-height: 1.5em;
  width: 100%;
  height: 100%;
  padding: 2%;
  border: 1px solid rgb(223, 223, 223);
  overflow: auto;
}
#textInput:focus,
#title:focus {
  outline: none !important;
  box-shadow: 0 0 15px #dbdbdb;
  border-color: #b1e000;
}
#textInput:hover,
#title:hover {
  border-color: #b1e000;
}
</style>