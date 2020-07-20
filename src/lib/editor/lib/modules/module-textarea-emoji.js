import Quill from 'quill'
import Fuse from 'fuse.js'
import emojiList from '../config/emoji-list.js'

const Delta = Quill.import('delta')
const Module = Quill.import('core/module')

class TextAreaEmoji extends Module {
  constructor(quill, options) {
    super(quill, options)

    this.quill = quill
    this.container = document.createElement('div')
    this.container.classList.add('textarea-emoji-control')
    this.container.style.position = 'absolute'
    this.container.innerHTML = options.buttonIcon
    this.quill.container.appendChild(this.container)
    this.container.addEventListener(
      'click',
      this.checkEmojiBoxExist.bind(this),
      false
    )
  }

  checkEmojiBoxExist() {
    const elementExists = document.getElementById('textarea-emoji')
    if (elementExists) {
      elementExists.remove()
    } else {
      const ele_emoji_area = document.createElement('div')
      ele_emoji_area.id = 'textarea-emoji'
      this.quill.container.appendChild(ele_emoji_area)
      const tabToolbar = document.createElement('div')
      tabToolbar.id = 'tab-toolbar'
      ele_emoji_area.appendChild(tabToolbar)

      const emojiType = [
        { type: 'p', name: 'people', content: '<div class="i-people"></div>' },
        { type: 'n', name: 'nature', content: '<div class="i-nature"></div>' },
        { type: 'd', name: 'food', content: '<div class="i-food"></div>' },
        {
          type: 's',
          name: 'symbols',
          content: '<div class="i-symbols"></div>',
        },
        {
          type: 'a',
          name: 'activity',
          content: '<div class="i-activity"></div>',
        },
        { type: 't', name: 'travel', content: '<div class="i-travel"></div>' },
        {
          type: 'o',
          name: 'objects',
          content: '<div class="i-objects"></div>',
        },
        { type: 'f', name: 'flags', content: '<div class="i-flags"></div>' },
      ]

      const tabElementHolder = document.createElement('ul')
      tabToolbar.appendChild(tabElementHolder)

      if (document.getElementById('emoji-close-div') === null) {
        const closeDiv = document.createElement('div')
        closeDiv.id = 'emoji-close-div'
        closeDiv.addEventListener('click', fn_close, false)
        document.getElementsByTagName('body')[0].appendChild(closeDiv)
      } else {
        document.getElementById('emoji-close-div').style.display = 'block'
      }
      const panel = document.createElement('div')
      panel.id = 'tab-panel'
      ele_emoji_area.appendChild(panel)
      const innerQuill = this.quill
      emojiType.map(function (emojiType) {
        const tabElement = document.createElement('li')
        tabElement.classList.add('emoji-tab')
        tabElement.classList.add('filter-' + emojiType.name)
        const tabValue = emojiType.content
        tabElement.innerHTML = tabValue
        tabElement.dataset.filter = emojiType.type
        tabElementHolder.appendChild(tabElement)
        const emojiFilter = document.querySelector('.filter-' + emojiType.name)
        emojiFilter.addEventListener('click', function () {
          const emojiContainer = document.getElementById('textarea-emoji')
          const tab = emojiContainer && emojiContainer.querySelector('.active')

          if (tab) {
            tab.classList.remove('active')
          }

          emojiFilter.classList.toggle('active')

          while (panel.firstChild) {
            panel.removeChild(panel.firstChild)
          }

          const type = emojiFilter.dataset.filter
          fn_emojiElementsToPanel(type, panel, innerQuill)
        })
      })

      const windowHeight = window.innerHeight
      const editorPos = this.quill.container.getBoundingClientRect().top
      if (editorPos > windowHeight / 2) {
        ele_emoji_area.style.top = '-250px'
      }
      fn_emojiPanelInit(panel, this.quill)
    }
  }
}

TextAreaEmoji.DEFAULTS = {
  buttonIcon:
    '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>',
}

function fn_close() {
  const ele_emoji_plate = document.getElementById('textarea-emoji')
  document.getElementById('emoji-close-div').style.display = 'none'
  if (ele_emoji_plate) {
    ele_emoji_plate.remove()
  }
}

function fn_updateRange(quill) {
  const range = quill.getSelection()
  return range
}

function fn_emojiPanelInit(panel, quill) {
  fn_emojiElementsToPanel('p', panel, quill)
  document.querySelector('.filter-people').classList.add('active')
}

function fn_emojiElementsToPanel(type, panel, quill) {
  const fuseOptions = {
    shouldSort: true,
    matchAllTokens: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: ['category'],
  }
  const fuse = new Fuse(emojiList, fuseOptions)
  const result = fuse.search(type)
  result.sort(function (a, b) {
    return a.emoji_order - b.emoji_order
  })

  quill.focus()
  const range = fn_updateRange(quill)

  result.map(function (emoji) {
    const span = document.createElement('span')
    const t = document.createTextNode(emoji.shortname)
    span.appendChild(t)
    span.classList.add('bem')
    span.classList.add('bem-' + emoji.item.name)
    span.classList.add('ap')
    span.classList.add('ap-' + emoji.item.name)
    const output = '' + emoji.item.code_decimal + ''
    span.innerHTML = output + ' '
    panel.appendChild(span)

    const customButton = document.querySelector('.bem-' + emoji.item.name)
    if (customButton) {
      customButton.addEventListener('click', function () {
        // quill.insertText(range.index, customButton.innerHTML);
        // quill.setSelection(range.index + customButton.innerHTML.length, 0);
        // range.index = range.index + customButton.innerHTML.length;
        quill.insertEmbed(range.index, 'emoji', emoji, Quill.sources.USER)
        setTimeout(() => quill.setSelection(range.index + 1), 0)
        fn_close()
      })
    }
  })
}

export default TextAreaEmoji
