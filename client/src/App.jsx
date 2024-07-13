import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Landing from "./page/landing/Landing";
import Dashboard from "./page/dashboard/Dashboard";
import Conversation from "./page/conversation/Conversation";
import CodePage from "./page/code/Code";
import Image from "./page/image/Image";
import { Layout } from "./page/dashboard/Layout";

function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/image" element={<Image />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;

// 1. authentication
