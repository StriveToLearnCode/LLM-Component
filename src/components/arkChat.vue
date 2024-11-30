<template>
  <div class="ask-container">
    <div class="top">
      <div class="headder">
        <div class="left">
          <div class="universal">Universal Search</div>
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
        <input type="text" />
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
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.ask-container {
  width: 400px;
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
      }
    }
    .input {
      position: relative;
      background-color: #0a0a0a;
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
        width: 300px;
        border: none;
      }
      input:focus {
        outline: none;
      }
    }
  }
  .content {
    width: 100%;
    height: 100px;
    overflow: auto;
  }
}
</style>
