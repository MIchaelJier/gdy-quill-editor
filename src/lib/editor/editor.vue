<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <!-- slot example -->
    <!-- <div id="toolbar">
      <select class="ql-size">
        <option value="small">small</option>
        <option value="large">large</option>
        <option value="huge">huge</option>
      </select>
      <button class="ql-bold">bold</button>
      <button class="ql-script" value="sub">sub</button>
      <button class="ql-script" value="super">super</button>
    </div>-->
    <div ref="editor"></div>
    <div class="preview" style="color: #666;">
      {{ value === '' ? 'preview' : value }}
    </div>
    <button @click="change('fontType')">fontType</button>
    <button @click="change('fontColor')">fontColor</button>
    <button @click="change('fontShape')">fontShape</button>
  </div>
</template>

<script>
import _Quill from 'quill'
import { addQuillTitle } from './utils/quill-title'
import initButton from './utils/initButton'
import * as tools from './config/toolbar'
import './formats'
import './utils/poyfill'

const Quill = window.Quill || _Quill
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
      ['grammarly-inline'],
      ['shortcode'],
    ],
  },
  initButton,
  placeholder: '请输入你的内容',
  readOnly: false,
}

export default {
  name: 'gdy-editor',
  data() {
    return {
      dataOptions: {},
      dataContent: '',
      defaultOptions,
    }
  },
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  mounted() {
    this.initialize()
    addQuillTitle()
    defaultOptions.initButton()
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  methods: {
    change(type) {
      const toolbar = document.getElementsByClassName('ql-toolbar')[0]
      if (toolbar != null) toolbar.parentNode.removeChild(toolbar)
      this.defaultOptions.modules.toolbar = tools[type]
      this.initialize()
    },
    // 初始化
    initialize() {
      if (this.$el) {
        this.dataOptions = Object.assign(
          {},
          this.defaultOptions,
          this.globalOptions,
          this.options
        )
        this.quill = new Quill(this.$refs.editor, this.dataOptions)

        this.quill.enable(false)
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content)
        }
        if (!this.disabled) {
          this.quill.enable(true)
        }
        this.quill.on('selection-change', (range) => {
          if (!range) {
            this.$emit('blur', this.quill)
          } else {
            this.$emit('focus', this.quill)
          }
        })
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.editor.children[0].innerHTML
          const quill = this.quill
          const text = this.quill.getText()
          if (html === '<p><br></p>') html = ''
          this.dataContent = html
          this.$emit('input', this.dataContent)
          this.$emit('change', { html, text, quill })
        })
        this.$emit('ready', this.quill)
      }
    },
  },
  watch: {
    content(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.dataContent) {
          this.dataContent = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    value(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.dataContent) {
          this.dataContent = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    disabled(newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal)
      }
    },
  },
}
</script>

<style scoped>
.quill-editor {
}
.preview {
  border: 1px solid #ccc;
  border-top: none;
  min-height: 100px;
  text-align: left;
  padding: 12px 15px;
  font-style: italic;
}
</style>
