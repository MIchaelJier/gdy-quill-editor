<template>
  <div class="quill-editor">
    <!-- <slot name="toolbar"></slot> -->
    <div id="toolbar">
      <div class="ql-bold"></div>
    </div>
    <div ref="editor"></div>
    <div class="preview" style="color: #666;">
      {{ value === '' ? 'preview' : value }}
    </div>
  </div>
</template>

<script>
import _Quill from 'quill'
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
    ],
  },
  placeholder: '请输入你的内容',
  readOnly: false,
}

if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target, varArgs, ...rest) {
      const arg = [target, varArgs, ...rest]
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arg.length; index++) {
        const nextSource = arg[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true,
  })
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
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  methods: {
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
