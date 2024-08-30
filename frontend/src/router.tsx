import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts'
import { LoginPage, OrdersPage } from './pages'

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to={'login'} /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'orders', element: <OrdersPage /> },
        ],
    },
])

export { router }
