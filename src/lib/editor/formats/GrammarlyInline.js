import Quill from 'quill'
const Cursor = Quill.import('blots/block/embed')
const all = Quill.import('blots/block')
console.log(all)

class GrammarlyInline extends Cursor {
  static create(value) {
    const node = super.create(value)
    // node.innerHTML = value
    return node
  }
}
GrammarlyInline.tagName = 'hr'
GrammarlyInline.blotName = 'grammarly-inline'

export default GrammarlyInline
