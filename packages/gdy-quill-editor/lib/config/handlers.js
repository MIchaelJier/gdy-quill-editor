export const handlers = {
  // 添加工具方法
  table: function (val) {
    this.quill.getModule('table').insertTable(2, 3)
  },
  'table-insert-row': function () {
    this.quill.getModule('table').insertRowBelow()
  },
  'table-insert-column': function () {
    this.quill.getModule('table').insertColumnRight()
  },
  'table-delete-row': function () {
    this.quill.getModule('table').deleteRow()
  },
  'table-delete-column': function () {
    this.quill.getModule('table').deleteColumn()
  },
  lineHeight: function (e) {
    const Range = this.quill.getSelection()
    this.quill.formatText(Range.index, Range.length, 'lineHeight', e)
  },
  'history-back': function () {
    this.quill.history.undo()
  },
  'history-redo': function () {
    this.quill.history.redo()
  },
  'grammarly-inline': function () {
    const length = this.quill.selection.savedRange.index
    this.quill.insertEmbed(length, 'grammarly-inline', '1')
  },
  selectionPaste: function (evt) {
    const clipdata = evt.clipboardData || window.clipboardData
    const html = clipdata.getData('text/html')
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    range.setStart(range.endContainer, range.endOffset)
    const pasteElement = document.createElement('p')
    pasteElement.innerHTML = html
    range.insertNode(pasteElement)
    // appendHtml(document.getElementsByClassName('ql-editor')[0], html)
  },
  'dangerously-paste': function () {
    // TODO  addHandler at editor.vue
  },
}
