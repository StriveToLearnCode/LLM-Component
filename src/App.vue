<template>
  <div class="h-screen bg-gray-800 p-4 relative">
    <div>
      <div class="text-center text-2xl">
        <i class="iconfont bg-gray-800">&#xe626;</i> Introducing Claude,AI
        Assistant<i class="iconfont bg-gray-800">&#xe64c;</i>
      </div>
    </div>
    <!-- 聊天区域 -->
    <div class="w-3/5 m-auto">
      <TalkingList />
    </div>
  </div>
</template>
<script setup>
import TalkingList from './components/TalkingList.vue'
</script>
<style scoped>
.tools {
  display: flex;
  justify-content: space-between;
}
</style>
