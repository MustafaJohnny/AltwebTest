import Users from "./pages/Users";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NonPrivateRoute from "./components/NonPrivateRoute";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<NonPrivateRoute/>}>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<Signin />} />
        <Route element={<PrivateRoute />}>
        </Route>
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}