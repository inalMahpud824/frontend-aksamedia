import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import App from './App.jsx';
import AddDataPage from './pages/AddData.jsx';
import UpdateDataPage from './pages/UpdateData.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/add",
    element: <AddDataPage />,
  },
  {
    path: "/update/:id",
    element: <UpdateDataPage />,
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
