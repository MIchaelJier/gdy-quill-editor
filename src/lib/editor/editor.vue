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
    <button id="insert-table">insert-table</button>
  </div>
</template>

<script>
import _Quill from 'quill'
import { addQuillTitle } from './utils/quill-title'
import initButton from './utils/initButton'
import * as tools from './config/toolbar'
import './formats'
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
    table: true,
    toolbar: {
      container: [
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
        [{ lineHeight: ['small', 'large', 'huge'] }],
        [
          { table: 'TD' },
          { 'table-insert-row': 'TIR' },
          { 'table-insert-column': 'TIC' },
          { 'table-delete-row': 'TDR' },
          { 'table-delete-column': 'TDC' },
        ],
      ],
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
