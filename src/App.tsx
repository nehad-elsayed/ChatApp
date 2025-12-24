import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthContextProvider from "./contexts/authContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import ProtectedAuthRoute from "./Routes/ProtectedAuthRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoute>
            <Register />
          </ProtectedAuthRoute>
        ),
      },

      { path: "/*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
        <Toaster />
      </AuthContextProvider>
    </>
  );
}

export default App;
