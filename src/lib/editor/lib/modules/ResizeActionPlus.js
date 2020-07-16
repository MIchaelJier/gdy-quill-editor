import { ResizeAction } from 'quill-blot-formatter'

function touchHandler(event) {
  const touches = event.changedTouches
  const first = touches[0]
  let type = ''
  switch (event.type) {
    case 'touchstart':
      type = 'mousedown'
      break
    case 'touchmove':
      type = 'mousemove'
      break
    case 'touchend':
      type = 'mouseup'
      break
    default:
      return
  }

  const simulatedEvent = document.createEvent('MouseEvent')
  simulatedEvent.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    first.screenX,
    first.screenY,
    first.clientX,
    first.clientY,
    false,
    false,
    false,
    false,
    0 /* left */,
    null
  )

  first.target.dispatchEvent(simulatedEvent)
  event.preventDefault()
}
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
