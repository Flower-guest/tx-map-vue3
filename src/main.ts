import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import pinia from "./store";
import pluginMain from "./plugins";
import "uno.css";
import "normalize.css/normalize.css";
import "./assets/styles/index.scss";
import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App);

pluginMain(app);

app.use(route).use(pinia).mount("#app");
