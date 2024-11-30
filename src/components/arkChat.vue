<template>
  <div class="ask-container">
    <div class="top">
      <div class="headder">
        <div class="left">
          <div class="universal" @click="openSearch">Universal Search</div>
          <div class="ask">
            <span>Ask</span>
            <i class="iconfont">&#xe7ca;</i>
          </div>
        </div>
        <div class="right">
          <div>Experimental</div>
        </div>
      </div>
      <div class="input">
        <div>
          <span>Ark</span>
          <i class="iconfont">&#xe7ca;</i>
        </div>
        <input type="text" v-model="content" @click:enter="sendMessage" />
        <div class="send" @click="sendMessage">
          <i class="iconfont">&#xe600;</i>
        </div>
      </div>
    </div>
    <div class="content">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { quickChat } from "../api/chat";
import { marked } from "marked"; // 引入 marked 库
import { useIsShowStore } from "../store/index";
const isSending = ref(false); // 用于跟踪发送状态
const content = ref("");
const messageArr = ref([]);
const store = useIsShowStore();

// 开场白
onMounted(() => {
  console.log(store.Suggestion);
  quickChat(store.Suggestion || "介绍你自己简短点").then((res) => {
    messageArr.value.push(res.data.choices[0].message);
  });
  store.setSuggestion("");
});
const sendMessage = async () => {
  if (isSending.value) return;
  if (!content.value) {
    alert("消息不能为空");
    return;
  }
  const message = content.value;
  content.value = "";
  messageArr.value.push({ role: "user", content: message });
  isSending.value = true;
  const res = await quickChat(message);
  isSending.value = false;
  messageArr.value.push(res.data.choices[0].message);
};
// 将 Markdown 转换为 HTML
const renderMarkdown = (content) => {
  return marked.parse(content); // 使用 marked 库将 Markdown 转换为 HTML
};
const openSearch = () => {
  console.log("openSearch");
  store.setIsShow(true);
};
</script>

<style scoped lang="scss">
.ask-container {
  width: 500px;
  height: 100%;
  background-color: #0a0a0a;
  color: #a6a6a6;
  border-radius: 20px;
  border: 1px solid #2a2a2a;
  padding: 10px;
  .top {
    border-bottom: 1px solid #2a2a2a;
    .headder {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
      .left {
        display: flex;
        gap: 10px;
        .ask,
        .universal {
          cursor: pointer;
        }
      }
      .right {
        cursor: pointer;
      }
    }
    .input {
      position: relative;
      background-color: #0a0a0a;
      .send {
        .iconfont {
          position: absolute;
          top: -10px;
          left: 440px;
        }
      }
      div {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        span {
          margin-right: 5px;
        }
      }
      input {
        background-color: #0a0a0a;
        padding: 5px 10px 5px 70px;
        width: 430px;
        border: none;
      }
      input:focus {
        outline: none;
      }
    }
  }
  .content {
    width: 100%;
    height: 200px;
    overflow: auto;
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
</style>
