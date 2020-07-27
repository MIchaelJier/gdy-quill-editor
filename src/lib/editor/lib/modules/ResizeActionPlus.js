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
    return box
  }
  onDrag = (MouseEvent) => {
    if (!this.formatter.currentSpec) {
      return
    }

    const target = this.formatter.currentSpec.getTargetElement()
    if (!target) {
      return
    }

    const deltaX = event.clientX - this.dragStartX
    let newWidth = 0

    if (
      this.dragHandle === this.topLeftHandle ||
      this.dragHandle === this.bottomLeftHandle
    ) {
      newWidth = Math.round(this.preDragWidth - deltaX)
    } else {
      newWidth = Math.round(this.preDragWidth + deltaX)
    }

    const newHeight = this.targetRatio * newWidth

    target.setAttribute('width', `${newWidth}`)
    target.setAttribute('height', `${newHeight}`)
    target.setAttribute(
      'style',
      `${target
        .getAttribute('style')
        .replace(
          /(\width:.*?\;)|(\height:.*?\;)/g,
          ''
        )};width:${newWidth}px;height:${newHeight}px`
    )
    this.formatter.update()
  }
}

export default ResizeActionPlus
