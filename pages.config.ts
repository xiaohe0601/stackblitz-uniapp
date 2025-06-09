import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

export default defineUniPages({
  globalStyle: {
    navigationBarTitleText: "xiaohe-uniapp-lite",
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#ffffff",
    "mp-weixin": {
      handleWebviewPreload: "auto"
    }
  }
});