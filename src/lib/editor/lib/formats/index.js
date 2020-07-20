import Quill from 'quill'

import Shortcode from './Shortcode'
import GrammarlyInline from './GrammarlyInline'
import lineHeight from './lineHeight'
import myVideo from './myVideo'
import myLink from './myLink'
import EmojiBlot from './format-emoji-blot'

Quill.register(Shortcode)
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
  Shortcode,
  GrammarlyInline,
  lineHeight,
  myVideo,
  myLink,
  EmojiBlot,
}
