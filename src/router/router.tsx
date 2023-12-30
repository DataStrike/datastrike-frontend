import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Header />
        <Outlet />
        <Footer />
        </>
    );
}

const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Root />
            },
            {
                path: '/products',
                element: <ProductsList />
            },
            {
                path: '/products/:productId',
                element: <SingleProductPage />
            }
        ]
    }
])