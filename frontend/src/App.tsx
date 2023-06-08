import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import AuthRequired from "./components/AuthRequired";
import loadable from "@loadable/component";

const Login = loadable(() => import("./pages/Login"));
const Dashboard = loadable(() => import("./pages/Dashboard"));
const ConvertImages = loadable(() => import("./pages/ConvertImages"));
const About = loadable(() => import("./pages/About"));
const SignUp = loadable(() => import("./pages/SignUp"));
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/images" element={<ConvertImages />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<AuthRequired />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <>
        <RouterProvider router={router} />
      </>
    </>
  );
}

export default App;
