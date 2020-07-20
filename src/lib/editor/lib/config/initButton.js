import tableRow from '../assets/icons/tableRow.svg'
import tableColumn from '../assets/icons/tableColumn.svg'
import tableRowD from '../assets/icons/tableRow-d.svg'
import tableColumnD from '../assets/icons/tableColumn-d.svg'
import historyBack from '../assets/icons/historyBack.svg'
import historyRedo from '../assets/icons/historyRedo.svg'
import grammarlyInline from '../assets/icons/grammarlyInline.svg'
import { Reflect } from 'core-js'

const button = (elem, options) => {
  if (elem.style && options.width && options.name) {
    elem.style.cssText = `width:${options.width}px; border:1px solid #ccc; border-radius:5px;`
    elem.innerText = options.name
  }
}

function initButton() {
  if (!this.$el) {
    return
  }
  const querySelectorArr = [
    { title: 'ql-shortcode', inner: { width: 80, name: '自定义命令' } },
    { title: 'ql-table-insert-row', inner: tableRow },
    { title: 'ql-table-insert-column', inner: tableColumn },
    { title: 'ql-table-delete-row', inner: tableRowD },
    { title: 'ql-table-delete-column', inner: tableColumnD },
    { title: 'ql-history-back', inner: historyBack },
    { title: 'ql-history-redo', inner: historyRedo },
    { title: 'ql-grammarly-inline', inner: grammarlyInline },
  ]
  querySelectorArr.forEach((item) => {
    const elem = this.$el.querySelector('.' + item.title)
    if (elem) {
      if (Reflect.toString.call(item.inner) === '[object Object]') {
        button(elem, {
          width: 80,
          name: '自定义命令',
        })
      } else {
        elem.innerHTML = item.inner
      }
    }
  })
}

export default initButton
