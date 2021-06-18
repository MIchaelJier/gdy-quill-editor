/* eslint-disable no-undef */
import _Quill from 'quill'
import yunEditor from './editor.vue'
import Dplayer from 'dplayer'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const Quill = window.Quill || _Quill
const install = (Vue, globalOptions) => {
  if (globalOptions) {
    yunEditor.props.globalOptions.default = () => globalOptions
  }
  Vue.component(yunEditor.name, yunEditor)
}

const gdyEditor = yunEditor
window.Hls = require('hls.js')

export default { Quill, gdyEditor, install, Dplayer }
