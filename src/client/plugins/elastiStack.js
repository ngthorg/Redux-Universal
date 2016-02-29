/**
 * elastiStack.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */


// classie

function classReg(className) {
  return new RegExp('(^|\\s+)' + className + '(\\s+|$)')
}

const hasClass = (elem, c) => {
  return classReg(c).test(elem.className)
}

const addClass = (elem, c) => {
  if (!hasClass(elem, c)) {
    elem.className = elem.className + ' ' + c
  }
}

const removeClass = (elem, c) => {
  elem.className = elem.className.replace(classReg(c), ' ')
}

const toggleClass = (elem, c) => {
  const fn = hasClass(elem, c) ? removeClass : addClass
  fn(elem, c)
}

const classie = {
  // full names
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
}

// support
const is3d = !!getStyleProperty('perspective'),
  supportTransitions = Modernizr.csstransitions,
  transEndEventNames = {
    msTransition: 'MSTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd',
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  },
  transEndEventName = transEndEventNames[Modernizr.prefixed('transition')]

function setTransformStyle(el, tval) {
  el.style.WebkitTransform = tval
  el.style.msTransform = tval
  el.style.transform = tval
}

/**
 * ElastiStack
 */
export class ElastiStack {

  constructor(el, options) {
    this.container = el
    this.options = Object.assign({}, this.options)
    Object.assign(this.options, options)
    this._init()
  }

  options = {
    distDragBack: 200,
    distDragMax: 450,
    onUpdateStack: () => false
  }

  _init() {
    // items
    this.items = [].slice.call(this.container.children)
    // total items
    this.itemsCount = this.items.length
    // current item's index (the one on the top of the stack)
    this.current = 0
    // set initial styles
    this._setStackStyle()
    // return if no items or only one
    if (this.itemsCount <= 1) return
    // add dragging capability
    this._initDragg()
    // init drag events
    this._initEvents()
  }

  _initEvents() {
    const self = this
    this.draggie.on('dragStart', (i, e, p) => { self._onDragStart(i, e, p)})
    this.draggie.on('dragMove', (i, e, p) => { self._onDragMove(i, e, p)})
    this.draggie.on('dragEnd', (i, e, p) => { self._onDragEnd(i, e, p)})
  }

  _initDragg() {
    this.draggie = new Draggabilly(this.items[this.current])
  }

  _setStackStyle() {
    const item1 = this._firstItem(), item2 = this._secondItem(), item3 = this._thirdItem()

    if (item1) {
      item1.style.opacity = 1
      item1.style.zIndex = 4
      setTransformStyle(item1, is3d ? 'translate3d(0,0,0)' : 'translate(0,0)')
    }

    if (item2) {
      item2.style.opacity = 1
      item2.style.zIndex = 3
      setTransformStyle(item2, is3d ? 'translate3d(0,0,-60px)' : 'translate(0,0)')
    }

    if (item3) {
      item3.style.opacity = 1
      item3.style.zIndex = 2
      setTransformStyle(item3, is3d ? 'translate3d(0,0,-120px)' : 'translate(0,0)')
    }
  }

  _onDragStart(instance) {
    // remove transition classes if any
    const item2 = this._secondItem(), item3 = this._thirdItem()

    classie.remove(instance.element, 'move-back')
    classie.remove(instance.element, 'animate')

    if (item2) {
      classie.remove(item2, 'move-back')
      classie.remove(item2, 'animate')
    }
    if (item3) {
      classie.remove(item3, 'move-back')
      classie.remove(item3, 'animate')
    }
  }

  _onDragMove(instance) {
    if (this._outOfBounds(instance)) {
      this._moveAway(instance)
    } else {
			// the second and third items also move
      const item2 = this._secondItem(), item3 = this._thirdItem();
      if (item2) {
        setTransformStyle(item2, is3d ? 'translate3d(' + (instance.position.x * .6) + 'px,' + (instance.position.y * .6) + 'px, -60px)' : 'translate(' + (instance.position.x * .6) + 'px,' + (instance.position.y * .6) + 'px)')
      }
      if (item3) {
      setTransformStyle(item3, is3d ? 'translate3d(' + (instance.position.x * .3) + 'px,' + (instance.position.y * .3) + 'px, -120px)' : 'translate(' + (instance.position.x * .3) + 'px,' + (instance.position.y * .3) + 'px)')
      }
    }
  }

  _onDragEnd(instance) {
    if (this._outOfBounds(instance)) return
    if (this._outOfSight(instance)) {
      this._moveAway(instance)
    } else {
      this._moveBack(instance)
    }
  }

  _disableDragg() {
    this.draggie.disable()
  }

  _outOfBounds(el) {
    return Math.abs(el.position.x) > this.options.distDragMax || Math.abs(el.position.y) > this.options.distDragMax
  }

  _outOfSight(el) {
    return Math.abs(el.position.x) > this.options.distDragBack || Math.abs(el.position.y) > this.options.distDragBack
  }

  _moveAway(instance) {
    // disable drag
    this._disableDragg()

    // add class "animate"
    classie.add(instance.element, 'animate')

    // calculate how much to translate in the x and y axis
    const tVal = this._getTranslateVal(instance)

    // apply it
    setTransformStyle(instance.element, is3d ? 'translate3d(' + tVal.x + 'px,' + tVal.y + 'px, 0px)' : 'translate(' + tVal.x + 'px,' + tVal.y + 'px)')

    // item also fades out
    instance.element.style.opacity = 0

    // other items move back to stack
    const item2 = this._secondItem(), item3 = this._thirdItem()

    if (item2) {
      classie.add(item2, 'move-back')
      classie.add(item2, 'animate')
      setTransformStyle(item2, is3d ? 'translate3d(0,0,-60px)' : 'translate(0,0)')
    }

    if (item3) {
      classie.add(item3, 'move-back')
      classie.add(item3, 'animate')
      setTransformStyle(item3, is3d ? 'translate3d(0,0,-120px)' : 'translate(0,0)')
    }

    // after transition ends..
    const self = this,
      onEndTransFn = () => {
        instance.element.removeEventListener(transEndEventName, onEndTransFn)

        // reset first item
        setTransformStyle(instance.element, is3d ? 'translate3d(0,0,-180px)' : 'translate(0,0,0)')
        instance.element.style.left = instance.element.style.top = '0px'
        instance.element.style.zIndex = -1
        classie.remove(instance.element, 'animate')

        // reorder stack
        self.current = self.current < self.itemsCount - 1 ? self.current + 1 : 0
        // new front items
        const item1 = self._firstItem(),
          item2 = self._secondItem(),
          item3 = self._thirdItem()

				// reset transition timing function
        classie.remove(item1, 'move-back')
        if (item2) classie.remove(item2, 'move-back')
        if (item3) classie.remove(item3, 'move-back')

        setTimeout(function() {
          // the upcoming one will animate..
          classie.add(self._lastItem(), 'animate')
          // reset style
          self._setStackStyle()
        }, 25)

				// add dragging capability
        self._initDragg()

				// init drag events on new current item
        self._initEvents()

				// callback
        self.options.onUpdateStack( self.current )
      }

    if (supportTransitions) {
      instance.element.addEventListener(transEndEventName, onEndTransFn)
    } else {
      onEndTransFn.call()
    }
  }

  _moveBack( instance ) {
    const item2 = this._secondItem(), item3 = this._thirdItem()

    classie.add(instance.element, 'move-back')
    classie.add(instance.element, 'animate')
    setTransformStyle(instance.element, is3d ? 'translate3d(0,0,0)' : 'translate(0,0)')
    instance.element.style.left = '0px'
    instance.element.style.top = '0px'

    if (item2) {
      classie.add(item2, 'move-back')
      classie.add(item2, 'animate')
      setTransformStyle(item2, is3d ? 'translate3d(0,0,-60px)' : 'translate(0,0)')
    }
    if (item3) {
      classie.add(item3, 'move-back')
      classie.add(item3, 'animate')
      setTransformStyle(item3, is3d ? 'translate3d(0,0,-120px)' : 'translate(0,0)')
    }
  }

  _getTranslateVal(el) {
    const h = Math.sqrt(Math.pow(el.position.x, 2) + Math.pow(el.position.y, 2)),
      a = Math.asin(Math.abs(el.position.y) / h) / (Math.PI / 180),
      hL = h + this.options.distDragBack,
      dx = Math.cos(a * (Math.PI / 180)) * hL,
      dy = Math.sin(a * (Math.PI / 180)) * hL,
      tx = dx - Math.abs(el.position.x),
      ty = dy - Math.abs(el.position.y)

    return {
      x: el.position.x > 0 ? tx : tx * -1,
      y: el.position.y > 0 ? ty : ty * -1
    }
  }

  _firstItem() {
    return this.items[this.current]
  }

  _secondItem() {
    if (this.itemsCount >= 2) {
      return this.current + 1 < this.itemsCount ? this.items[this.current + 1] : this.items[Math.abs(this.itemsCount - (this.current + 1))]
    }
    return null
  }

  _thirdItem() {
    if (this.itemsCount >= 3) {
      return this.current + 2 < this.itemsCount ? this.items[this.current + 2] : this.items[Math.abs(this.itemsCount - (this.current + 2))]
    }
    return null
  }

  _lastItem() {
    if (this.itemsCount >= 3) {
      return this._thirdItem()
    } else {
      return this._secondItem()
    }
  }

}
