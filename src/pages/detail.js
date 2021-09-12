import Page from '@/utils/classes/Page'

export default class Detail extends Page {
  constructor() {
    super({
      id: 'detail',
      element: '.detail',
      elements: {
        wrapper: '.detail__wrapper'
      }
    })
  }
}
