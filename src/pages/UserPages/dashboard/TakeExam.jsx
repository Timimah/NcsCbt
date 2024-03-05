import React, { useEffect, useState } from 'react'
import { questions } from '../../../components/shared/questions'
import back from '../../../assets/back.png'
import quit from '../../../assets/quit.png'
import next from '../../../assets/next.png'
import prev from '../../../assets/prev.png'
import { Button } from '../../../components/shared/Button';
import { Modal } from '../../../components/shared/Modal'
// import { Modal } from '../../components/shared/Modal';

export const TakeExam = () => {
     const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [showModal, setShowModal] = useState(false);
useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setShowModal(true);
    }
  }, [timeRemaining]);

  const handleOptionChange = (value) => {
    setAnswers((prevAnswers) => [...prevAnswers.slice(0, currentQuestion), value]);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleSubmit = () => {
    // setShowModal(true);
    console.log(answers);
  };

    return (
        <section className='flex flex-col bg-vector w-full bg-white h-full transform transition-all duration-300'>
            <div className='flex justify-between items-center p-8 w-full'>
                <div className='flex items-center'>
                    <Button title={<img className='w-6' src={back} alt="back" />} btnStyles='py-4 px-4' btnClick={() => window.history.back()} />
                    Quiz
                </div>
                <div className='flex items-center'>
                    <img
                        class="relative mr-4 inline-block h-12 w-12 rounded-lg object-cover object-center"
                        alt="Image placeholder"
                        src="https://www.material-tailwind.com/img/face-2.jpg"
                    />
                    <div>Ajani Ben</div>
                </div>
            </div>
            <div className='flex gap-8 justify-between items-center h-full w-full px-10'>
                <div className="w-1/2 px-8 flex flex-col h-full gap-8 self-start">
                    <div className="flex flex-col gap-8">
                        <div className='text-lg'>Question {currentQuestion + 1}</div>
                        <div className='font-bold text-lg'>{questions[currentQuestion].question}</div>
                    </div>
                    <div className='grid grid-cols-2 gap-6 mb-8'>
                            {questions[currentQuestion].options.map((option, index) => (
                                <div
                                key={index}
                                className={`flex items-center justify-center rounded-lg px-4 py-3 cursor-pointer border border-primary text-primary text-lg font-bold  ${
                                answers[currentQuestion] === option.value
                                    ? 'bg-primary text-white'
                                    : ''
                                }`}
                                onClick={() => handleOptionChange(option.value)}
                            >
                                {option.label}
                            </div>
                            ))}
                    </div>
                    <div className='flex justify-evenly gap-8' id="navButton">
                        <Button 
                        title={
                        <div className='flex gap-1 items-center'>
                            <img src={prev} className="" alt="" />
                            <span>Previous</span>
                        </div>
                        }
                     btnStyles={`text-lg bg-secondary shadow-md px-4 py-3 rounded-lg w-full text-primary ${currentQuestion == 0 ? "text-gray-400" : ""}`}
                     btnClick={handlePrevious}
                    //  disabled={currentQuestion === 0}
                     />
                    {currentQuestion === questions.length - 1 ?
                    (<Button title="Submit" btnStyles="bg-primary text-white text-lg rounded-lg shadow-md py-3 px-4 w-full" btnClick={handleSubmit} />) :
                    (<Button
                        title={<div className='flex gap-1 items-center'>
                                <img src={next} className="" alt="" />
                                <span>Next</span>
                                </div>
                            }
                        btnStyles={`text-lg bg-primary shadow-md px-4 py-3 rounded-lg w-full text-white
                        ${currentQuestion === questions.length - 1 ? "hidden" : ""}`}
                        btnClick={handleNext}
                        // disabled={currentQuestion === questions.length - 1}
                        />)}
                    </div>
                </div>
                <div className=" md:flex flex-col gap-8 w-1/2 hidden ">
                    <div class="bg-secondary shadow-md rounded-lg py-10 items-center justify-center p-8 flex flex-col gap-8">
                        <div className='bg-primary rounded-full text-white p-6 w-24 h-24 text-center flex flex-col justify-center items-center'>
                            <div>Timer</div>
                            <div
                                className={`text-2xl font-bold ${
                                timeRemaining <= 300 ? 'text-red-800 animate-pulse' : ''
                                }`}
                            >    
                                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                            </div>
                        </div>
                        <div className='hidden md:grid md:grid-cols-5 lg:grid-cols-10 gap-4 place-items-center'>
                            {questions.map((_, index) => (
                                <Button key={index} title={index + 1} id={`questionbtn-${index}`} btnStyles="border bg-white text-primary rounded shadow-md w-10 h-10"
                                    btnClick={() => setCurrentQuestion(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex gap-2 text-gray-600 cursor-pointer hover:text-primary' onClick={() => setShowModal(true)}>
                        <img src={quit} alt="quit" />
                        <span>Quit Test</span>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal 
                content={<div className='text-primary font-bold text-lg'>Are you sure you want to quit?</div>}
                children={<Button title="No, cancel" />}
                btntitle="Yes, Quit"
                modStyles="h-1/2 w-1/2 my-auto self-center"
                buttons={(
                    <div className='flex w-full bg-secondary'>
                        <Button title="Yes, Quit" btnClick=""           />
                    <Button title="No, Continue" btnClick={() => setShowModal(false)} />
                    </div>
            )}
                />
            )}
        </section>
    )
}
// QuizPage.jsx
// import React, { useState, useEffect } from 'react';
// import { questions } from '../../components/shared/questions';

// export const TakeExam = () => {


// //   const questions = [
// //     {
// //       question: 'What is the value of 5 + 7?',
// //       answer: '12',
// //       options: [
// //         { value: '10', label: 'a. 10' },
// //         { value: '12', label: 'b. 12' },
// //         { value: '14', label: 'c. 14' },
// //         { value: '16', label: 'd. 16' },
// //       ],
// //     },
// //     {
// //       question: 'Simplify the expression: 3x + 2x',
// //       answer: '5x',
// //       options: [
// //         { value: '5x', label: 'a. 5x' },
// //         { value: '6x', label: 'b. 6x' },
// //         { value: '7x', label: 'c. 7x' },
// //         { value: '8x', label: 'd. 8x' },
// //       ],
// //     },
// //     // Add more questions here
// //   ];



//   return (
//     <div className="flex h-screen">
//       <div className="w-1/5 bg-gray-200 p-4">
//         {/* Sidebar */}
//         <div className="mb-4">
//           <span
//             className={`text-2xl font-bold ${
//               timeRemaining <= 300 ? 'text-red-500 animate-pulse' : ''
//             }`}
//           >
//             {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
//           </span>
//         </div>
//         {questions.map((_, index) => (
//           <button
//             key={index}
//             className={`w-full py-2 mb-2 ${
//               index === currentQuestion
//                 ? 'bg-blue-500 text-white'
//                 : answers[index]
//                 ? 'bg-green-500 text-white'
//                 : 'bg-gray-300'
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <div className="flex-1 p-4">
//         {/* Content */}
//         <div className="mb-4">
//           <h1 className="text-2xl font-bold">Mathematics Quiz</h1>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-xl font-bold">
            
//           </h2>
//         </div>
//         <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-4">
          
//         </div>
//         <div className="flex justify-between">
//           <button
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             onClick={handlePrevious}
//             disabled={currentQuestion === 0}
//           >
//             Previous
//           </button>
//           <button
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             onClick={currentQuestion === questions.length - 1 ? handleSubmit : handleNext}
//           >
//             {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
//           </button>
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
//               {/* Calculate and display the total score */}
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };