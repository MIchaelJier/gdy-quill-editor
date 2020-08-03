import Quill from 'quill'

import GrammarlyInline from './GrammarlyInline'
import lineHeight from './lineHeight'
import myVideo from './myVideo'
import myLink from './myLink'
import EmojiBlot from './format-emoji-blot'
import './fontSize'

// Quill.register(Shortcode)
Quill.register(myVideo)
Quill.register(myLink)
Quill.register(GrammarlyInline)
Quill.register(
  {
    'formats/lineHeight': lineHeight,
    'formats/emoji': EmojiBlot,
  },
  true
)

export default {
  GrammarlyInline,
  lineHeight,
  myVideo,
  myLink,
  EmojiBlot,
}
