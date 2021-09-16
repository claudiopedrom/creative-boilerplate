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
    this.pages = {
      home: new Home(),
      about: new About(),
      detail: new Detail()
    }

    this.page = this.pages[this.template]
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
  async onChange({ url, push = true }) {
    await this.page.hide() // hide current page

    const request = await window.fetch(url) // fetch requested page

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div') // create fake div

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html // save html response to fake div

      const divContent = div.querySelector('.content') // select new content from fake div

      this.template = divContent.getAttribute('data-template') // update template value
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML // apply fake div content to our page

      this.page = this.pages[this.template]
      this.page.create()

      this.onResize()
      this.page.show()

      this.addLinkListeners()
    } else {
      console.log('Error')
    }
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
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
    // start a separate animation loop for pages, if one exists
    if (this.page && this.page.update) {
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  /**
   * Listeners.
   */
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this))

    window.addEventListener('mousewheel', this.onWheel.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link

        this.onChange({ url: href })
      }
    })
  }
}

new App()
