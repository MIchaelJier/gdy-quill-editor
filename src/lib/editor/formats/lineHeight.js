import Quill from 'quill'
const Parchment = Quill.import('parchment')

const lineHeightList = ['0-5', '0-75', '1', '1-5', '1-75', '2']

// api 改动了 Attributor.class => ClassAttributor
class LineHeightAttributor extends Parchment.ClassAttributor {}
const lineHeight = new LineHeightAttributor('lineHeight', 'ql-lineHeight', {
  scope: Parchment.Scope.INLINE,
  whitelist: lineHeightList,
})

export default lineHeight
