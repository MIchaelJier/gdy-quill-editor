import Vue from 'vue'
import App from './App.vue'

import gdyEditor from './lib/editor'
Vue.use(gdyEditor)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
