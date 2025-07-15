import Users from "./pages/Users";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  xdx
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}