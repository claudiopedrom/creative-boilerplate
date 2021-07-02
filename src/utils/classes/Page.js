import gsap from 'gsap'

import { queryElements } from '@/utils/dom'

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id
    this.selector = element
    this.selectorChildren = {
      ...elements
    }
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = queryElements(this.selectorChildren)
  }

  show() {
    return new Promise(resolve => {
      gsap.fromTo(this.element, { autoAlpha: 0 }, { autoAlpha: 1, onComplete: resolve })
    })
  }

  hide() {
    return new Promise(resolve => {
      gsap.to(this.element, { autoAlpha: 0, onComplete: resolve })
    })
  }
}
