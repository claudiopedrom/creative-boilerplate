import each from 'lodash/each'

const isQuerySelector = entry =>
  entry instanceof window.HTMLElement || entry instanceof window.NodeList

export const queryElement = selector => {
  if (selector instanceof window.HTMLElement) return selector

  return document.querySelector(selector)
}

export const queryElements = selectorChildren => {
  const elements = {}

  each(selectorChildren, (entry, key) => {
    if (isQuerySelector(entry) || Array.isArray(entry)) {
      elements[key] = entry
    } else {
      elements[key] = document.querySelectorAll(entry)

      if (elements[key].length === 0) {
        elements[key] = null
      } else if (elements[key].length === 1) {
        elements[key] = document.querySelector(entry)
      }
    }
  })

  return elements
}
