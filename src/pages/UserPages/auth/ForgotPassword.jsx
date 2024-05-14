import React, { useState } from "react";
import { Button } from "../../../components/shared/Button";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

  const resetPassword = (e) => {
    if(isValid){
    console.log("Forgot password form submitted");
    }
    else {
        setError("Enter a valid email address");
    }
  };

  return (
    <div className="bg-vector bg-secondary min-h-screen flex flex-col gap-2 items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-8 md:mx-auto bg-secondary rounded-2xl shadow-md">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-3xl text-primary font-bold">Forgot Password</h3>
          <p className="text-grey mb-8">
            Please enter the Email Address you used to create an account
          </p>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div>
            <label htmlFor="email address" className="block py-1 -mb-1">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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
      <div>Remember Password ?
      <Link to="/login" className="text-sm text-primary"> Login</Link>
      </div>
    </div>
  );
};
