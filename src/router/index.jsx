import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp } from "@pages";
import ForgotPassword from "../pages/forgot-password/index";
import Main from "../pages/main/index";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="main" element={<Main />} />{" "}
        {/* Removed '/' from the start */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
