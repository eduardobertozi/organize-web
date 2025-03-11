import { renderView } from '@/test/utils/render-view'
import { Servant } from './servant.index'

describe('<ServantPage />', () => {
  it('should render', () => {
    const screen = renderView(<Servant />)
    expect(screen.getByText('Servant')).toBeInTheDocument()
  })
})
