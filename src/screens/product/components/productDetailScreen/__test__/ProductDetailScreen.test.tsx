import {screen} from '@testing-library/dom'
import {App} from '../../../../../App'
import {testUtil} from '../../../../../tests/testUtil'

const productRoute = {route: '/products/1'}
describe('ProductDetailScreen', () => {
  test('Product detail title and back button', async () => {
    await testUtil.renderWithRoute(<App />, productRoute)
    await screen.findByText(/Product Detail/i)
    screen.getByRole('link', {name: /Back to Products/i})
  })
})
