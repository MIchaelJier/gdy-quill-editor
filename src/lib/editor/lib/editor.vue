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
import initButton from './config/initButton'
import * as tools from './config/toolbar'
import { handlers } from './config/handlers'
import {
  AlignAction,
  DeleteAction,
  ImageSpec,
  IframeVideoSpec,
} from 'quill-blot-formatter'

import ResizeActionPlus from './modules/ResizeActionPlus'

import './formats'
import './modules'
import './utils/poyfill'
import './assets/styles/cn.css'

class CustomImageSpec extends ImageSpec {
  getActions = () => {
    return [AlignAction, DeleteAction, ResizeActionPlus]
  }
}

const Quill = window.Quill || _Quill
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  initButton,
  placeholder: '请输入你的内容',
  readOnly: false,
  // formats: ['emoji'],
  modules: {
    // imageResize: {
    //   displaySize: true,
    // },
    blotFormatter: {
      specs: [CustomImageSpec, IframeVideoSpec],
      // overlay: {
      //   style: {
      //     border: '2px solid red',
      //   },
      // },
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
    table: true,
    clipboard: {
      matchVisual: false,
    },
    toolbar: {
      container: tools.alltype,
      handlers: handlers,
    },
    'emoji-toolbar': true,
    'emoji-shortname': true,
    // 'emoji-module': {
    //   emojiData: emojis,
    //   customEmojiData: customEmojis,
    //   preventDrag: true,
    //   showTitle: true,
    //   indicator: '*',
    //   convertEmoticons: true,
    //   convertShortNames: true,
    //   set: () => 'apple', // 苹果图标
    // },
  },
}

export default {
  name: 'gdy-editor',
  data() {
    return {
      quill: null,
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
    defaultOptions.$el = this.$el
    defaultOptions.initButton()
    delete defaultOptions.$el
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  methods: {
    change(type) {
      const dataContent = this.dataContent
      const toolbar = document.getElementsByClassName('ql-toolbar')[0]
      if (toolbar != null) toolbar.parentNode.removeChild(toolbar)
      this.defaultOptions.modules.toolbar.container = tools[type]
      this.initialize(false)
      this.$refs.editor.children[0].innerHTML = dataContent
      // this.dataContent = dataContent
    },
    // 初始化
    initialize(first = true) {
      if (this.$el) {
        this.dataOptions = Object.assign(
          {},
          this.defaultOptions,
          this.globalOptions,
          this.options
        )
        this.quill = new Quill(this.$refs.editor, this.dataOptions)
        this.quill.enable(false)

        if ((this.value || this.content) && first) {
          // this.quill.pasteHTML(this.value || this.content)
          this.quill.dangerouslyPasteHTML(this.value || this.content)
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
    // 插入自定义视频
    addVideoLink(videoLink) {
      const range = this.quill.getSelection()
      let index = 0
      if (range == null) {
        index = 0
      } else {
        index = range.index
      }
      this.quill.insertEmbed(index, 'my-video', videoLink)
    },
    // 插入自定义link
    // link :
    // {
    //  innerText: xxxxx,
    //  dataValue: xxxxx,
    //  href: xxxxx,
    // }
    addTextLink(link) {
      const range = this.quill.getSelection()
      let index = 0
      if (range == null) {
        index = 0
      } else {
        index = range.index
      }
      this.quill.insertEmbed(index, 'my-link', link)
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
  word-break: break-all;
}
</style>
