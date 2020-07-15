import Quill from 'quill'
const Link = Quill.import('formats/link')

class myLink extends Link {
  static create(value) {
    let node
    if (value && !value.href) {
      node = super.create(value)
    } else {
      node = super.create(value.href)
      node.innerText = value.innerText
      node.href = value.href
      node.id = value.id
      node.setAttribute('title', value.innerText)
      node.setAttribute('data-value', value.dataValue)
    }
    return node
  }
}
myLink.blotName = 'my-link'
myLink.tagName = 'A'

export default myLink
