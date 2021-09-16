import each from 'lodash/each'
import normalizeWheel from 'normalize-wheel'

import Home from '@/pages/home'
import About from '@/pages/about'
import Detail from '@/pages/detail'

import Preloader from '@/components/Preloader'

class App {
  constructor() {
    // Page
    this.getPageTemplate()
    this.createPages()

    // Components
    this.createPreloader()

    // Listeners
    this.addEventListeners()
    this.addLinkListeners()

    // Events
    this.onResize()

    // Loop
    this.update()
  }

  getPageTemplate() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages() {
    this.allPages = {
      home: new Home(),
      about: new About(),
      detail: new Detail()
    }

    this.page = this.allPages[this.template]
    this.page.create()
  }

  /**
   * Components.
   */
  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  /**
   * Events.
   */
  async onChange(url) {
    await this.page.hide()

    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.page = this.allPages[this.template]
      this.page.create()

      this.onResize()
      this.page.show()

      this.addLinkListeners()
    } else {
      console.log('Error')
    }
  }

  onPreloaded() {
    this.onResize()
    this.preloader.destroy()
    this.page.show()
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  onWheel(event) {
    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizeWheel(event))
    }
  }

  /**
   * Loop.
   */
  update() {
    if (this.page && this.page.update) {
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  /**
   * Listeners.
   */
  addEventListeners() {
    window.addEventListener('mousewheel', this.onWheel.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link

        this.onChange(href)
      }
    })
  }
}

new App()
