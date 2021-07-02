import EventEmitter from 'events'

import { queryElements } from '@/utils/dom'

export default class Component extends EventEmitter {
  constructor({ element, elements }) {
    super()

    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.create()
    this.addEventListeners()
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = queryElements(this.selectorChildren)
  }

  addEventListeners() {}

  removeEventListeners() {}
}
