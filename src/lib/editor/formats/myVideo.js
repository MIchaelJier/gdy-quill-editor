import Quill from 'quill'
import Dplayer from 'dplayer'
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class myVideo extends BlockEmbed {
  static create(value) {
    const node = super.create(value)
    node.setAttribute('controls', 'controls')
    // m3u8
    // node.setAttribute('type', 'video/mp4')
    node.setAttribute('id', 'myVideo')
    // node.setAttribute('width', '100px')
    // node.setAttribute('height', '100px')
    const src = this.sanitize(value)
    node.setAttribute('src', this.sanitize(value))
    setTimeout(() => {
      const myvideo = new Dplayer({
        container: document.getElementById('myVideo'),
        video: {
          url: src,
          type: 'auto',
          pic: '',
          title: '111',
        },
        pluginOptions: {
          hls: {
            // hls config
          },
        },
      })
      console.log(myvideo)
      myvideo.play()
    }, 1000)
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
