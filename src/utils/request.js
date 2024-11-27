import axios from "axios";

const token = `sk-cwaywqlygtnafnhsgfndicsqryarbcojsvgfjjssqtmjsdwe`;
const request = axios.create({
  baseURL: "https://api.siliconflow.cn/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
