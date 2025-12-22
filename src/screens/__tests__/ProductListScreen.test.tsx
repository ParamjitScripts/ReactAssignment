import {screen} from '@testing-library/dom'
import {App} from '../../App'
import {testUtil} from '../../tests/testUtil'

const productRoute = {route: '/products'}
describe('ProductListScreen', () => {
  test('should render correctly', async () => {
    await testUtil.renderWithRoute(<App />, productRoute)
    await screen.findByText(/Product List/i)
  })

  test('User should see the product list', async () => {
    await testUtil.renderWithRoute(<App />, productRoute)

    await screen.findAllByText('Armor All Extreme Tire Shine Gel')
    await screen.findByText('Black Magic Tire Wet Gel')
    // await screen.findByText(/16 oz/i)
    screen.getByRole('cell', {name: /16 oz/i})
  })
})
