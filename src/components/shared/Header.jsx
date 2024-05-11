import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAdminStore } from '../../store/adminStore';
import { useUserStore } from "../../store/userStore";

export const Header = ({ title }) => {
  const navigate = useNavigate();
  const { loggedInUser, quizActive, userImage } = useUserStore();
  let userName = loggedInUser ? loggedInUser : "";

  useEffect(() => {
    if (userName === "") {
      navigate("/login");
    }
  }, [userName]);


  const handleProfile = () => {
    navigate("/dashboard/user-profile");
  };

  return (
    <header className="py-4 flex justify-between items-center w-full  ">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-darkgrey">{title}</h1>
        <p className="text-sm text-grey">
          Welcome, <span>{userName}</span>
        </p>
      </div>
      <div
        className={`hidden ${quizActive === true ? "md:hidden" : "md:flex"} items-center cursor-pointer`}
        onClick={handleProfile}
      >
        <img
          src={userImage}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div>
          <span className="font-bold text-darkgrey">{userName}</span>
        </div>
      </div>
    </header>
  );
};
