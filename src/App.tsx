import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "chat", element: <Chat /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      { path: "/*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
