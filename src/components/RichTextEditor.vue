<template>
  <div class="editor-container">
    <!-- Quill 编辑器 -->
    <QuillEditor
      theme="snow"
      ref="quill"
      v-model:content="content"
      :options="editorOptions"
    />
    <div class="tools">
      <i class="iconfont" @click="insertPDF">&#xe6c8;</i>
      <i class="iconfont" @click="insertImage">&#xe8bc;</i>
    </div>

    <div class="button iconfont" @click="sendMessage">
      <div class="loading" v-if="isSending">
        <loading></loading>
      </div>
      <div class="arrow" v-else>&#xe60f;</div>
    </div>
    <div v-html="content" style="display: none"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { quickChat } from "@/api/chat";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useIsShowStore } from "@/store/index";
import loading from "./loading.vue";
const store = useIsShowStore();
const content = ref(""); // 绑定编辑器内容
const quill = ref(null);
const isSending = ref(false); // 用于跟踪发送状态
const editorOptions = {
  placeholder: "Reply to Claude...",
  modules: {
    toolbar: false, // 关闭工具栏
  },
};

// 发送消息
const sendMessage = async () => {
  if (isSending.value) return;
  if (!content.value) {
    alert("消息不能为空");
    return;
  }
  const message = content.value?.ops[0]?.insert;
  store.addMessageArr({ role: "user", content: message });
  isSending.value = true;
  const res = await quickChat(message);
  isSending.value = false;
  console.log(res.data.choices[0].message);
  store.addMessageArr(res.data.choices[0].message);
};

// 插入图片
const insertImage = () => {
  const url = prompt("Enter the image URL");
  const range = quill.value.quill.getSelection();
  quill.value.quill.insertEmbed(range.index, "image", url);
};

// 插入 PDF
const insertPDF = () => {
  const url = prompt("Enter the PDF URL");
  const range = quill.value.quill.getSelection();
  const pdfContainer = `<div class="pdf-container">
                              <embed src="${url}" width="500" height="375" type="application/pdf">
                            </div>`;
  quill.value.quill.clipboard.dangerouslyPasteHTML(range.index, pdfContainer);
};
</script>

<style scoped>
.editor-container {
  position: relative;
}
.tools {
  position: absolute;
  bottom: 80px;
  right: 20px;
  display: inline-block;
  .iconfont {
    background-color: #393937;
    font-size: 20px;
    padding: 5px;
  }
}
.button.iconfont {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  width: 30px;
  text-align: center;
  border-radius: 50%;
  line-height: 30px;
  height: 30px;
  background-color: #d7d7d7;
}
.arrow:hover {
  background-color: #000;
  border-radius: 50%;
}
</style>
