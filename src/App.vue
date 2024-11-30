<template>
  <div class="h-screen bg-gray-800 p-4 relative">
    <div>
      <div class="text-center text-2xl">
        <i class="iconfont bg-gray-800">&#xe626;</i> Introducing Claude,AI
        Assistant<i class="iconfont bg-gray-800">&#xe64c;</i>
      </div>
    </div>
    <!-- TODO 聊天区域滑动窗口 -->
    <div class="mt-4 w-3/4 overflow-auto m-auto" ref="contain">
      <!-- 用户-->
      <!-- TODO 用户区域留言靠左 -->
      <div v-for="(item, index) in messageArr" :key="index">
        <!-- 原先left -->
        <div class="rounded-2xl p-4 mb-6 bg-gray-700" v-if="item.role === 'user'">
          <div class="flex items-center bg-gray-700">
            <div class="bg-gray-700 p-4 leading-6">{{ item.content }}</div>
            <div class="bg-gray-700 p-4">
              <img
                class="w-12 h-12 rounded-full bg-gray-700"
                src="@/assets/user.png"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
        <!-- AI -->
        <!-- 原先right -->
        <!-- TODO AI区域留言靠左 -->
        <div class="rounded-2xl p-4 mb-4 bg-gray-600 relative" v-else>
          <div class="flex items-center bg-gray-600 justify-between">
            <div class="bg-gray-600 p-4">
              <img
                class="w-12 h-12 rounded-full bg-gray-600"
                src="@/assets/chatgpt.jpg"
                alt="AI Avatar"
              />
            </div>
            <div
              class="bg-gray-600 p-4 leading-6"
              v-html="renderMarkdown(item.content)"
            ></div>
          </div>
          <div
            class="absolute right-4 flex justify-center items-center text-sm bg-gray-600 h-8 rounded-lg w-40 shadow-md"
          >
            <div class="cursor-pointer mr-1" @click="copyMessage(item.content)">
              <i class="iconfont bg-gray-600">&#xe706;</i>
              <span class="bg-gray-600">Copy</span>
            </div>
            <div class="cursor-pointer mr-1">
              <i class="iconfont bg-gray-600">&#xe774;</i>
              <span class="bg-gray-600">Retry</span>
            </div>
            <div class="cursor-pointer mr-1">
              <i class="iconfont bg-gray-600">&#xec7f;</i>
            </div>
            <div class="cursor-pointer">
              <i class="iconfont bg-gray-600">&#xe62d;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 输入框区域 -->
    <div class="w-full absolute bottom-4 right-1 tablet:right-0">
      <RichTextEditor class="w-4/5 tablet:w-1/2 m-auto" @sendMsg="responseMsg" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import RichTextEditor from './components/RichTextEditor.vue'
import { marked } from 'marked' // 引入 marked 库
const messageArr = ref([])
const contain = ref(null)
// 处理消息发送
const responseMsg = (message) => {
  // 滚动到最新消息
  contain.value.scrollTop = 99999999
  console.log(message)

  // 如果消息来自 AI，则执行打字机效果
  if (message.role === 'assistant') {
    // 推送新的消息对象到数组
    messageArr.value.push({
      ...message,
      content: '' // 初始化为空字符串，打字效果开始时再填充内容
    })
    typingEffect(message.content)
  } else {
    messageArr.value.push(message)
  }
}

// 复制消息内容
const copyMessage = (message) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = message // 如果 message 包含 HTML，则解析 HTML
  const plainText = tempDiv.innerText || tempDiv.textContent // 获取纯文本内容

  navigator.clipboard
    .writeText(plainText) // 使用 Clipboard API 复制内容
    .then(() => {
      alert('复制成功!')
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
      alert('复制失败，请重试')
    })
}
// 将 Markdown 转换为 HTML
const renderMarkdown = (content) => {
  return marked.parse(content) // 使用 marked 库将 Markdown 转换为 HTML
}
// 打字机效果
const typingEffect = (text) => {
  const lastMessageIndex = messageArr.value.length - 1 // 获取最后一条消息的索引
  let index = 0

  // 每个字符逐渐显示，模拟打字机效果
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      messageArr.value[lastMessageIndex].content += text[index] // 每次追加一个字符
      index++
      // 滚动到最新消息
      contain.value.scrollTop = 99999999
    } else {
      clearInterval(typingInterval) // 打字结束，清除定时器
      // 滚动到最新消息
      contain.value.scrollTop = 99999999
    }
  }, 50) // 控制每个字符之间的时间间隔
}
</script>
<style scoped>
.tools {
  display: flex;
  justify-content: space-between;
}
</style>
