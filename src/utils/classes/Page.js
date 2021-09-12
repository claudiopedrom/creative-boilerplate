import gsap from 'gsap'
import prefix from 'prefix'

import { queryElements } from '@/utils/dom'

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id
    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.transformPrefix = prefix('transform')
  }

  create() {
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

    this.element = document.querySelector(this.selector)
    this.elements = queryElements(this.selectorChildren)
  }

  show() {
    return new Promise(resolve => {
      this.animationIn = gsap.timeline()

      gsap.fromTo(
        this.element,
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1
        }
      )

      this.animationIn.call(() => {
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide() {
    this.removeEventListeners()
    this.animationOut = gsap.timeline()

    return new Promise(resolve => {
      gsap.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  update() {
    this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target)
    this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
    }
  }

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    }
  }

  onWheel({ pixelY }) {
    this.scroll.target += pixelY
  }

  addEventListeners() {}

  removeEventListeners() {}
}
