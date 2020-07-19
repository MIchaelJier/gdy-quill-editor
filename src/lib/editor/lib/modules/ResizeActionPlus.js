import { ResizeAction } from 'quill-blot-formatter'
import touchHandler from '../utils/touch2mouse'

class ResizeActionPlus extends ResizeAction {
  constructor(formatter) {
    super(formatter)
    this.formatter = formatter
  }
  createHandle(position, cursor) {
    const box = document.createElement('div')
    box.classList.add(this.formatter.options.resize.handleClassName)
    box.setAttribute('data-position', position)
    box.style.cursor = cursor

    if (this.formatter.options.resize.handleStyle) {
      Object.assign(box.style, this.formatter.options.resize.handleStyle)
    }
    box.addEventListener('mousedown', this.onMouseDown)
    box.addEventListener('touchstart', touchHandler, true)
    box.addEventListener('touchmove', touchHandler, true)
    box.addEventListener('touchend', touchHandler, true)
    box.addEventListener('touchcancel', touchHandler, true)
    // box.addEventListener('touchstart', (e) => {
    //   this.onMouseDown(e)
    //   // document.addEventListener(
    //   //   'touchend',
    //   //   this.onMouseUp && console.log(this.onMouseUp)
    //   // )
    //   document.addEventListener('touchmove', this.onDragPlus)
    // })
    return box
  }
}

export default ResizeActionPlus
