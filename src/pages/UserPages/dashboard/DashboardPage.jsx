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

      // axios.get("https://ncs-cbt-api.onrender.com/users/dashboard", {
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //     "Content-Type": "application/json"	
      //   }
      // })
      //   .then((res) => {
      //     console.log(res)
          // setMaterials(res.data.data)
          // console.log(u)
          // setLoggedInUser(user.fullName);
          // setIsLoggedIn(true);
          // setUserIsUser(true);
          // setLoggedInUserEmail(user.email);
          // setLoggedInUserId(user.examineeId);
          // setLoggedInUserPhoneNumber(user.phoneNumber);
          // setLoggedInUserRank(user.rank);
        // })
        // .catch((err) => {
        //   console.log(err)
        // })

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
          <div className="grid grid-cols-4 gap-4">
            {topMaterials.map((material) => (
              <div key={material._id} className="p-4 text-darkgrey">
                <img
                  src={material.name}
                  alt={material.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="mb-1">{material.name}</h3>
                <div className="text-xs"> Rank: {material.rank}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-yellow rounded-lg p-6 mt-8 flex items-center justify-center">
          <div className="w-1/2 flex flex-col gap-4 text-left">
            <h2 className="text-3xl mb-4">Take Quiz to Test Your Knowledge</h2>
            <Button
              title="Take Exam"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md w-fit"
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
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          title="Quiz Settings"
          content={
            <div className="text-left mt-4">
              <div>
                <label className="block py-1 -mb-1">Number of Questions</label>
                <input
                  type="tel"
                  className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
                  placeholder="30"
                />
                <p className="text-sm mt-2 px-2 hidden text-gray-600">
                  Text helper
                </p>
              </div>
              <div>
                <label className="block py-1 -mb-1">Set Time</label>
                <input
                  type="text"
                  className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
                  placeholder="5 min"
                />
                <p className="text-sm mt-2 px-2 hidden text-gray-600">
                  Text helper
                </p>
              </div>
              <div>
                <label className="block py-1 -mb-1">Select Rank</label>
                <input
                  type="text"
                  className="border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary"
                  placeholder="Select Rank"
                />
                <p className="text-sm mt-2 px-2 hidden text-gray-600">
                  Text helper
                </p>
              </div>
            </div>
          }
          modStyles="w-1/3 h-fit bg-secondary text-center"
          buttons={
            <Button
              title="Start Quiz"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4 w-full"
              btnClick={() => setShowModal(false)}
            />
          }
        />
      )}
    </div>
  );
};
