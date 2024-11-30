<template>
  <div class="inline-dialog" v-if="store.isShow">
    <div class="top">
      <input type="text" placeholder="What are you searching for?" />
      <div class="Esc" @click="close">
        <span>Esc</span>
      </div>
    </div>
    <div class="middle" @click="enterChat">
      <div class="ask">
        <i class="iconfont">&#xe7ca;</i>
        <span>Ask</span>
      </div>
      <div>
        <span>Experimental</span>
      </div>
    </div>
    <div class="bottom">
      <div class="title">Suggestions</div>
      <div class="list" @click="choose">
        <div class="item">
          <i class="iconfont">&#xe663;</i>
          <span>今天天气怎么样？</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe62f;</i>
          <span>现在几点了？</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe663;</i>
          <span>今天是什么日期？</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe663;</i>
          <span>能不能给我一些建议？</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe663;</i>
          <span>能帮我做这个吗？</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe663;</i>
          <span>怎么去某个地方？</span>
        </div>
      </div>
    </div>
  </div>
  <AskChat v-else></AskChat>
</template>
<script setup>
import AskChat from "./arkChat.vue";
import { useIsShowStore } from "../store/index";
const store = useIsShowStore();
const emit = defineEmits(["close"]);
const close = () => {
  emit("close", false);
};
const enterChat = () => {
  store.setIsShow(false);
};
const choose = (e) => {
  store.setIsShow(false);
  store.setSuggestion(e.target.innerText);
};
</script>
<style scoped lang="scss">
.inline-dialog {
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  width: 550px;
  height: 400px;
  background-color: #0a0a0a;
  font-size: 14px;
  .top {
    position: relative;
    input {
      width: 100%;
      height: 50px;
      border-radius: 10px 10px 0 0;
      background-color: #0a0a0a;
      border-color: #2a2a2a;
      color: #fff;
      padding: 10px;
    }
    input:focus {
      outline: none;
    }
    .Esc {
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 10px;
      padding: 5px 8px;
      font-size: 14px;
      border-radius: 10px;
      border: 1px solid #2a2a2a;
      span {
        color: #fff;
      }
    }
  }

  .middle {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin: 8px;
    padding: 0 10px;
    height: 40px;
    border-color: #2a2a2a;
    text-align: center;
    line-height: 40px;
    .ask {
      border-color: #2a2a2a;
      span {
        color: #fff;
        margin-left: 8px;
      }
      .inconfont {
        background-color: #0a0a0a;
        border-color: #2a2a2a;
        color: #fff;
      }
    }
    .experimental {
      width: 100px;
      border-radius: 10px;
      text-align: center;
      border-color: #2a2a2a;
      span {
        color: #fff;
      }
    }
  }
  .middle:hover {
    background-color: #2a2a2a;
    border-color: #2a2a2a;
    border-radius: 5px;
  }
  .bottom {
    .title {
      margin-left: 10px;
      line-height: 20px;
      height: 20px;
      color: #949494;
    }
    .item {
      margin: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 5px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      .iconfont {
        margin-right: 8px;
        font-size: 18px;
      }
      span {
        color: #fff;
      }
    }
    .item:hover {
      background-color: #2a2a2a;
    }
    .list {
      height: 250px;
      overflow: auto;
      .item {
        padding: 10px;
        border-color: #2a2a2a;
        color: #fff;
      }
    }
  }
}
</style>
