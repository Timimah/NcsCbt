import { useEffect, useState } from "react";
import { MyRoutes } from "./router/MyRoutes";
import { useUserStore } from "./store/userStore";
import axios from "axios";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { imageStorage, materialStorage } from "../config";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nextRank, setNextRank] = useState("");
  const [userRank, setUserRank] = useState(nextRank);
  const [userData, setUserData] = useState(null);

  // userDashboard requests
  const {
    setUserMaterials,
    setUserImage,
    setExamQuestions,
    examQuestions,
    loggedInUser,
    userIsUser,
    setUserIsSubscribed,
    loggedInUserRank,
    setUsers,
    userIsAdmin,
    setMaterials,
    setQuestions,
    setSubscribers,
    setResults,
    setUserResults,
    loggedInUserId,
    userImage,
  } = useUserStore();

  const allMaterialsRef = ref(materialStorage, "materials/");
  const imageRef = ref(materialStorage, "images/");
  const path = window.location.pathname;

  const setRank = () => {
    if (loggedInUserRank === "CAI") {
      setNextRank("CAII");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "CAII") {
      setNextRank("AIC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "AIC") {
      setNextRank("IC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "IC") {
      setNextRank("ASCII");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "ASCII") {
      setNextRank("ASCI");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "ASCI") {
      setNextRank("DSC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "DSC") {
      setNextRank("SC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "SC") {
      setNextRank("CSC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "CSC") {
      setNextRank("AC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "AC") {
      setNextRank("DC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    } else if (loggedInUserRank === "DC") {
      setNextRank("CC");
      setUserRank(`${loggedInUserRank}-${nextRank}`);
    }
  };

  useEffect(() => {
    if (userIsUser) {
      setIsLoading(true)
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clear the timer when the component unmounts
      const token = localStorage.getItem("auth-token");
      const getMaterials = async () => {
        setIsLoading(true);
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
          setUserMaterials(newMaterials);
          setIsLoading(false);
        }
      };
      getMaterials();

      const fetchUserImage = async () => {
      setUserImage("")
        // List all files in Firebase Storage
        const res = await listAll(imageRef);
        res.items.forEach((item) => {
          // Get metadata for each file
          getMetadata(item).then((metadata) => {
            // Check if the userId in the metadata matches the current user's ID
            if (metadata.customMetadata) {
              // alert();
              if (metadata.customMetadata.userId === loggedInUserId) {
                getDownloadURL(item)
                  .then((url) => {
                    setUserImage(url);
                  })
                  .catch((error) => {
                    if (error) {
                    setUserImage("")
                    console.error("Error getting image URL: ", error);
                    }
                  });
              }
            }
          });
        });
      };

      fetchUserImage();

      axios
        .get("https://ncs-cbt-api.onrender.com/exam/getExamQuestions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserIsSubscribed(true);
          setExamQuestions(res.data.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setUserIsSubscribed(false);
          }
        });
    }
    if (userIsAdmin) {
      const token = localStorage.getItem("auth-token");
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
          const data = res.data.data;
          setUsers(data);
        })
        .catch((err) => {
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
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          setQuestions(data);
          setIsLoading(false);
        })
        .catch((err) => {
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
          const data = res.data.data;
          setSubscribers(data);
        })
        .catch((err) => {
        });

      axios
        .get("https://ncs-cbt-api.onrender.com/admin/getScores", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          const data = res.data.data;
          setResults(data);
          setRank();
          const filteredUserResults = res.data.data.filter(
            (result) => result.questionCategory === userRank
          );

          setUserResults(filteredUserResults);
        })
        .catch((err) => {
        });
    }
  }, [userIsAdmin, userIsUser]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0">
      {isLoading && (
        <div className="bg-cardgreen absolute inset-0 flex items-center justify-center mx-auto">
          <div className="rounded-full w-32 h-32 md:w-52 md:h-52 animate-bounce border-8 border-secondary"></div>
        </div>
      )}
      {!isLoading && <MyRoutes />}
    </div>
  );
};

export default App;
