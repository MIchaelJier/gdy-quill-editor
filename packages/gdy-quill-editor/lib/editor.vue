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
    <div class="preview" style="color: #666;" v-if="isShowCode">
      {{ value === '' ? 'preview' : value }}
    </div>
  </div>
</template>

<script>
import _Quill from 'quill'
import { addQuillTitle } from './utils/quill-title'
import { initButton, changePaste } from './config/initButton'
import * as tools from './config/toolbar'
import { handlers } from './config/handlers'
import {
  AlignAction,
  DeleteAction,
  ImageSpec,
  IframeVideoSpec,
} from 'quill-blot-formatter'
import DplayerSpec from './modules/VideoSpec'
import ResizeActionPlus from './modules/ResizeActionPlus'

import './formats'
import './modules'
import './utils/poyfill'

class CustomImageSpec extends ImageSpec {
  getActions = () => {
    return [AlignAction, DeleteAction, ResizeActionPlus]
  }
}
class CustomVideoSpec extends DplayerSpec {
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
      specs: [CustomImageSpec, IframeVideoSpec, CustomVideoSpec],
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
    isShowCode: {
      type: Boolean,
      default: false,
    },
    isShowTips: {
      type: Boolean,
      default: true,
    },
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
    toolbarOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  mounted() {
    this.init()
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
      this.init(false)
      // this.$refs.editor.children[0].innerHTML = dataContent
      this.quill.clipboard.dangerouslyPasteHTML(dataContent)
    },
    // 初始化
    init(flag = true) {
      this.initialize(flag)
      this.isShowTips && addQuillTitle()
      defaultOptions.$el = this.$el
      defaultOptions.initButton()
      delete defaultOptions.$el
      this.addHandlers()
    },
    initialize(first = true) {
      if (this.$el) {
        this.dataOptions = Object.assign(
          {},
          this.defaultOptions,
          this.globalOptions,
          this.options
        )
        if (Object.keys(this.toolbarOptions).length > 0) {
          this.dataOptions.modules.toolbar = this.toolbarOptions
        }
        this.quill = new Quill(this.$refs.editor, this.dataOptions)
        this.quill.enable(false)

        if ((this.value || this.content) && first) {
          this.$nextTick(() => {
            this.$refs.editor.children[0].innerHTML = `${
              this.value || this.content
            }`
          })

          // const clipboard = this.quill.getModule('clipboard')
          // const pastedDelta = clipboard.convert({
          //   html: this.value || this.content,
          //   text: '',
          // })
          // const delta = new Delta().retain(0).delete(0).concat(pastedDelta)
          // this.quill.updateContents(delta, Quill.sources.USER)
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
    // 增加 toolbar事件
    addHandlers() {
      const bar = this.quill.getModule('toolbar')
      bar.addHandler('dangerously-paste', () => {
        this.$refs.editor.removeEventListener(
          'paste',
          bar.handlers.selectionPaste,
          true
        )
        // 禁用 quill 剪切板功能
        if (this.quill.clipboard.matchers.length > 14) {
          changePaste.call(this, false)
          this.quill.clipboard.matchers.length = 14
        } else {
          changePaste.call(this, true)
          this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
            delta.ops = delta.ops.map((op) => {
              return {
                insert: '',
              }
            })
            return delta
          })
          // 监听浏览器 黏贴事件
          this.$refs.editor.addEventListener(
            'paste',
            bar.handlers.selectionPaste,
            true
          )
        }
      })
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
          this.quill.clipboard.dangerouslyPasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    value(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.dataContent) {
          this.dataContent = newVal
          this.quill.clipboard.dangerouslyPasteHTML(newVal)
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
