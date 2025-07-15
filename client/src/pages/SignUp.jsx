import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserAstronaut } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmailCustomInput from "../components/EmailCustomInput";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import PasswordCustomInput from "../components/PasswordCustomInput";
import { signUpSuccess, signUpFailure, signUpStart } from "../redux/user/userSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.user)

  const [enteredPasswordIsTouched, setEnteredpasswordIsTouched] = useState(false);
  const [enteredConfirmPasswordIsTouched, setEnteredConfirmpasswordlIsTouched] = useState(false);
  const [formData, setFormData] = useState({ email: "", username: "", password: "", confirmPassword: "" });

  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

  const enteredpasswordIsValid = formData.password.trim().length !== 0 && strongRegex.test(formData.password);

  const enteredConfirmpasswordIsValid =
    formData.password.trim() === formData.confirmPassword.trim() &&
    formData.confirmPassword.trim().length !== 0;

  const passwordInputIsInvalid = !enteredpasswordIsValid && enteredPasswordIsTouched;
  const confirmPasswordInputIsInvalid = !enteredConfirmpasswordIsValid && enteredConfirmPasswordIsTouched;

  const passwordInputBlurHandler = () => setEnteredpasswordIsTouched(true);
  const confirmPasswordInputBlurHandler = () => setEnteredConfirmpasswordlIsTouched(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
     return dispatch(signUpFailure("Please fill out all fields"));
    }
    try {
      dispatch(signUpStart());
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false) {
        toast.error(data.message)
        return dispatch(signUpFailure(data.message));
      }

      if (response.ok) {
        dispatch(signUpSuccess(data));
        toast.success('account successfully created')
        navigate('/users');
      }

    } catch (error) {
      toast.error(error.message)
      return dispatch(signUpFailure(error.message));
    }

    setEnteredConfirmpasswordlIsTouched(false);
    setEnteredpasswordIsTouched(false);
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col gap-5">
        <div className="flex-1  w-[400px] mx-auto">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                required
                type="text"
                id="username"
                className=" w-200"
                autoComplete="name"
                aria-required="true"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                icon={() => <FaUserAstronaut color={formData.username.length > 0 ? "limegreen" : ""} />}
              />
            </div>
            <EmailCustomInput
                value={formData.email}
                onChange={(e) => setFormData({...formData,email: e.target.value})}
            />
            <PasswordCustomInput
              title="password"
              value={formData.password}
              onBlur={passwordInputBlurHandler}
              confirmInputCondition={passwordInputIsInvalid}
              iconColor={confirmPasswordInputIsInvalid ?  "red" : "" } 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              helperText='the password should contain at least 1 symbol, lowercase and uppercase letter , a number and be bigger than 6 characters'
            />
            <PasswordCustomInput
              title='confirm password'
              value={formData.confirmPassword}
              onBlur={confirmPasswordInputBlurHandler}
              helperText="Oops! passwords are not matching"
              iconColor={confirmPasswordInputIsInvalid ?  "red" : "" }
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              confirmInputCondition={confirmPasswordInputIsInvalid && formData.confirmPassword.length > 0}
            />
            <Button
              type="submit"
              disabled={loading}
              gradientDuoTone="pinkToOrange"
            >
              {loading ? (
                <div>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}