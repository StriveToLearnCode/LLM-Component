<template>
  <div class="sidebar">
    <div class="top">
      <div class="title">Claude</div>
      <div>
        <i class="iconfont">&#xe604;</i>
      </div>
    </div>
    <div class="content">
      <div class="add">
        <i class="iconfont">&#xe611;</i>
        <span>Start new chat</span>
      </div>
    </div>
    <div class="bottom">
      <div class="recents">
        <div class="title">Recents</div>
        <div class="list">
          <div class="item active">
            <i class="iconfont">&#xe620;</i>
            <span>Introducing Claude,AI Assistant</span>
          </div>
          <div class="item">
            <i class="iconfont">&#xe620;</i>
            <span>Say Hello</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.container {
  height: 100%;
  background-color: #2d2d2a;
  padding: 10px 30px;
  .top {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 22px;
      text-align: center;
    }
  }
  .content {
    margin-top: 20px;
    .add {
      display: flex;
      align-items: center;
      cursor: pointer;
      .iconfont {
        background-color: #23221e;
        font-size: 18px;
        margin-right: 10px;
        color: #9d5636;
      }
      span {
        color: #9d5636;
      }
    }
  }
  .bottom {
    .recents {
      margin-top: 20px;
      .title {
        font-size: 18px;
      }

      .list {
        margin-top: 10px;
        .active {
          background-color: #1a1915;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 5px 0;
          cursor: pointer;
          .iconfont {
            background-color: #23221e;
            font-size: 18px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
