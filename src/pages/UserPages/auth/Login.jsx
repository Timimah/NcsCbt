import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/shared/Button";
import axios from "axios";
import { useUserStore } from "../../../store/userStore";

export const Login = () => {
  const navigate = useNavigate();
  const { setLoggedInUser, setIsLoggedIn, setUserIsUser } = useUserStore();

  const [examineeId, setExamineeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async () => {
    let isValid = false;
    if (examineeId === "") {
      setError("Enter a valid ID")
      isValid = false
    } else if (password === "") {
      setError("Enter password")
      isValid = false;
    } else {
      isValid = true;
    }

    const sendRequest = async () => {
      if (isValid) {
        try {
          const response = await axios.post("https://ncs-cbt-api.onrender.com/users/login",
            { examineeId, password },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );
          console.log(response.data.data);
          const user = response.data.data
          console.log(user)
          setLoggedInUser(user.fullName)
          let userExists = false;
          if (user.examineeId === examineeId && user.phoneNumber) {
            userExists = true;
          } else {
            setError("User does not exist")
          }
          if (user.examineeId !== examineeId) {
            setError("Examinee ID is incorrect")
          } else if (!user.phoneNumber) {
            setError("Password is incorrect")
          } else {
            console.log(user.password, user.examineeId)
          }
          if (userExists) {
            console.log("success")
            setIsLoggedIn(true);
            setUserIsUser(true);
            navigate('/dashboard/user-profile');
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
        setExamineeId("");
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
          <p className="text-grey mb-8">Please enter your ID and password</p>
          <div>
            <label className="block py-1 -mb-1">Examinee ID</label>
            <input
              type="text"
              value={examineeId}
              onChange={(e) => { setExamineeId(e.target.value); setError(""); }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your ID"
            />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Password"
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-col gap-3 pt-3 items-center">
            <Button title="Login" btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={handleLogin} />
            <Button title="Create Account" btnStyles="border border-primary text-primary text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={() => navigate('/create-account')} />
          </div>
        </div>
      </div>
    </div>
  );
}