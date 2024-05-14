import { useNavigate } from "react-router-dom";
// import { Button } from "../../../components/shared/Button";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, setIsLoggedIn, setUserIsAdmin } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleLogin = async () => {
    // console.log( "Logging in...")
    if (isValid) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/admin/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = response.data.data;
        setLoggedInUser(user.email);
        localStorage.setItem("auth-token", response.data.token);
        setIsLoading(false);
        navigate("/admin-dashboard");
        setIsLoggedIn(true);
        setUserIsAdmin(true);
      } catch (err) {
        setIsLoading(false);
        if (!err?.response) {
          console.log(err);
        }
        if (err.response) {
          setError(err.response.data.message);
        }
        if (err.response.message === "Network Error") {
          setError("No Internet Connection")
        }
      }
      setEmail("");
      setPassword("");
    }
  }


  return (
    <div className="bg-vector bg-secondary min-h-screen flex items-center justify-center">
      <div className='w-full max-w-lg px-10 py-8 mx-8 md:mx-auto bg-secondary rounded-2xl shadow-md'>
        <div className='max-w-md mx-auto space-y-3'>
          <h3 className="text-3xl text-primary font-bold">Welcome back!</h3>
          <p className="text-grey mb-8">Please enter your email and password</p>
          <div>
            <label className="block py-1 -mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid ID");
                }
                setIsValid(true);
                setError(""); }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value);
                if (e.target.value == "") {
                  setError("Password is required");
                  setIsValid(false);
                }
                setIsValid(true);
                setError(""); }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Password" />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-col gap-3 pt-3 items-center">
            <button
              className="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full relative text-center flex justify-center items-center cursor-pointer"
              onClick={handleLogin}
              disabled={!isValid}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            {/* <Button title="Login" btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={} /> */}
            {/* <a href="#">Forgot Password</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}