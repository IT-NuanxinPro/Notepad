import "ant-design-vue/dist/antd.css";
import "@ant-design/icons-vue"
import "@/css/style.css";
import {createApp} from "vue";
import Ant  from "ant-design-vue";
import App from "./component/App.js";

createApp(App).use(Ant).mount("#app");

// 开启热替换
if(import.meta.webpackHot){
	import.meta.webpackHot.accept();
}