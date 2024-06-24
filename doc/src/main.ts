import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import DevUI from "vue-devui";
import "vue-devui/style.css";
import "@devui-design/icons/icomoon/devui-icon.css";
import { ThemeServiceInit, infinityTheme, galaxyTheme } from "devui-theme";
import router from "./router/router";

window.codeOutputList = []
console.originalLog = console.log;
console.log = (content: any) => {
  console.originalLog(content);
  window.codeOutputList.push(content)
};

console.originalDir = console.dir;
console.dir = (content: any) => {
  console.originalDir(content)
  window.codeOutputList.push(content)
}

// so amazing, it doesn't trigger the overwrite
console.originalError = console.error
console.error = (content: any) => {
  console.originalError(content)
  window.codeOutputList = []
}

ThemeServiceInit({ infinityTheme }, "infinityTheme")?.applyTheme(galaxyTheme);

createApp(App).use(DevUI).use(router).mount("#app");