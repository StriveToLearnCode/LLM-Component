<template>
  <div class="container">
    <div class="top">
      <div class="title">
        <i class="iconfont">&#xe626;</i> Introducing Claude,AI Assistant<i
          class="iconfont"
          >&#xe64c;</i
        >
      </div>
    </div>
    <div class="content" ref="contain">
      <!-- 用户 -->
      <div v-for="(item, index) in messageArr" :key="index">
        <div class="left" v-if="item.role === 'user'">
          <div class="user">
            <div class="avatar">
              <img src="@/assets/user.png" alt="User Avatar" />
            </div>
            <div class="text">{{ item.content }}</div>
          </div>
        </div>
        <!-- AI -->
        <div class="right" v-else>
          <div class="Ai">
            <div class="text" v-html="renderMarkdown(item.content)"></div>
            <div class="avatar">
              <img src="@/assets/chatgpt.jpg" alt="AI Avatar" />
            </div>
          </div>
          <div class="tools">
            <div class="copy" @click="copyMessage(item.content)">
              <i class="iconfont">&#xe706;</i>
              <span>Copy</span>
            </div>
            <div class="retry">
              <i class="iconfont">&#xe774;</i>
              <span>Retry</span>
            </div>
            <div class="like">
              <i class="iconfont">&#xec7f;</i>
            </div>
            <div class="dislike">
              <i class="iconfont">&#xe62d;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <RichTextEditor @sendMsg="responseMsg" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import RichTextEditor from "./components/RichTextEditor.vue";
import { marked } from "marked"; // 引入 marked 库
const messageArr = ref([]);
const contain = ref(null);
// 处理消息发送
const responseMsg = (message) => {
  // 滚动到最新消息
  contain.value.scrollTop = 99999999;
  console.log(message);

  // 如果消息来自 AI，则执行打字机效果
  if (message.role === "assistant") {
    // 推送新的消息对象到数组
    messageArr.value.push({
      ...message,
      content: "", // 初始化为空字符串，打字效果开始时再填充内容
    });
    typingEffect(message.content);
  } else {
    messageArr.value.push(message);
  }
};

// 复制消息内容
const copyMessage = (message) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = message; // 如果 message 包含 HTML，则解析 HTML
  const plainText = tempDiv.innerText || tempDiv.textContent; // 获取纯文本内容

  navigator.clipboard
    .writeText(plainText) // 使用 Clipboard API 复制内容
    .then(() => {
      alert("复制成功!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      alert("复制失败，请重试");
    });
};
// 将 Markdown 转换为 HTML
const renderMarkdown = (content) => {
  return marked.parse(content); // 使用 marked 库将 Markdown 转换为 HTML
};
// 打字机效果
const typingEffect = (text) => {
  const lastMessageIndex = messageArr.value.length - 1; // 获取最后一条消息的索引
  let index = 0;

  // 每个字符逐渐显示，模拟打字机效果
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      messageArr.value[lastMessageIndex].content += text[index]; // 每次追加一个字符
      index++;
      // 滚动到最新消息
      contain.value.scrollTop = 99999999;
    } else {
      clearInterval(typingInterval); // 打字结束，清除定时器
      // 滚动到最新消息
      contain.value.scrollTop = 99999999;
    }
  }, 50); // 控制每个字符之间的时间间隔
};
</script>
<style scoped lang="scss">
.container {
  height: 731px;
  background-color: #2d2d2a;
  padding: 10px 30px;
  .top {
    .title {
      font-size: 22px;
      text-align: center;
    }
  }
  .content {
    margin-top: 30px;
    width: 100%;
    height: 520px;
    overflow: auto;
    .left,
    .right {
      border-radius: 10px; /* 添加边框圆角 */
      padding: 10px;
      margin-bottom: 25px;
    }
    // 用户
    .left {
      background-color: #22211e;
      .user {
        display: flex;
        align-items: center;
        background-color: #22211e;
        .avatar {
          background-color: #22211e;
          padding: 10px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #22211e !important;
          }
        }
        .text {
          background-color: #22211e;
          padding: 10px;
          line-height: 25px;
        }
      }
    }
    // AI
    .right {
      background-color: #30302d;
      position: relative;
      .Ai {
        display: flex;
        align-items: center;
        background-color: #30302d;
        justify-content: space-between;
        .avatar {
          padding: 10px;
          background-color: #30302d;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .text {
          background-color: #30302d;
          padding: 10px;
          line-height: 25px;
        }
      }
      .tools {
        position: absolute;
        right: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 15px;
        background-color: #30302d;
        height: 30px;
        border-radius: 10px;
        width: 200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        div {
          background-color: #30302d;
          cursor: pointer;
          span {
            background-color: #30302d;
          }
        }
      }
    }
  }
}
</style>
