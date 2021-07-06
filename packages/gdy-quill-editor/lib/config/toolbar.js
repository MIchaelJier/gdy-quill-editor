import whitelist from '../formats/fontSize'
const fontType = [
  ['bold'],
  ['italic'],
  ['underline'],
  ['strike'],
  [{ script: 'sub' }, { script: 'super' }],
]

const fontColor = [[{ color: [] }, { background: [] }]]
const fontShape = [
  [{ size: whitelist }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ lineHeight: ['0p5', '0p75', '1', '1p5', '1p75', '2'] }],
]
const other = [
  ['history-back', 'history-redo'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { direction: 'rtl' }],
  ['link', 'image', 'video'],
  ['grammarly-inline'],
  ['emoji'],
  ['clean'],
]

const alltype = [
  ['history-back', 'history-redo'],
  ['bold', 'strike', 'italic', 'underline', 'blockquote'],
  [
    { header: [1, 2, 3, 4, 5, 6, false] },
    { font: [] },
    { size: whitelist },
    { color: [] },
    { background: [] },
  ],
  [{ lineHeight: ['0p5', '0p75', '1', '1p5', '1p75', '2'] }],
  [{ list: 'ordered' }, { list: 'bullet' }, 'grammarly-inline', 'code-block'],
  [
    { script: 'sub' },
    { script: 'super' },
    { indent: '-1' },
    { indent: '+1' },
    { direction: 'rtl' },
    { align: [] },
  ],
  ['emoji', 'link', 'image', 'video'],
  // ['shortcode'],
  [
    { table: 'TD' },
    { 'table-insert-row': 'TIR' },
    { 'table-insert-column': 'TIC' },
    { 'table-delete-row': 'TDR' },
    { 'table-delete-column': 'TDC' },
  ],
  ['dangerously-paste', 'clean'],
]

export { fontType, fontColor, fontShape, alltype, other }
