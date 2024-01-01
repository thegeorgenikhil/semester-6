import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Select, Settings } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/select",
    element: <Select />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
