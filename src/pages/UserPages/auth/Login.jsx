import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/shared/Button";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const [examineeId, setExamineeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleLogin = async () => {
    if (isValid) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/users/login",
          { examineeId, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = response.data.data;
        localStorage.setItem("auth-token", response.data.token);
        setIsLoading(false);
        navigate("/dashboard/user-profile");
      } catch (err) {
        setIsLoading(false);
        if (!err?.response) {
          console.log(err);
        }
        if (err.response) {
          setError(err.response.data.message);
        }
      }
      setExamineeId("");
      setPassword("");
    }
  };

  return (
    <div className="bg-vector min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-secondary rounded-2xl">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl text-primary font-bold">Welcome back!</h3>\
          <div>{error}</div>
          <p className="text-grey mb-8">Please enter your ID and password</p>
          <div>
            <label className="block py-1 -mb-1">Examinee ID</label>
            <input
              type="text"
              value={examineeId}
              onChange={(e) => {
                setExamineeId(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid ID");
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your ID"
            />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value == "") {
                  setError("Password is required");
                  setIsValid(false);
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Password"
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex flex-col gap-3 pt-3 items-center">
            <button
              className="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full relative text-center flex justify-center items-center"
              onClick={handleLogin}
              disabled={!isValid}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <Button
              title="Create Account"
              btnStyles="border border-primary text-primary text-lg rounded-lg shadow-sm py-4 px-4 w-full"
              btnClick={() => navigate("/create-account")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
