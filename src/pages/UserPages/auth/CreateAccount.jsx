import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../../../components/shared/Modal";
import { Button } from "../../../components/shared/Button";
// import logerror from "../assets/error.svg"

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(false);

  const handleLogin = () => {
    navigate('/take-exam');
  }

  return (
    <div className="bg-vector min-h-screen flex items-center justify-center">
      <div className='w-full max-w-lg px-10 py-8 mx-auto bg-secondary rounded-2xl'>
        <div className='max-w-md mx-auto space-y-3'>
          <h3 className="text-3xl text-primary font-bold">Welcome</h3>
          <p className="text-grey mb-8">Please enter your ID and password</p>
          <div>
            <label className="block py-1 -mb-1">Full Name</label>
            <input type="text" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Enter your full name" />
            <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
          </div>
          <div>
            <label className="block py-1 -mb-1">ID</label>
            <input type="text" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Enter your ID" />
          </div>
          <div>
            <label className="block py-1 -mb-1">Email</label>
            <input type="email" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block py-1 -mb-1">Phone Number</label>
            <input type="tel" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Enetr your phone number" />
          </div>
          <div>
            <label className="block py-1 -mb-1">Select Rank</label>
            <input type="password" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Password" />
          </div>
          <div>
            <label className="block py-1 -mb-1">Password</label>
            <input type="password" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Password" />
          </div>
          <div>
            <label className="block py-1 -mb-1">Confirm Password</label>
            <input type="password" className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary" placeholder="Confirm Password" />
          </div>
          <div className="flex flex-col gap-3 pt-3 items-center">
            <Button title="Create Account" btnStyles="bg-primary text-white text-lg rounded-lg shadow-sm py-4 px-4 w-full" btnClick={() => navigate('/login')} />
            {/* <a href="#">Forgot Password</a> */}
          </div>
        </div>
      </div>
      {showModal && <Modal title="Instructions" btntitle="Start Test" btnStyles="bg-primary rounded-lg text-white w-fit py-4 px-4" modStyles="w-full mx-8 my-8 h-3/4 px-16 text-wrap py-10" content={
        <>
          <div className="flex flex-col gap-4 mb-4 text-sm">
            <p>Welcome to the [Exam Name] CBT platform. Please read the following instructions carefully before starting the exam.</p>
            <p>Before proceeding, ensure that your computer and internet connection are working properly. Click on the 'System Check' button to verify.</p>
          </div>
          <div className="flex flex-col gap-1 text-sm mb-4">
            <p>1. Time Reminder: <br/> <span className="ml-10">You will have [Time Limit] to complete the exam. A timer will be displayed on the screen to help you manage your time effectively.</span></p>
            <p>2. Navigation Instructions: <br/> <span className="ml-10">Use the navigation buttons provided to move between questions. You can go back and forth as needed.</span></p>
            <p>3. Answering Format: <br/> <span className="ml-10">Answer each question by selecting the appropriate option.</span></p>
            <p>4. Marking for Review: <br/> <span className="ml-10">If you're unsure about an answer, you can mark the question for review and return to it later.</span></p>
            <p>5. Technical Support Information: <br/> <span className="ml-10">If you encounter any technical issues during the exam, please raise your hand or contact the invigilator for assistance.</span></p>
            <p>6. Academic Integrity Reminder: <br/> <span className="ml-10">Maintain academic integrity throughout the exam. Any form of cheating or unauthorized assistance is strictly prohibited.</span></p>
            <p>7. Exam Duration Notice: <br/> <span className="ml-10">Once the exam starts, it cannot be paused or extended. Ensure that you manage your time effectively to complete all questions.</span></p>
          </div>
        </>
      }
      navClick={handleLogin} onClick={() => setShowModal(false)}
      buttons={<Button title="Start Test" btnStyles="mt-10 px-4 py-3 bg-primary rounded-lg text-white w-fit" btnClick={handleLogin} />}
      />}
      {/* {setError && <Modal content={logerror} />} */}
    </div>
  );
}