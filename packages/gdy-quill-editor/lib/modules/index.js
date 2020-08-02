import Quill from 'quill'
// 第三方modules
import BlotFormatter from 'quill-blot-formatter'

// import '@nutrify/quill-emoji-mart-picker/esm5/quill-emoji-mart-picker'

// import ImageResize from './imageResize/imageResize.js'
// Quill.register('modules/imageResize', ImageResize)

import ShortNameEmoji from './module-emoji'
import ToolbarEmoji from './module-toolbar-emoji'
import TextAreaEmoji from './module-textarea-emoji'

// css
import '../assets/styles/scss/quill-emoji.scss'
import '../assets/styles/cn.css'

// import './scss/quill-emoji.scss'

Quill.register(
  {
    // 表情
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji,
    //  editor elements to be resized
    'modules/blotFormatter': BlotFormatter,
  },
  true
)

export default { BlotFormatter, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji }
