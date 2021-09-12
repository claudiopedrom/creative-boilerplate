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
    this.createPage()

    // Components
    this.createPreloader()

    // Listeners
    this.addEventListeners()
    this.addLinkListeners()

    // Events
    this.onResize()

    // requestAnimationFrame
    this.update()
  }

  getPageTemplate() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPage() {
    this.allPages = {
      home: new Home(),
      about: new About(),
      detail: new Detail()
    }

    this.currentPage = this.allPages[this.template]
    this.currentPage.create()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  /**
   * Events.
   */
  async onPageChange(url) {
    await this.currentPage.hide()

    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.currentPage = this.allPages[this.template]
      this.currentPage.create()

      this.onResize()
      this.currentPage.show()

      this.addLinkListeners()
    } else {
      throw new Error('Something went wrong.')
    }
  }

  onPreloaded() {
    this.onResize()
    this.preloader.destroy()
    this.currentPage.show()
  }

  onResize() {
    if (this.currentPage && this.currentPage.onResize) {
      this.currentPage.onResize()
    }
  }

  onWheel(event) {
    if (this.currentPage && this.currentPage.onWheel) {
      this.currentPage.onWheel(normalizeWheel(event))
    }
  }

  /**
   * Loop.
   */
  update() {
    if (this.currentPage && this.currentPage.update) {
      this.currentPage.update()
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

        this.onPageChange(href)
      }
    })
  }
}

new App()
