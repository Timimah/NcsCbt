import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminLogin = () => {
  const navigate = useNavigate();
  // const { loginAdmin, loggedInAdmin } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    let isValid = false;
    if (email === "") {
      setError("Enter a Email Address")
      isValid = false
    } else if (password === "") {
      setError("Enter Password")
      isValid = false;
    } else {
      isValid = true;
    }
    // Basic input validation
    if (!email || !password) {
      setError("Please enter both Email and Password");
      return;
    }

    const sendRequest = async () => {
      if (isValid) {
        try {
          const response = await axios.post("https://ncs-cbt-api.onrender.com/admin/login",
            { email, password },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          console.log(response.data.data);
          const user = response.data.data
          console.log(user)
          // setLoggedInUser(user.fullName)
          let userExists = false;
          if (user.email === email && user.phoneNumber) {
            userExists = true;
          }
          if (user.email !== email) {
            setError("Examinee ID is incorrect")
          } else if (!user.phoneNumber) {
            setError("Password is incorrect")
          } else {
            console.log(user.password, user.examineeId)
          }
          if (userExists) {
            console.log("success")
            setIsLoggedIn(true);
            setUserIsAdmin(true);
            navigate('/admin-dashboard');
          }
        } catch (err) {
          if (!err?.response) {
            console.log(err);
          } else if (err.response?.status === 400) {
            setError('Missing Username or Password');
          } else if (err.response?.status === 401) {
            setError('Unauthorized');
          } else {
            setError('Login Failed');
          }
        }
        setEmail("");
        setPassword("");
      }
    }
    sendRequest();

  };
  

  return (
    <div className="bg-vector min-h-screen flex items-center justify-center">
      <div className='w-full max-w-lg px-10 py-8 mx-auto bg-secondary rounded-2xl'>
        <div className='max-w-md mx-auto space-y-3'>
          <h3 className="text-3xl text-primary font-bold">Welcome back!</h3>
          <p className="text-grey mb-8">Please enter your email and password</p>
          <div>
            <label className="block py-1 -mb-1">Email</label>
            <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
            placeholder="Enter your Email"
            />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
            placeholder="Password" />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-col gap-3 pt-3 items-center">
            <Button title="Login" btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={handleLogin} />
            {/* <a href="#">Forgot Password</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}