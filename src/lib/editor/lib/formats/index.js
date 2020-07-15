import Quill from 'quill'

import Shortcode from './Shortcode'
import GrammarlyInline from './GrammarlyInline'
import lineHeight from './lineHeight'
import myVideo from './myVideo'
import myLink from './myLink'

Quill.register(Shortcode)
Quill.register(myVideo)
Quill.register(myLink)
Quill.register(GrammarlyInline)
Quill.register({ 'formats/lineHeight': lineHeight }, true)
