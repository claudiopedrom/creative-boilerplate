import each from 'lodash/each'
import gsap from 'gsap'

import Animation from '@/utils/classes/Animation'
import { calculate, split } from '@/utils/text'

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    })

    split({
      element: this.element,
      append: true
    })

    split({
      element: this.element,
      append: true
    })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.5
    })

    gsap.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(
        line,
        {
          y: '100%'
        },
        {
          duration: 1.5,
          delay: index * 0.2,
          y: '0%',
          ease: 'expo.out'
        },
        0
      )
    })
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
