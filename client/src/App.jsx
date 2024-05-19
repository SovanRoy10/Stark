import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Landing from "./page/landing/Landing";
import Dashboard from "./page/dashboard/Dashboard";
import { Layout } from "./page/dashboard/Layout";

function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;

// 1. authentication
