import Vue from 'vue'
import App from './App.vue'

import gdyEditor from './lib/editor/lib'
import './lib/editor/dist/main.css'
// import gdyEditor from './lib/editor/dist/gdy-editor'
Vue.use(gdyEditor)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
