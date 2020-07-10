import Quill from 'quill'
const Parchment = Quill.import('parchment')
const pixelLevels = ['small', 'large', 'huge']
console.log(Parchment.Attributor)
class LineHeightAttributor extends Parchment.Attributor {}
const lineHeightStyle = new LineHeightAttributor(
  'lineHeight',
  'ql-lineHeight',
  {
    scope: Parchment.Scope.INLINE,
    whitelist: pixelLevels,
  }
)
export default lineHeightStyle
