import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from "./pages/Cart";
import Singleproduct from "./components/Singleproduct";
import Login from "./pages/Login";
import About from './pages/About';
import Pagesn from './pages/Pagesn';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productData } from './api/Api';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader:productData,
      },
      {
        path:"/product/:id",
        element:<Singleproduct/>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
      path:"/blog",
      element:<About/>
      },
      {
      path:"/page",
      element:<Pagesn/>
      },
    ],
  },
]);
function App() {
  return (
    <div className='font-bodyFont'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
