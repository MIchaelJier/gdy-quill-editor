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
import './modules'
import './utils/poyfill'
import './assets/styles/cn.css'
const Quill = window.Quill || _Quill
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  initButton,
  placeholder: '请输入你的内容',
  readOnly: false,
  modules: {
    imageResize: {
      displaySize: true,
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
      handlers: {
        table: function (val) {
          this.quill.getModule('table').insertTable(2, 3)
        },
        'table-insert-row': function () {
          this.quill.getModule('table').insertRowBelow()
        },
        'table-insert-column': function () {
          this.quill.getModule('table').insertColumnRight()
        },
        'table-delete-row': function () {
          this.quill.getModule('table').deleteRow()
        },
        'table-delete-column': function () {
          this.quill.getModule('table').deleteColumn()
        },
        lineHeight: function (e) {
          // 添加工具方法
          const Range = this.quill.getSelection()
          this.quill.formatText(Range.index, Range.length, 'lineHeight', e)
        },
        'history-back': function () {
          this.quill.history.undo()
        },
        'history-redo': function () {
          this.quill.history.redo()
        },
        'grammarly-inline': function () {
          const length = this.quill.selection.savedRange.index
          this.quill.insertEmbed(length, 'grammarly-inline', '1')
        },
      },
    },
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
    defaultOptions.initButton()
    this.$el.querySelector(
      '.ql-table-insert-row'
    ).innerHTML = `<svg t="1591862376726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="200"><path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="6307"></path></svg>`
    this.$el.querySelector(
      '.ql-table-insert-column'
    ).innerHTML = `<svg t="1591862238963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="18" height="200"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6510"></path></svg>`
    this.$el.querySelector(
      '.ql-table-delete-row'
    ).innerHTML = `<svg t="1591862253524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6632" width="18" height="200"><path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="6633"></path></svg>`
    this.$el.querySelector(
      '.ql-table-delete-column'
    ).innerHTML = `<svg t="1591862261059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6755" width="18" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6756"></path></svg>`
    this.$el.querySelector(
      '.ql-history-back'
    ).innerHTML = `<svg t="1594620944787" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1989" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M880.2 356.8c21.1 49.3 31.8 101 31.8 155.2 0 54.1-10.7 105.9-31.8 155.2-21.1 49.3-49.6 91.8-85.5 127.6s-78.3 64.2-127.6 85.5C617.9 901.3 566.2 912 512 912c-59.7 0-116.4-12.6-170.3-37.8-53.8-25.2-99.7-60.6-137.5-106.5-2.4-3.5-3.6-7.3-3.4-11.8 0.2-4.4 1.6-7.8 4.4-10.7l71.3-71.9c3.5-3.2 7.7-4.7 13.1-4.7 5.6 0.7 9.6 2.7 12 6.2 25.3 33 56.4 58.5 93.2 76.5s75.9 27 117.2 27c36.1 0 70.5-7 103.4-21.1 32.9-14 61.2-33.1 85.1-57.1 24-24 42.9-52.4 57.1-85.1 14-32.9 21.1-67.3 21.1-103.4s-7-70.5-21.1-103.4c-14.2-32.9-33.1-61.2-57.1-85.1-24-24-52.4-42.9-85.1-57.1-32.9-14-67.3-21.1-103.4-21.1-34.1 0-66.7 6.1-97.9 18.5-31.2 12.4-59 29.9-83.4 52.9l71.3 71.9c10.8 10.4 13.2 22.3 7.3 35.9-5.9 13.9-16.1 20.8-30.8 20.8H145.3c-8.9 0-16.9-3.3-23.4-9.9s-9.9-14.4-9.9-23.4v-233c0-14.6 6.9-24.8 20.8-30.8 13.6-5.9 25.5-3.5 35.9 7.3l67.7 67.2c37.1-35.1 79.6-62.2 127.4-81.4 47.8-19.3 97.1-29 148.2-29 54.1 0 105.9 10.7 155.2 31.8s91.8 49.6 127.6 85.5c35.8 35.7 64.2 78.2 85.4 127.6z" p-id="1990"></path></svg>`
    this.$el.querySelector(
      '.ql-history-redo'
    ).innerHTML = `<svg t="1594621323426" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6383" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M508.98432 374.72256c-112.78336 10.04544-220.544 79.5648-220.544 193.11616 0 122.8288 98.49344 222.08512 220.544 222.08512s220.54912-99.26144 220.54912-222.08512h165.70368c0 214.74816-173.04064 388.5568-386.2528 388.5568s-386.24768-173.80864-386.24768-388.5568c0-205.47584 183.47008-347.60704 386.2528-359.5776V68.04992l275.77856 222.08512v27.80672L508.9792 512.22528V374.72256z" fill="#272636" p-id="6384"></path></svg>`
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
}
</style>
