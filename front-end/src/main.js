import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'

import './lib/element-ui'
import { ls, ss } from './utils/storage'
import './assets/styles/reset.css'
import './assets/styles/border.css'

Vue.prototype.ls = ls;
Vue.prototype.ss = ss;

Vue.config.productionTip = false;
// console.log('NODE_ENV：', process.env.NODE_ENV,'VUE_APP_URL：', process.env.VUE_APP_URL);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
