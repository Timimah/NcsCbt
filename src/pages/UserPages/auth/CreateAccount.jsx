import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/shared/Button";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const { setUserIsUser, setLoggedInUser } = useUserStore();

  const [fullName, setFullName] = useState("");
  const [examineeId, setExamineeId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rank, setRank] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [rankError, setRankError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async () => { 
    let isValid = true;
    if (!fullName.trim()) {
      setFullNameError("Full Name is required");
      isValid = false;
    }
    if (!examineeId.trim()) {
      setIdError("ID is required");
      isValid = false;
    } 
    // else {
      // Check if the id already exists in the users array
      // const userExists = users.some((u) => u.examineeId === examineeId);
      // if (userExists) {
      //   setIdError("ID already exists");
      //   isValid = false;
      // }
    // }
    // if (!email.trim()) {
    //   setUserEmailError("Email is required");
    //   isValid = false;
    // }
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone Number is required");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    if (!rank.trim()) {
      setRankError("Rank is required");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      let userData = { fullName, examineeId, email, phoneNumber, rank, password };
      console.log(userData)
     
    const sendRequest = async () => {
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/users/register",
          userData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data.status);
        } catch (err) {
        if (!err?.response) {
          console.log(err);
          console.log(err.message);
        } else if (err.response?.status === 409) {
          setFullNameError("Username Taken");
        } else {
          setConfirmPasswordError("Registration Failed");
        }
      }
    };
    sendRequest();

      // createUser(userData);
      setFullName("");
      setExamineeId("");
      setEmail("");
      setPhoneNumber("");
      setRank("");
      setPassword("");
      setConfirmPassword("");
      console.log("User created successfully");
      navigate("/login");
    }
  };
 
  return (
    <div className="bg-vector min-h-screen flex items-center justify-center py-10">
      <div className='w-full max-w-lg px-10 py-8 mx-auto bg-secondary rounded-2xl'>
        <div className='max-w-md mx-auto space-y-3' onSubmit={handleSubmit}>
          <h3 className="text-3xl text-primary font-bold">Welcome</h3>
          <p className="text-grey mb-8">Please enter your ID and password</p>
          <div>
            <label className="block py-1 -mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setFullNameError(""); }}
              className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${fullNameError ? "border-red-500" : ""
                }`}
              placeholder="Enter your full name"
            />
            {fullNameError && <div className="text-sm text-red-500">{fullNameError}</div>}
          </div>
          <div>
            <label className="block py-1 -mb-1">ID</label>
            <input
              type="text"
              value={examineeId}
              onChange={(e) => { setExamineeId(e.target.value); setIdError(""); }}
              className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${idError ? "border-red-500" : ""
                }`}
              placeholder="Enter your ID"
            />
            {idError && <div className="text-sm text-red-500">{idError}</div>}
          </div>
          <div>
            <label className="block py-1 -mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setUserEmailError(""); }}
              className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${userEmailError ? "border-red-500" : ""
                }`}
              placeholder="Enter your email"
            />
            {userEmailError && <div className="text-sm text-red-500">{userEmailError}</div>}
          </div>
          <div>
            <label className="block py-1 -mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberError(""); }}
              className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${phoneNumberError ? "border-red-500" : ""
                }`}
              placeholder="Enter your phone number"
            />
            {phoneNumberError && <div className="text-sm text-red-500">{phoneNumberError}</div>}
          </div>
          <div>
            <label htmlFor="rank" className="block py-1 -mb-1">Select Rank</label>
            <select id="rank" name="rank" value={rank} onChange={(e) => { setRank(e.target.value); setRankError("") }} className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${rankError ? 'border-red-500' : ''}`}>
            <option value="">Select a category</option>
              <option value="CAI">CAI</option>
              <option value="CAII">CAII</option>
              <option value="AIC">AIC</option>
              <option value="IC">IC</option>
              <option value="ASCII">ASCII</option>
              <option value="ASCI">ASCI</option>
              <option value="DSC">DSC</option>
              <option value="SC">SC</option>
              <option value="CSC">CSC</option>
              <option value="AC">AC</option>
              <option value="DC">DC</option>
              <option value="CC">CC</option>
            </select>
            {rankError && <div className="text-sm text-red-500">{rankError}</div>}
          </div>
          <div>
            <label htmlFor="password" className="block py-1 -mb-1">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError("") }} className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${passwordError ? 'border-red-500' : ''}`} placeholder="Enter your password" />
            {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block py-1 -mb-1">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError("") }} className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${confirmPasswordError ? 'border-red-500' : ''}`} placeholder="Confirm your password" />
            {confirmPasswordError && <div className="text-sm text-red-500">{confirmPasswordError}</div>}
          </div>
          <div className="flex flex-col gap-3 pt-3 items-center">
            <Button title="Create Account" btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={handleSubmit} />
            <Button title="Login" btnStyles="border border-primary text-primary text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={() => navigate('/login')} />
            {/* <a href="#">Forgot Password</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}