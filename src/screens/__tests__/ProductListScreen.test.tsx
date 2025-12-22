import {screen} from '@testing-library/dom'
import {App} from '../../App'
import {testUtil} from '../../tests/testUtil'
describe('ProductListScreen', () => {
  test('should render correctly', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})
    await screen.findByText(/Product List/i)
  })
})
