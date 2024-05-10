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
  const [timeRemaining, setTimeRemaining] = useState();
  // const [duration, setDuration] = useState();
  const [showModal, setShowModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [score, setScore] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [answer, setAnswer] = useState();

  let timer;
  let quizDetails;
  const quizType = localStorage.getItem("type");
  // console.log(quizType)

  useEffect(() => {
    if (quizType === "practice") {
      quizDetails = JSON.parse(localStorage.getItem("practiceQuestionsDetails"));
    } else {
      quizDetails = JSON.parse(localStorage.getItem("examQuestionsDetails"));
    }
    console.log(quizDetails);
    // setAnswers([]);
    setTimeRemaining(quizDetails.time * 60);
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
    console.log(selectedAnswers);
    setReviewing(false);
    const practiceData = {
      answers: selectedAnswers,
      userId: loggedInUserId,
      type: "practice",
      date: new Date().toLocaleDateString(),
    };
    console.log(practiceData);
    try {
      const response = await axios.post(
        "https://ncs-cbt-api.onrender.com/exam/mark",
        practiceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      setResultModal(true);
      setScore(response.data.message);
      setAnswer(response.data.data);
      console.log(answer);
      // navigate('/dashboard/result')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col bg-vector w-full bg-white h-full transform transition-all duration-300">
      <div className="flex justify-between items-center p-8 w-full">
        <div className="flex items-center">
          <Button
            title={<img className="w-6" src={back} alt="back" />}
            btnStyles="py-4 px-4"
            btnClick={() => {
              if (
                confirm(
                  "All your progress will be lost, are you sure you want to go back?",
                ) === true
              ) {
                window.history.back();
              }
            }}
            disable={quizType === "exam"}
          />
        </div>
        {
          quizType === "practice" ? <Header title="Practice" /> : <Header title="Exam" />
        }
      </div>
      {reviewing === true && (
        <div className="absolute top-32 bottom-0 left-0 right-0 z-20 bg-white p-10 flex flex-col overflow-y-scroll">
          <div className="flex text-2xl font-bold">Review Questions</div>
          <div className="my-6 flex flex-col gap-6">
            {questions.map((question, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="font-bold text-lg">Question {index + 1}</div>
                <div className="text-lg">{question.question}</div>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`${answer[index].correctAnswer === option ? "bg-secondary" : ""} flex`}
                  >
                    <span className="mr-3">
                      {String.fromCharCode(65 + index)}.{" "}
                    </span>
                    <div>{option}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-8 justify-between items-center w-full px-10">
        <div className="md:w-1/2 md:px-8 px-4 flex flex-col mb-10 gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div className="text-3xl">Question {currentQuestion + 1}</div>
              <div
                className={`text-3xl font-bold px-4 py-3 ${timeRemaining <= 300 ? "animate-pulse text-red-600 bg-transparent" : "text-white bg-red-600"}`}
              >
                {Math.floor(timeRemaining / 60)}:
                {(timeRemaining % 60).toString().padStart(2, "0")}
              </div>
            </div>
            <div className="font-semibold text-lg">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-center rounded-lg px-4 py-3 cursor-pointer border border-primary text-primary font-bold  ${answers[currentQuestion] === option
                  ? "bg-primary text-white"
                  : ""
                  }`}
                onClick={() =>
                  handleOptionChange(option, questions[currentQuestion].id)
                }
              >
                <span className="mr-3">
                  {String.fromCharCode(65 + index)}.{" "}
                </span>
                {option}
              </div>
            ))}
          </div>
          <div className="flex md:flex-row flex-col md:justify-evenly gap-8" id="navButton">
            <Button
              title={
                <div className="flex px-4 gap-1 items-center">
                  <img src={prev} className="" alt="" />
                  <span>Previous</span>
                </div>
              }
              btnStyles={`text-lg bg-secondary shadow-md px-4 rounded-lg w-full ${currentQuestion == 0 ? "text-gry bg-gray" : "text-primary"
                }`}
              btnClick={handlePrevious}
              disable={currentQuestion === 0}
            />
            {currentQuestion === questions.length - 1 ? (
              <Button
                title="Submit"
                btnStyles="bg-primary text-white text-lg rounded-lg shadow-md px-4 w-full"
                btnClick={handleSubmit}
              />
            ) : (
              <Button
                title={
                  <div className="flex px-4 py-3 gap-1 items-center">
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
        <div className="md:flex flex-col gap-8 w-1/2 hidden">
          <div className="bg-secondary shadow-md rounded-lg py-10 items-center justify-center p-8 flex flex-col gap-8">
            <div
              className={`${timeRemaining <= 300 ? "bg-transparent text-primary" : "bg-primary text-white"} rounded-full p-6 w-24 h-24 text-center flex flex-col justify-center items-center`}
            >
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
            <span className="text-xl">Quit </span>
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
              <Button
                title="Yes, Quit"
                btnClick={() => navigate("/dashboard/result")}
                btnStyles="bg-yellow text-primary px-4 py-3 rounded-md"
              />
              <Button
                title="No, Continue"
                btnClick={() => setShowModal(false)}
                btnStyles="bg-primary text-white px-4 py-3 rounded-md"
              />
            </div>
          }
          closeModal={() => setShowModal(false)}
        />
      )}
      {resultModal && (
        <Modal
          content={
            <div className="text-primary font-bold text-2xl text-center my-4">
              {score}
            </div>
          }
          modStyles="w-1/2 my-auto justify-center bg-secondary"
          closeModal={() => setResultModal(false)}
          buttons={
            <div className="flex justify-between w-full p-4 my-4">
              <Button
                title="Back to Dashboard"
                btnClick={() => navigate("/dashboard/result")}
                btnStyles="border border-primary text-primary px-4 py-3 rounded-md"
              />
              <Button
                title="Review Questions"
                btnClick={() => {
                  console.log(showModal);
                  setResultModal(false);
                  setReviewing(true);
                }}
                btnStyles="bg-primary text-white px-4 py-3 rounded-md"
              />
            </div>
          }
        />
      )}
    </section>
  );
};
