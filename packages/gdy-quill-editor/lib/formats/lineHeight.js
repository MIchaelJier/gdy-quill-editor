import Quill from 'quill'
const Parchment = Quill.import('parchment')

const lineHeightList = ['0p5', '0p75', '1', '1p5', '1p75', '2']

// api 改动了 Attributor.class => ClassAttributor
class LineHeightAttributor extends Parchment.ClassAttributor {}
const lineHeight = new LineHeightAttributor('lineHeight', 'ql-lineHeight', {
  scope: Parchment.Scope.INLINE,
  whitelist: lineHeightList,
})

export default lineHeight
