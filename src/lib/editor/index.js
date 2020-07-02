import editor from './editor'

const myPlugin = {
  install(Vue) {
    // options
    Vue.component('vEditor', editor)
  },
}

export default myPlugin
