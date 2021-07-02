import each from 'lodash/each'

import Home from '@/pages/home'
import About from '@/pages/about'
import Detail from '@/pages/detail'

class App {
  constructor() {
    this.getPageTemplate()
    this.createPage()
    this.addLinkListeners()
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
    this.currentPage.show()
  }

  async handlePageChange(url) {
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
    } else {
      throw new Error('Something went wrong.')
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link

        this.handlePageChange(href)
      }
    })
  }
}

new App()
