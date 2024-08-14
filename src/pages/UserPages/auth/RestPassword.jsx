import React, { useEffect, useState } from "react";
import { Button } from "../../../components/shared/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      await axios
        .get(`https://ncs-cbt-api.onrender.com/users/reset-password/${id}/${token}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          // navigate("/login");
        });
    }
    verifyToken();
  }, [id, token]);

    const resetPassword = async (e) => {
    if(isValid) {
    setIsLoading(true);
  }
  else {
    setError("Enter a valid password");
    //testing reset password
    setIsValid(false);
  }
  };

  return (
    <div className="bg-vector min-h-screen flex flex-col gap-2 items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-8 md:mx-auto bg-secondary rounded-2xl shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl text-primary font-bold">Reset Password</h3>
          <p className="text-grey mb-8">
            Please enter a new password
          </p>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div>
            <label htmlFor="new password" className="block py-1 -mb-1">
              New Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid password");
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label htmlFor="confirm password" className="block py-1 -mb-1">
              Confirm Password
            </label>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value == "") {
                  setIsValid(false);
                  setError("Enter a valid password");
                }
                setIsValid(true);
                setError("");
              }}
              className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
              placeholder="Enter your new password"
            />
          </div>
        </div>
        <div className="flex flex-col mt-10 items-center">
            <Button
              title={isLoading ? "Loading..." : "Reset Password"}
              btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full relative text-center flex justify-center items-center"
              btnClick={resetPassword}
              disabled={isValid === false}
            />
          </div>
      </div>
      <div>
      <Link to="/login" className="text-primary">Back to Login</Link>
      </div>
    </div>
  );
};
