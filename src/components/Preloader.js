import each from 'lodash/each'
import gsap from 'gsap'

import Component from '@/utils/classes/Component'
import { split } from '@/utils/text'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        numberText: '.preloader__number__text',
        images: document.querySelectorAll('img')
      }
    })

    split({
      element: this.elements.title,
      expression: '<br>'
    })

    split({
      element: this.elements.title,
      expression: '<br>'
    })

    this.elements.titleSpans = this.elements.title.querySelectorAll('span span')

    this.imagesLength = 0

    this.createLoader()
  }

  onLoaded() {
    return new Promise(() => {
      const animateOut = gsap.timeline()

      animateOut.to(this.elements.titleSpans, {
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%'
      })

      animateOut.to(
        this.elements.numberText,
        {
          duration: 1.5,
          ease: 'expo.out',
          stagger: 0.1,
          y: '100%'
        },
        '-=1.4'
      )

      animateOut.to(
        this.element,
        {
          duration: 1.5,
          ease: 'expo.out',
          scaleY: 0,
          transformOrigin: '100% 100%'
        },
        '-=1'
      )

      animateOut.call(() => {
        this.emit('completed')
      })
    })
  }

  onAssetLoaded() {
    this.imagesLength += 1

    const percent = this.imagesLength / this.elements.images.length

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`

    if (percent === 1) {
      this.onLoaded()
    }
  }

  createLoader() {
    if (this.elements.images && this.elements.images.length > 0) {
      each(this.elements.images, image => {
        image.onload = () => this.onAssetLoaded(image)
        image.src = image.getAttribute('data-src')
      })
    } else {
      this.onLoaded()
    }
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}
