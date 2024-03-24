import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import { useAdminStore } from "../../../store/adminStore";
import { useEffect, useState } from "react";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin, loggedInAdmin } = useAdminStore();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Basic input validation
    if (!adminEmail || !adminPassword) {
      setError("Please enter both email and password");
      return;
    }

    const loginData = { adminEmail, adminPassword };
    const loggedIn = loginAdmin(loginData);

    if (loggedIn) {
      console.log("Login successful");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid email or password");
    }
    console.log(loggedInAdmin)
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
            value={adminEmail}
            onChange={(e) => { setAdminEmail(e.target.value); setError(""); }}
            className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
            placeholder="Enter your Email"
            />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input
            type="password"
            value={adminPassword}
            onChange={(e) => { setAdminPassword(e.target.value); setError(""); }}
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