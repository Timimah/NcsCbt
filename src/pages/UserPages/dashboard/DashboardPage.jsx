import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { materials } from "../../../components/user/materials";
import { Button } from "../../../components/shared/Button";
import quiz from "../../../assets/quiz.png";
import { Modal } from "../../../components/shared/Modal";
import { Chart } from "../../../components/user/Chart";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const DashboardPage = ({ title, username }) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn,
    setMaterials,
    materials,
    setLoggedInUser,
    setIsLoggedIn,
    setUserIsUser,
    setLoggedInUserId,
    setLoggedInUserEmail,
    setLoggedInUserPhoneNumber,
    setLoggedInUserRank, } = useUserStore();
  // console.log(isLoggedIn)
  const navigate = useNavigate();
  const topMaterials = materials.slice(0, 4);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (isLoggedIn) {
      axios.get("https://ncs-cbt-api.onrender.com/material/", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          setMaterials(res.data.data)
          console.log(materials)
        })
        .catch((err) => {
          console.log(err)
        })

    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col w-full p-10">
      <Header title="Dashboard" />
      <main className="flex-grow">
        <section>
          <h2 className="text-lg mb-4 text-darkgrey font-semibold">Top Materials to Read</h2>
          <div className="grid grid-cols-2 justify-center md:grid-cols-4 gap-4">
            {topMaterials.map((material) => (
              <div key={material._id} className="p-4 text-darkgrey w-full">
                <img
                  src={material.name}
                  alt={material.name}
                  className="w-full h-40 object-cover rounded-md mb-2 bg-grey"
                />
                <h3 className="mb-1">{material.name}</h3>
                <div className="text-xs"> Rank: {material.rank}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-yellow rounded-lg p-10 mt-8 flex md:flex-row flex-col-reverse gap-6 items-center justify-between">
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:text-left md:justify-start">
            <h2 className="text-2xl md:text-3xl mb-4">Take Quiz to Test Your Knowledge</h2>
            <Button
              title="Take Exam"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md md:w-fit"
              btnClick={() => navigate("/dashboard/practice")}
            />
          </div>
          <img className="object-contain" src={quiz} alt="Quiz" />
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Test Overview</h2>
          <div className="bg-white">
            <Chart />
          </div>
        </section>
      </main>
    </div>
  );
};
