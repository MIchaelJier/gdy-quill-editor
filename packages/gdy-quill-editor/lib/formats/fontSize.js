import Quill from 'quill'
const fontSizeStyle = Quill.import('attributors/style/size')
const fontSizeClass = Quill.import('attributors/class/size')
const whitelist = [
  '10px',
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '36px',
  false,
]
fontSizeStyle.whitelist = whitelist
fontSizeClass.whitelist = whitelist
export default whitelist
