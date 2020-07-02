import Vue from 'vue'
import App from './App.vue'

import vEditor from './lib/editor'
Vue.use(vEditor)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
