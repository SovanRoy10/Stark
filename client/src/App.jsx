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
import Music from "./page/music/Music";
import Video from "./page/video/Video";
import SignIn from "./page/signIn/SignIn";
import SignUp from "./page/signUp/SignUp";

import { Layout } from "./page/dashboard/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./page/Notfound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <ProtectedRoute>
                <Conversation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/code"
            element={
              <ProtectedRoute>
                <CodePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/image"
            element={
              <ProtectedRoute>
                <Image />
              </ProtectedRoute>
            }
          />
          <Route
            path="/music"
            element={
              <ProtectedRoute>
                <Music />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video"
            element={
              <ProtectedRoute>
                <Video />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;
