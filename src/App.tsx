import {WuPrimaryNavbar} from '@npm-questionpro/wick-ui-lib'
import './App.css'
import {API_BASE_URL} from './constants/appConstants'
import type {IServerResponse} from './types/IServerResponse'
import type {IProduct} from './types/IProduct'
import {useQuery, type UseQueryResult} from '@tanstack/react-query'
import {AppRoutes} from './AppRoutes'

// const fetchProduct = async (): Promise<IServerResponse<IProduct[]>> => {
//   return fetch(`${API_BASE_URL}product`, {
//     method: 'GET',
//     headers: {
//       // eslint-disable-next-line @typescript-eslint/naming-convention
//       'Content-Type': 'application/json',
//     },
//   }).then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok')
//     }
//     return response.json() as Promise<IServerResponse<IProduct[]>>
//   })
// }

// const useProductApi = (): UseQueryResult<
//   IServerResponse<IProduct[]>,
//   Error
// > => {
//   return useQuery({
//     queryKey: ['product'],
//     queryFn: fetchProduct,
//   })
// }

export const App: React.FC = () => {
  // const {data, error, isLoading} = useProductApi()

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (error) {
  //   console.error('Error fetching product:', error)
  //   return <div>Error: {error?.message || 'Something went wrong'}</div>
  // }
  // const products = data?.data
  // if (!products || products.length === 0) {
  //   throw new Error('Products not found')
  // }

  return (
    <>
      <div>
        <WuPrimaryNavbar
          Links={[
            <a key="home" href="/" className="active">
              Home
            </a>,
            <a key="about" href="#">
              About
            </a>,
            <a key="services" href="#">
              Services
            </a>,
            <a key="contact" href="#">
              Contact
            </a>,
            <a key="product" href="/products">
              Product
            </a>,
          ]}
        />
        <AppRoutes />
      </div>

      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  )
}
