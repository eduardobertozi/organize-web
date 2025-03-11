import { render } from '@testing-library/react'
// import QueryProvider from '@/lib/query-provider'

export function renderView(Component: React.ReactElement) {
  // return render(<QueryProvider>{Component}</QueryProvider>) if use Tanstack Query
  return render(<>{Component}</>)
}
