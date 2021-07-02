import Home from '@/pages/home'
import About from '@/pages/about'
import Detail from '@/pages/detail'

class App {
  constructor() {
    this.getPageTemplate()
    this.createPage()
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
}

new App()
