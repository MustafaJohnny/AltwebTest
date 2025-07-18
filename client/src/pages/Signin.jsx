import { useState } from "react";
import toast from "react-hot-toast";;
import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmailCustomInput from "../components/EmailCustomInput";
import PasswordCustomInput from "../components/PasswordCustomInput";
import { signInStart, signInFailure, signInsuccess } from "../redux/user/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error:errorMessage } = useSelector(state=>state.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("https://altwebtest.onrender.com/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
        credentials:"include"

      });

      const data = await response.json();
      if (data.success === false) {
        toast.error(data.message)
        dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        toast.success('login successful')
        dispatch(signInsuccess(data))
        navigate("/users");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
 
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col gap-5">
        <div className="flex-1 w-[400px] mx-auto">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <EmailCustomInput
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <PasswordCustomInput
              title='password'
              value={formData.password}
              iconColor={formData.password.length>5?'cyan':"grey"}
              onChange={(e) => setFormData({ ...formData, password: e.target.value})}  
            />
            <Button
              type="submit"
              gradientDuoTone="pinkToOrange"
              disabled={loading && !errorMessage}
            >
              {loading && !errorMessage ? (
                <div>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Already have an account?</span>
            <Link to="/sign-Up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}