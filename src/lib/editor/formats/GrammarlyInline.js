import Quill from 'quill'

const Inline = Quill.import('blots/inline')

class GrammarlyInline extends Inline {}
GrammarlyInline.tagName = 'G'
GrammarlyInline.blotName = 'grammarly-inline'
GrammarlyInline.className = 'gr_'

export default GrammarlyInline
