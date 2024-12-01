import { defineStore } from "pinia";

export const useIsShowStore = defineStore("isShow", {
  // 其他配置...
  state: () => ({
    isShow: true,
    Suggestion: "",
    chatArr: [],
    messageArr: [],
    chatId: 0,
  }),
  actions: {
    setIsShow(value) {
      this.isShow = value;
    },
    setSuggestion(value) {
      this.Suggestion = value;
    },
    addChatArr() {
      this.chatId++;
      // 清空 messageArr
      this.messageArr = [];
    },
    addMessageArr(value) {
      this.messageArr.push(value);
      this.chatArr[this.chatId] = this.messageArr;
    },
    chooseChat(value) {
      this.messageArr = this.chatArr[value];
    },
  },
});
