import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Main } from "./Main";
import { About } from "./About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

