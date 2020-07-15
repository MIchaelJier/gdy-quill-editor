import tableRow from '../assets/icons/tableRow.svg'
import tableColumn from '../assets/icons/tableColumn.svg'
import tableRowD from '../assets/icons/tableRow-d.svg'
import tableColumnD from '../assets/icons/tableColumn-d.svg'
import historyBack from '../assets/icons/historyBack.svg'
import historyRedo from '../assets/icons/historyRedo.svg'

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
  const shortcode = this.$el.querySelector('.ql-shortcode')
  const grammarlyInline = this.$el.querySelector('.ql-grammarly-inline')

  button(shortcode, { width: 80, name: '自定义命令' })
  button(grammarlyInline, { width: 100, name: '插入分割线' })

  this.$el.querySelector('.ql-table-insert-row').innerHTML = tableRow
  this.$el.querySelector('.ql-table-insert-column').innerHTML = tableColumn
  this.$el.querySelector('.ql-table-delete-row').innerHTML = tableRowD
  this.$el.querySelector('.ql-table-delete-column').innerHTML = tableColumnD
  this.$el.querySelector('.ql-history-back').innerHTML = historyBack
  this.$el.querySelector('.ql-history-redo').innerHTML = historyRedo
}

export default initButton
