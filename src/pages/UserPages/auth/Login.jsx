import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/shared/Button";
import { useUserStore } from "../../../store/userStore";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUserStore();

  const [examineeId, setExamineeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Find the user with the provided examineeId
    const user = useUserStore.getState().users.find((u) => u.examineeId === examineeId);
  
    if (user) {
      // Check if the provided password matches the user's password
      if (user.password === password) {
        // Login successful, call the loginUser action and navigate to the desired page
        loginUser({ examineeId, password });
        console.log("Login successful");
        navigate("/dashboard");
      } else {
        // Incorrect password
        setError("Invalid password");
      }
    } else {
      // User with the provided examineeId not found
      setError("Invalid examinee ID");
    }
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
            <Button title="Create Account" btnStyles=" border border-primary text-primary text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={() => navigate('/create-account')} />
          </div>
        </div>
      </div>
    </div>
  );
}