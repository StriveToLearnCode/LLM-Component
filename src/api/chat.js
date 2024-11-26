import requset from "@/utils/request";
// 创建文本对话请求
// '{"model":"deepseek-ai/DeepSeek-V2.5","messages":[{"role":"user","content":"SiliconCloud推出分层速率方案与免费模型RPM提升10倍，对于整个大模型应用领域带来哪些改变？"}],"stream":false,"max_tokens":512,"stop":"","temperature":0.7,"top_p":0.7,"top_k":50,"frequency_penalty":0.5,"n":1,"response_format":{"type":"text"},"tools":[{"type":"function","function":{"description":"<string>","name":"<string>","parameters":{},"strict":true}}]}'
export const quickChat = async (content) => {
  return requset({
    url: "/chat/completions",
    method: "post",
    data: {
      model: "deepseek-ai/DeepSeek-V2.5",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    },
  });
};
