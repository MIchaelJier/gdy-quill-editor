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

export { fontType, fontColor, fontShape }
