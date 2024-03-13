import { Route, Routes } from "react-router-dom";
import { TakeExam } from "../pages/UserPages/dashboard/TakeExam";
import { Login } from "../pages/UserPages/auth/Login";
import { CreateAccount } from "../pages/UserPages/auth/CreateAccount";
import { Dashboard } from "../pages/UserPages/dashboard/Dashboard";
import { DashboardPage } from "../pages/UserPages/dashboard/DashboardPage";
import { Materials } from "../pages/UserPages/dashboard/Materials";
import { Results } from "../pages/UserPages/dashboard/Results";
import { ProfilePage } from "../pages/UserPages/dashboard/UserProfile";
import { Home } from "../pages/WebsitePages/Home";
import { AdminDashboard } from "../pages/AdminPages/dashboard/AdminDashboard";
import { AdminLogin } from "../pages/AdminPages/auth/AdminLogin";
import { AdminOverview } from "../pages/AdminPages/dashboard/AdminOverview";
import { Checkin } from "../pages/AdminPages/dashboard/Checkin";
import { User } from "../pages/AdminPages/dashboard/User";
import { UploadMaterials } from "../pages/AdminPages/dashboard/UploadMaterials";

export const MyRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-admin" element={<AdminLogin />} />
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
          {/* <Route path="practice" element={<DashboardUsers />} /> */}
          <Route path="result" element={<Results />} />
          <Route path="user-profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="/admin"
          element={<AdminDashboard />}
          // element={<Navigate replace to="/dashboard/overview" />}
        >
          <Route path="admin-overview" element={<AdminOverview />} />
          <Route path="checkin" element={<Checkin />} />
          <Route path="user" element={<User />} />
          <Route path="materials" element={<UploadMaterials />} />
          {/* <Route path="result" element={<Results />} />
          <Route path="user-profile" element={<ProfilePage />} /> */}
          {/* <Route path="/dashboard/add" element={<DashboardAdd />} />
          <Route path="/dashboard/edit-venue" />
          <Route path="/dashboard/edit-vendor" /> */}
          {/* <Route path="/dashboard/add" element={<DashboardAdd />} />
          <Route path="/dashboard/edit-venue" />
          <Route path="/dashboard/edit-vendor" /> */}
        </Route>
        <Route path="*" />
      </Routes>
    );
  };