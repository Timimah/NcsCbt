import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import { useState } from "react";
import { Modal } from "../../../components/shared/Modal";
// import logerror from "../assets/error.svg"

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(false);

  const handleLogin = () => {
    navigate('/dashboard/take-exam');
  }
  const createAccount = () => {
    navigate('/create-account')
  }

  return (
    <div className="bg-vector min-h-screen flex items-center justify-center">
      <div className='w-full max-w-lg px-10 py-8 mx-auto bg-secondary rounded-2xl'>
        <div className='max-w-md mx-auto space-y-3'>
          <h3 className="text-3xl text-primary font-bold">Welcome back!</h3>
          <p className="text-grey mb-8">Please enter your email and password</p>
          <div>
            <label className="block py-1 -mb-1">Email</label>
            <input type="email" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Enter your Email" />
            <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input type="password" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Password" />
          </div>
          <div className="flex flex-col gap-3 pt-3 items-center">
            <Button title="Login" btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={() => setShowModal(true)} />
            {/* <a href="#">Forgot Password</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}