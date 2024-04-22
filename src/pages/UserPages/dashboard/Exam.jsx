import axios from "axios";
import React, { useEffect } from "react";
import { Header } from "../../../components/shared/Header";

export const ExamPage = () => {
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    console.log("Exam Page");
    axios
      .get(
        "http://localhost:5000/exam/getExamQuestions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col w-full p-10">
      <Header title="Exam" />
    </div>
  );
};
