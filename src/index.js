import each from 'lodash/each'

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
    this.addLinkListeners()
  }

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
      this.currentPage.show()

      this.addLinkListeners()
    } else {
      throw new Error('Something went wrong.')
    }
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

  onPreloaded() {
    this.preloader.destroy()
    this.currentPage.show()
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
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
