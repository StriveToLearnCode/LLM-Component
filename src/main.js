import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "./style.scss";
import "animate.css";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);

app.mount("#app");
