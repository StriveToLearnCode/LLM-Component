<template>
  <div class="relative">
    <!-- Quill 编辑器 -->
    <QuillEditor
      theme="snow"
      ref="quill"
      v-model:content="content"
      :options="editorOptions"
    />
    <div class="absolute bottom-20 right-2">
      <!-- pdf按钮 -->
      <i
        class="iconfont cursor-pointer text-2xl bg-gray-800 p-2 rounded-full mr-2"
        @click="insertPDF"
        >&#xe6c8;</i
      >
      <!-- 照片按钮 -->
      <i
        class="iconfont cursor-pointer text-2xl bg-gray-800 p-2 rounded-full"
        @click="insertImage"
        >&#xe8bc;</i
      >
    </div>

    <div
      class="iconfont absolute bottom-2 right-2 cursor-pointer text-4xl bg-gray-800 rounded-full flex items-center justify-center w-14 h-14"
      @click="sendMessage"
    >
      <div class="loading" v-if="isSending">
        <loading></loading>
      </div>
      <div v-else>&#xe60f;</div>
    </div>
    <div v-html="content" style="display: none"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import { quickChat } from '@/api/chat.js'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import loading from './loading.vue'
const content = ref('') // 绑定编辑器内容
const quill = ref(null)
const isSending = ref(false) // 用于跟踪发送状态
const editorOptions = {
  placeholder: 'Reply to Claude...',
  modules: {
    toolbar: false // 关闭工具栏
  }
}
// 发送给父组件
const emit = defineEmits(['sendMsg'])

// 发送消息
const sendMessage = async () => {
  if (isSending.value) return
  if (!content.value) {
    alert('消息不能为空')
    return
  }
  const message = content.value?.ops[0]?.insert
  emit('sendMsg', { role: 'user', content: message })
  isSending.value = true
  const res = await quickChat(message)
  isSending.value = false
  emit('sendMsg', res.data.choices[0].message)
}

// 插入图片
const insertImage = () => {
  const url = prompt('Enter the image URL')
  const range = quill.value.quill.getSelection()
  quill.value.quill.insertEmbed(range.index, 'image', url)
}

// 插入 PDF
const insertPDF = () => {
  const url = prompt('Enter the PDF URL')
  const range = quill.value.quill.getSelection()
  const pdfContainer = `<div class="pdf-container">
                              <embed src="${url}" width="500" height="375" type="application/pdf">
                            </div>`
  quill.value.quill.clipboard.dangerouslyPasteHTML(range.index, pdfContainer)
}
</script>

<style scoped>
.tools {
  position: absolute;
  bottom: 100px;
  right: 60px;
  display: inline-block;
  .iconfont {
    background-color: #393937;
    font-size: 20px;
    padding: 5px;
  }
}
.button.iconfont {
  position: absolute;
  bottom: 40px;
  right: 60px;
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
/* .button.iconfont:hover {
  background-color: #000;
} */
</style>
