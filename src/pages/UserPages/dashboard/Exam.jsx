import axios from "axios";
import React, { useEffect } from "react";
import { Header } from "../../../components/shared/Header";
import { useUserStore } from "../../../store/userStore";

export const ExamPage = () => {
  const { examQuestions, setExamQuestions } = useUserStore();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    console.log("Exam Page");
    axios.get("https://ncs-cbt-api.onrender.com/exam/getExamQuestions", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res)
      setExamQuestions(res.data.data)
      console.log(examQuestions)
    }).catch((err) => {
      console.log(err)
    })
  }, []);
  return (
    <div className="flex flex-col w-full p-10">
      <Header title="Exam" />
    </div>
  );
};
