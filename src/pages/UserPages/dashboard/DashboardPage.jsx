import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import quiz from "../../../assets/quiz.png";
import { Modal } from "../../../components/shared/Modal";
import { Chart } from "../../../components/user/Chart";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { imageStorage, materialStorage } from "../../../../config";

export const DashboardPage = ({ title, username }) => {
  const { isLoggedIn, setUserMaterials, userMaterials, setExamQuestions, examQuestions, loggedInUser, userImage, setUserImage } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const topMaterials = userMaterials.slice(0, 4);
  const allMaterialsRef = ref(materialStorage, "materials/");
  console.log(loggedInUser, "logged in user")
  const avatarRef = ref(imageStorage, `images/${loggedInUser}`);
  const token = localStorage.getItem("auth-token");
  console.log(userMaterials)

  useEffect(() => {
    if (isLoggedIn) {
      const getMaterials = async () => {
        setIsLoading(true);
        const res = await listAll(allMaterialsRef)
        let newMaterials = [];
        for (const item of res.items) {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          const coverImageUrl = metadata.customMetadata.materialCover;
          newMaterials.push({ url: url, materialDetails: metadata, coverImage: coverImageUrl });
          setUserMaterials(newMaterials);
          setIsLoading(false);
        }
      }
      getMaterials()

      // const getUserAvatar = async () => {
      //   const res = await listAll(avatarRef)
  
      //   for (const item of res.items) {
      //     const metadata = await getMetadata(item);
      //     console.log(metadata)
      //     const imageUrl = metadata.customMetadata.imageUrl;
  
      //     setUserImage(imageUrl);
      //     console.log(userImage, "user image")
      //   }
      // }
      //   getUserAvatar()

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

    } else {
      navigate("/login");
    }
  }, []);

  if (isLoading) {
    return <div className="bg-cardgreen absolute inset-0 flex items-center justify-center mx-auto">
      <div className="rounded-full w-52 h-52 animate-bounce border-8 border-secondary"></div>
    </div>;
  }


  return (
    <div className="flex flex-col w-full p-10">
      <Header title="Dashboard" />
      <main className="flex-grow">
        <section>
          <h2 className="text-xl mb-4 font-semibold">Top Materials to Read</h2>
          <div className="grid grid-cols-2 justify-center md:grid-cols-4 gap-4">
            {userMaterials.length >= 4 ? topMaterials.map((material, index) => (
              <div key={index} className="p-4 text-darkgrey w-full">
                <img
                  src={material.materialDetails.customMetadata.materialCover}
                  alt={material.materialDetails.customMetadata.name}
                  className="w-full h-32 object-cover border-4 border-yellow rounded-md mb-2 bg-grey"
                />
                <h3 className="mb-1">{material.materialDetails.customMetadata.name}</h3>
                <div className="text-xs"> Rank: {material.materialDetails.customMetadata.rank}</div>
              </div>
            )) : <p className="h-40 col-span-4 rounded-md shadow-md bg-grey animate-pulse"></p>
            }
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
