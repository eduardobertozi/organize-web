import '@testing-library/jest-dom'

class IntersectionObserver {
  root: Element | null = null
  rootMargin: string = '0px'
  thresholds: ReadonlyArray<number> = []

  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
  takeRecords() {
    return []
  }
}

global.IntersectionObserver = IntersectionObserver
