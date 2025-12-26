import {screen} from '@testing-library/dom'
import {App} from '../../../../App'
import {testUtil} from '../../../../tests/testUtil'
import userEvent from '@testing-library/user-event'

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
    screen.getByRole('cell', {name: /16 oz/i})
  })

  test('Open dialog for create product', async () => {
    await testUtil.renderWithRoute(<App />, productRoute)
    const createProductButton = screen.getByRole('button', {
      name: /Create Product/i,
    })
    await userEvent.click(createProductButton)
    // expect(createProductButton).toBeInTheDocument()

    screen.getByRole('dialog', {name: /Product/i})
    const titleBox = screen.getByRole('textbox', {name: /Name/i})
    await userEvent.type(titleBox, 'Test Product')
    const descriptionBox = screen.getByRole('textbox', {name: /Description/i})
    await userEvent.type(descriptionBox, 'This is a test product')
    const priceBox = screen.getByRole('spinbutton', {name: /Price/i})
    await userEvent.clear(priceBox)
    await userEvent.type(priceBox, '99.99')

    const saveButton = screen.getByRole('button', {name: /Save/i})
    await userEvent.click(saveButton)

    // Modal should be closed
    // expect(
    //   screen.queryByRole('dialog', {name: /Product/i}),
    // ).not.toBeInTheDocument()
  })
})
