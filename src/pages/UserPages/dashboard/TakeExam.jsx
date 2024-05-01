import React, { useEffect, useState } from "react";
// import { questions } from "../../../components/shared/questions";
import back from "../../../assets/back.png";
import quit from "../../../assets/quit.png";
import next from "../../../assets/next.png";
import prev from "../../../assets/prev.png";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";
import { Header } from "../../../components/shared/Header";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";

export const TakeExam = () => {
  const navigate = useNavigate();
  const { loggedInUserId, questions } = useUserStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(); // 10 minutes in seconds
  const [showModal, setShowModal] = useState(false);
  // const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("questions")).questionDetails || []);
  let timer;

  useEffect(() => {
    const quizDetails = JSON.parse(localStorage.getItem("practiceQuestionsDetails"));
    // setAnswers([]);
    setTimeRemaining(quizDetails.time * 60)
    timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Stop the timer when timeRemaining reaches 0
          handleSubmit(); // Call the handleSubmit function when the timer ends
          return 0; // Set timeRemaining to 0 to prevent negative values
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleSubmit();
      // setShowModal(true);
    }
  }, [timeRemaining]);

  // const handleOptionChange = (value) => {
  //   setAnswered(true);
  //   setAnswers((prevAnswers) => [
  //     ...prevAnswers.slice(0, currentQuestion),
  //     value,
  //     ...prevAnswers.slice(currentQuestion + 1),
  //   ]);
  //   setSelectedAnswers((prevSelectedAnswers) => {
  //     const newSelectedAnswers = [...prevSelectedAnswers];
  //     newSelectedAnswers[currentQuestion] = value;
  //     return newSelectedAnswers;
  //   });
  //   console.log(answers, selectedAnswers);
  // };

  const handleOptionChange = (value, questionId) => {
    setAnswered(true);
    const answer = value;
    const question_Id = questionId;
    setAnswers((prevAnswers) => [
          ...prevAnswers.slice(0, currentQuestion),
          value,
          ...prevAnswers.slice(currentQuestion + 1),
        ]);
    const newAnswer = { answer, question_Id };
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[currentQuestion] = newAnswer;
      return newSelectedAnswers;
    });
    console.log(answers, selectedAnswers);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const token = localStorage.getItem("auth-token");

  const handleSubmit = async () => {
    // setShowModal(true);
    console.log(selectedAnswers);
    const practiceData = {
      "answers": selectedAnswers,
      "userId": loggedInUserId,
      "type": "practice",
      "date": new Date().toLocaleDateString(),
    };
    console.log(practiceData);
    try {
      const response = await axios.post(
        "https://ncs-cbt-api.onrender.com/exam/mark",
        practiceData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      )
      console.log(response);
      // navigate('/dashboard/result')
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col bg-vector w-full bg-white h-full transform transition-all duration-300">
      <div className="flex justify-between items-center p-8 w-full">
        <div className="flex items-center">
          <Button
            title={<img className="w-6" src={back} alt="back" />}
            btnStyles="py-4 px-4"
            btnClick={() => {
              if ((confirm("All your progress will be lost, are you sure you want to go back?")) === true) {
                window.history.back()
              }
            }}
          />
        </div>
        <Header title="Quiz" />
      </div>
      <div className="flex gap-8 justify-between items-center h-full w-full px-10">
        <div className="w-1/2 px-8 flex flex-col h-full gap-8 self-start">
          <div className="flex flex-col gap-8">
            <div className="text-lg">Question {currentQuestion + 1}</div>
            <div className="font-bold text-lg">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-center rounded-lg px-4 py-3 cursor-pointer border border-primary text-primary text-lg font-bold  ${answers[currentQuestion] === option
                    ? "bg-primary text-white"
                    : ""
                  }`}
                onClick={() => handleOptionChange(option, questions[currentQuestion].id)}
              >
                <span className="mr-3">{String.fromCharCode(65 + index)}. </span>
                {option}
              </div>
            ))}
          </div>
          <div className="flex justify-evenly gap-8" id="navButton">
            <Button
              title={
                <div className="flex gap-1 items-center">
                  <img src={prev} className="" alt="" />
                  <span>Previous</span>
                </div>
              }
              btnStyles={`text-lg bg-secondary shadow-md px-4 py-3 rounded-lg w-full ${currentQuestion == 0 ? "text-gry bg-gray" : "text-primary"
                }`}
              btnClick={handlePrevious}
              disable={currentQuestion === 0}
            />
            {currentQuestion === questions.length - 1 ? (
              <Button
                title="Submit"
                btnStyles="bg-primary text-white text-lg rounded-lg shadow-md py-3 px-4 w-full"
                btnClick={handleSubmit}
              />
            ) : (
              <Button
                title={
                  <div className="flex gap-1 items-center">
                    <img src={next} className="" alt="" />
                    <span>Next</span>
                  </div>
                }
                btnStyles={`text-lg bg-primary shadow-md px-4 py-3 rounded-lg w-full text-white
                        ${currentQuestion === questions.length - 1
                    ? "hidden"
                    : ""
                  }`}
                btnClick={handleNext}
              // disabled={currentQuestion === questions.length - 1}
              />
            )}
          </div>
        </div>
        <div className=" md:flex flex-col gap-8 w-1/2 hidden ">
          <div class="bg-secondary shadow-md rounded-lg py-10 items-center justify-center p-8 flex flex-col gap-8">
            <div className={`${timeRemaining <= 300 ? "bg-transparent text-primary" : "bg-primary text-white"} rounded-full p-6 w-24 h-24 text-center flex flex-col justify-center items-center`}>
              <div>Timer</div>
              <div
                className={`text-2xl font-bold ${timeRemaining <= 300 ? "text-red-500 animate-pulse" : ""
                  }`}
              >
                {Math.floor(timeRemaining / 60)}:
                {(timeRemaining % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-10 gap-4 place-items-center">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  title={index + 1}
                  btnStyles={`border ${currentQuestion === index ? "border border-primary" : ""}  ${selectedAnswers[index] ? "bg-primary text-white" : "bg-white "} text-primary rounded shadow-md w-10 h-10`}
                  btnClick={(e) => setCurrentQuestion(index)}
                />
              ))}
            </div>
          </div>
          <div
            className="flex gap-2 text-gray-600 cursor-pointer hover:text-primary"
            onClick={() => setShowModal(true)}
          >
            <img src={quit} alt="quit" />
            <span>Quit Test</span>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          content={
            <div className="text-primary font-bold text-2xl text-center my-4">
              Are you sure you want to quit?
            </div>
          }
          modStyles="w-1/2 my-auto justify-center bg-secondary"
          buttons={
            <div className="flex justify-between w-full p-4 my-4">
              <Button title="Yes, Quit"
              btnClick={() => navigate('/dashboard/result')}
              btnStyles="bg-yellow text-primary px-4 py-3 rounded-md"
              />
              <Button
                title="No, Continue"
                btnClick={() => setShowModal(false)}
                btnStyles="bg-primary text-white px-4 py-3 rounded-md"
              />
            </div>
          }
        />
      )}
    </section>
  );
};
