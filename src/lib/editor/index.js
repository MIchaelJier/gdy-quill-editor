import _Quill from 'quill'
import yunEditor from './editor.vue'
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

const gdyEditor = { Quill, yunEditor, install }

export default gdyEditor
export { Quill, yunEditor, install }
