import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Chart } from "../../../components/user/Chart";
import user from "../../../assets/user.png";
import subscription from "../../../assets/sub.png";
import examinee from "../../../assets/examinee.png";
import { OverviewCard } from "../../../components/admin/OverviewCard";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { materialStorage } from "../../../../config";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";

export const AdminOverview = () => {
  const {
    users,
    materials,
    questions,
    setUsers,
    setMaterials,
    setQuestions,
    isLoggedIn,
    checkedInUsers,
    subscribers,
    setSubscribers,
    results,
    setResults,
    setUserResults,
  } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const cards = [
    {
      icon: user,
      value: users.length,
      label: "Total Users",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      iconBgColor: "bg-green-500",
      iconTextColor: "text-white",
    },
    {
      icon: subscription,
      value: 0,
      label: "Total Subscriptions",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      iconBgColor: "bg-green-500",
      iconTextColor: "text-white",
    },
    {
      icon: examinee,
      value: checkedInUsers.length,
      label: "Total Examinees",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      iconBgColor: "bg-blue-500",
      iconTextColor: "text-white",
    },
  ];

  const allMaterialsRef = ref(materialStorage, "materials/");

  useEffect(() => {
    if (
      users.length !== 0 ||
      materials.length !== 0 ||
      questions.length !== 0
    ) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (isLoggedIn) {
      setIsLoading(true);
      axios
        .get("https://ncs-cbt-api.onrender.com/admin/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      const getMaterials = async () => {
        const res = await listAll(allMaterialsRef);
        let newMaterials = [];

        for (const item of res.items) {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          const coverImageUrl = metadata.customMetadata.materialCover;

          newMaterials.push({
            url: url,
            materialDetails: metadata,
            coverImage: coverImageUrl,
          });
          setMaterials(newMaterials);
        }
      };
      getMaterials();

      axios
        .get("https://ncs-cbt-api.onrender.com/exam/", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        .then((res) => {
          setQuestions(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("https://ncs-cbt-api.onrender.com/admin/getAllSubscribers", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          setSubscribers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("https://ncs-cbt-api.onrender.com/admin/getScores", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          setResults(res.data.data);
          setUserResults(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/admin");
    }
  }, []);

  console.log(
    users,
    "users",
    materials,
    "materials",
    questions,
    "questions",
    subscribers,
    "subscribers",
    results,
    "results"
  );

  // const sortedMaterials = materials.sort((a, b) => b.rating - a.rating);

  // Get the top 4 materials with the highest rating
  const topMaterials = materials.slice(0, 4);

  if (isLoading) {
    return (
      <div className="bg-cardgreen absolute inset-0 flex items-center justify-center mx-auto">
        <div className="rounded-full w-52 h-52 animate-bounce border-8 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-10">
      <Header title="Dashboard" />
      <main className="flex-grow mt-4">
        <div className="flex flex-col md:flex-row md:justify-around justify-center items-center gap-6 md:p-5">
          {cards.map((card, index) => (
            <div key={index} className="w-2/3 md:w-fit">
              <OverviewCard
                cardStyles="flex justify-center p-6"
                label={card.label}
                cardValue={card.value}
                icon={
                  <>
                    <img className="w-10" src={card.icon} alt={card.icon} />
                  </>
                }
              />
            </div>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="md:text-xl font-bold mb-4">Test Overview</h2>
          <div className="bg-white">
            <Chart />
          </div>
        </section>
      </main>
    </div>
  );
};
