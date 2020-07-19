import Quill from 'quill'
// 第三方modules
import BlotFormatter from 'quill-blot-formatter'
Quill.register('modules/blotFormatter', BlotFormatter)

// import '@nutrify/quill-emoji-mart-picker/esm5/quill-emoji-mart-picker'

// import ImageResize from './imageResize/imageResize.js'
// Quill.register('modules/imageResize', ImageResize)

import '../../../quill-emoji/src/quill-emoji'
