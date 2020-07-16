import UnclickableBlotSpec from 'quill-blot-formatter/dist/specs/UnclickableBlotSpec'

export default class dplayerSpec extends UnclickableBlotSpec {
  constructor(formatter) {
    super(formatter, 'div.ql-video')
  }
}
