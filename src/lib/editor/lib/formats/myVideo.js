import Quill from 'quill'
import Dplayer from 'dplayer'
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class myVideo extends BlockEmbed {
  static create(value) {
    const node = super.create(value)
    if (!value.id) {
      return node
    }
    node.setAttribute('controls', 'controls')
    node.setAttribute('id', value.id)
    node.setAttribute(
      'style',
      `width:${value.width || '100%'};height:${value.height || '100%'};`
    )
    const src = this.sanitize(value.url)
    node.setAttribute('src', src)
    setTimeout(() => {
      const myvideo = new Dplayer({
        container: document.getElementById(value.id),
        video: {
          url: src,
          type: value.type ? value.type : 'auto',
          ...value,
        },
        pluginOptions: {
          hls: {
            // hls config
          },
        },
      })
      myvideo.play()
    }, 500)
    return node
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static sanitize(url) {
    return Link.sanitize(url)
  }

  static value(domNode) {
    return domNode.getAttribute('src')
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }

  html() {
    const { video } = this.value()
    return `<a href="${video}">${video}</a>`
  }
}
myVideo.blotName = 'my-video'
myVideo.className = 'ql-video'
myVideo.tagName = 'DIV'

export default myVideo
