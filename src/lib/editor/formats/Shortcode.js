import Quill from 'quill'

const InlineEmbed = Quill.import('blots/embed')

class Shortcode extends InlineEmbed {
  static create(value) {
    const node = super.create(value)
    node.setAttribute('class', 'ql-shortcode')
    // node.setAttribute('style', value)
    node.innerHTML = value

    return node
  }
}
Shortcode.blotName = 'shortcode'
Shortcode.tagName = 'span'

export default Shortcode
