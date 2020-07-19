const fontType = [
  ['bold'],
  ['italic'],
  ['underline'],
  ['strike'],
  [{ script: 'sub' }, { script: 'super' }],
]

const fontColor = [[{ color: [] }, { background: [] }]]
const fontShape = [
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
]

const alltype = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video'],
  ['grammarly-inline'],
  ['shortcode'],
  [
    { table: 'TD' },
    { 'table-insert-row': 'TIR' },
    { 'table-insert-column': 'TIC' },
    { 'table-delete-row': 'TDR' },
    { 'table-delete-column': 'TDC' },
  ],
  [{ lineHeight: ['0-5', '0-75', '1', '1-5', '1-75', '2'] }],
  ['history-back', 'history-redo'],
  ['emoji'],
]

export { fontType, fontColor, fontShape, alltype }
