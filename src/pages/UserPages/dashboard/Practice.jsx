import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/shared/Modal";
import { Button } from "../../../components/shared/Button";
import { Header } from "../../../components/shared/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";

export const Practice = () => {
  const navigate = useNavigate();
  const { questions, setQuestions } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [rank, setRank] = useState("");
  const [time, setTime] = useState(60);
  const [error, setError] = useState("");
  const [allQuestions, setAllQuestions] = useState();
  const token = localStorage.getItem("auth-token");
  let practiceQuestions;

  const getQuestions = () => {
    if (allQuestions.length > 0) {
      practiceQuestions = allQuestions.questionDetails.filter(
        (question) => question.category === rank
      );
      console.log(practiceQuestions);
    } else {
      practiceQuestions = [];
    }
    localStorage.setItem(
      "practiceQuestions",
      JSON.stringify(practiceQuestions)
    );
  };

  useEffect(() => {
    console.log("Practice Page");
    setShowModal(true);
    // getQuestions();
  }, []);

  const getPracticeQuestions = async () => {
    if (!time) {
      setError("Please select a time");
    }
    if (!rank) {
      setError("Please select a category");
    } else {
      console.log(rank);
      axios
        .post(
          "https://ncs-cbt-api.onrender.com/exam/getPracticeQuestions",
          { rank },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setQuestions(res.data.data);
          setAllQuestions(questions);
          console.log(questions, "Questions", allQuestions, "All Questions");
      localStorage.setItem("practiceQuestionsDetails", JSON.stringify({ rank, time }));
          setShowModal(false);
          setShowInstructions(true);
          // const questionsForSelectedCategory =
          //     questions.filter(
          //         (question) =>
          //             question.category === selectedCategory
          //     );
          // console.log(
          //     questions,
          //     questionsForSelectedCategory
          // );
          // setEditQuestions(
          //     questionsForSelectedCategory
          // );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex items-center justify-center px-8">
      <Header title="Practice" />
      {showModal && (
        <Modal
          title="Quiz Settings"
          closeModal={() => setShowModal(false)}
          modStyles="bg-secondary md:w-1/2 h-fit"
          content={
            <div className="my-10">
              <div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <label htmlFor="time">Set Time (minutes)</label>
                <input
                  type="tel"
                  id="time"
                  value={time}
                  className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
                  placeholder="5 min"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="rank" className="block py-1 -mb-1">
                  Select Rank
                </label>
                <select
                  id="rank"
                  name="rank"
                  value={rank}
                  onChange={(e) => {
                    setRank(e.target.value);
                    setError("");
                  }}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="CAI-CAII">CAI-CAII</option>
                  <option value="CAII-AIC">CAII-AIC</option>
                  <option value="AIC-IC">AIC-IC</option>
                  <option value="IC-ASCII">IC-ASCII</option>
                  <option value="ASCII-ASCI">ASCII-ASCI</option>
                  <option value="ASCI-DSC">ASCI-DSC</option>
                  <option value="DSC-SC">DSC-SC</option>
                  <option value="SC-CSC">SC-CSC</option>
                  <option value="CSC-AC">CSC-AC</option>
                  <option value="AC-DC">AC-DC</option>
                  <option value="DC-CC">DC-CC</option>
                </select>
              </div>
            </div>
          }
          buttons={
            <Button
              title="Start Quiz"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full"
              btnClick={getPracticeQuestions}
            />
          }
        />
      )}
      {showInstructions && (
        <Modal
          title="Instructions"
          closeModal={() => setShowInstructions(false)}
          modStyles="bg-secondary w-full h-full my-10 overflow-y-scroll"
          content={
            <div className="rounded-lg p-8 mx-auto relative">
              <p className="mb-4">
                Welcome to the NCS CBT platform. Please read the following
                instructions carefully before starting the exam.
              </p>
              <p className="mb-4">
                Before proceeding, ensure that your computer and internet
                connection are working properly. Click on the 'System Check'
                button to verify.
              </p>
              <ol className="list-decimal list-inside mb-4">
                <li>
                  <strong>Time Reminder:</strong>{" "}
                  <span className="font-normal">
                    You will have {time} minutes to complete the exam. A timer
                    will be displayed on the screen to help you manage your time
                    effectively.
                  </span>
                </li>
                <li>
                  <strong>Navigation Instructions:</strong>{" "}
                  <span className="font-normal">
                    Use the navigation buttons provided to move between
                    questions. You can go back and forth as needed.
                  </span>
                </li>
                <li>
                  <strong>Answering Format:</strong>{" "}
                  <span className="font-normal">
                    Answer each question by selecting the appropriate option.
                  </span>
                </li>
                <li>
                  <strong>Marking for Review:</strong>{" "}
                  <span className="font-normal">
                    If you're unsure about an answer, you can mark the question
                    for review and return to it later.
                  </span>
                </li>
                <li>
                  <strong>Technical Support Information:</strong>{" "}
                  <span className="font-normal">
                    If you encounter any technical issues during the exam,
                    please raise your hand or contact the invigilator for
                    assistance.
                  </span>
                </li>
                <li>
                  <strong>Academic Integrity Reminder:</strong>{" "}
                  <span className="font-normal">
                    Maintain academic integrity throughout the exam. Any form of
                    cheating or unauthorized assistance is strictly prohibited.
                  </span>
                </li>
                <li>
                  <strong>Exam Duration Notice:</strong>{" "}
                  <span className="font-normal">
                    Once the exam starts, it cannot be paused or extended.
                    Ensure that you manage your time effectively to complete all
                    questions.
                  </span>
                </li>
              </ol>
            </div>
          }
          buttons={
            <Button
              title="Start Exam"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4 w-fit mx-auto"
              btnClick={() => {
                setShowInstructions(false);
                navigate("/take-exam");
              }}
            />
          }
        />
      )}
    </div>
  );
};
