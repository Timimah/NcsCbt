import { Route, Routes } from "react-router-dom";
import { TakeExam } from "../pages/UserPages/dashboard/TakeExam";
import { Login } from "../pages/UserPages/auth/Login";
import { CreateAccount } from "../pages/UserPages/auth/CreateAccount";
import { Dashboard } from "../pages/UserPages/dashboard/Dashboard";
import { DashboardPage } from "../pages/UserPages/dashboard/DashboardPage";
import { Materials } from "../pages/UserPages/dashboard/Materials";

export const MyRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/take-exam" element={<TakeExam />} /> */}
        {/* <Route path="/search-results" element={<SearchResults />} />
        <Route path="/search-profile" element={<SearchProfilell />} /> */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
          // element={<Navigate replace to="/dashboard/overview" />}
        >
          <Route path="overview" element={<DashboardPage />} />
          <Route path="take-exam" element={<TakeExam />} />
          <Route path="material" element={<Materials />} />
          {/* <Route path="practice" element={<DashboardUsers />} />
          <Route path="result" element={<DashboardEditUser />} /> */}
          {/* <Route path="/dashboard/add" element={<DashboardAdd />} />
          <Route path="/dashboard/edit" element={<DashboardEdit />} />
          <Route path="/dashboard/edit-venue" />
          <Route path="/dashboard/edit-vendor" /> */}
        </Route>
        <Route path="*" />
      </Routes>
    );
  };