import Page from '@/utils/classes/Page'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        // `elements` can have 3 types of values
        navigationClass: '.navigation',
        navigationSelector: document.querySelector('.navigation'),
        navigationArray: [
          document.querySelector('.navigation'),
          document.querySelector('.navigation')
        ]
      }
    })
  }
}
