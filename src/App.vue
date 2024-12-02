<template>
  <div class="h-screen bg-gray-800 p-4 relative overflow-hidden">
    <!-- 头部区域 -->
    <div>
      <HeadBar />
    </div>
    <!-- 聊天区域 -->
    <div class="w-3/5 m-auto">
      <TalkingList />
    </div>
  </div>
</template>
<script setup>
import HeadBar from './components/HeadBar.vue'
import TalkingList from './components/TalkingList.vue'
</script>
<style scoped></style>
