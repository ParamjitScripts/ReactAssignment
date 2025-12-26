# Axios API Service

This directory contains the Axios-based API implementation with interceptors for the application.

## Files

### 1. `axiosClient.ts`
The main Axios instance with configured interceptors.

**Features:**
- Request interceptor for logging and adding authentication headers
- Response interceptor for logging and error handling
- Automatic token management from localStorage
- Centralized error handling for common HTTP status codes (401, 403, 404, 500)
- Development mode logging

### 2. `apiService.ts`
Generic API service with reusable HTTP methods.

**Available Methods:**
- `get<T>(url, params?)` - GET request
- `post<T, D>(url, data?)` - POST request
- `put<T, D>(url, data?)` - PUT request
- `patch<T, D>(url, data?)` - PATCH request
- `delete<T>(url)` - DELETE request

## Usage Examples

### Basic GET Request
```typescript
import apiService from '../services/apiService'

// Fetch products
const products = await apiService.get<IServerResponse<IProduct[]>>('products')

// Fetch with query parameters
const filtered = await apiService.get<IServerResponse<IProduct[]>>('products', {
    search: 'laptop'
})
```

### POST Request
```typescript
import apiService from '../services/apiService'

const newProduct = await apiService.post<IProduct>('products', {
    name: 'New Product',
    description: 'Product description',
    price: 99.99,
    currency: 'USD'
})
```

### PUT Request
```typescript
import apiService from '../services/apiService'

const updated = await apiService.put<IProduct>('products/1', {
    name: 'Updated Product',
    price: 149.99
})
```

### DELETE Request
```typescript
import apiService from '../services/apiService'

await apiService.delete('products/1')
```

## Interceptor Features

### Request Interceptor
- Automatically adds `Authorization` header with Bearer token from localStorage
- Logs all API requests in development mode
- Intercepts and handles request configuration errors

### Response Interceptor
- Logs all API responses in development mode
- Handles HTTP error status codes:
  - **401 Unauthorized**: Clears auth token and logs warning
  - **403 Forbidden**: Logs access denied error
  - **404 Not Found**: Logs resource not found
  - **500 Internal Server Error**: Logs server error
- Handles network errors (no response from server)
- Handles request setup errors

## Authentication

To add authentication token:
```typescript
// Store token
localStorage.setItem('authToken', 'your-jwt-token')

// All subsequent requests will include:
// Authorization: Bearer your-jwt-token
```

## Error Handling

Errors are automatically handled by the response interceptor. You can catch them in your code:

```typescript
try {
    const data = await apiService.get('products')
} catch (error) {
    // Error is already logged by interceptor
    // Handle UI-specific error logic here
    console.error('Failed to fetch products:', error)
}
```

## Customizing Axios Client

To modify the Axios instance (timeout, base URL, etc.), edit `axiosClient.ts`:

```typescript
const axiosClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Modify timeout
    headers: {
        'Content-Type': 'application/json',
    },
})
```

## Integration with React Query

The service works seamlessly with React Query:

```typescript
import { useQuery } from '@tanstack/react-query'
import apiService from '../services/apiService'

export const getProducts = (params: ProductQueryParams = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => apiService.get<IServerResponse<IProduct[]>>('products', params),
    })
}
```
