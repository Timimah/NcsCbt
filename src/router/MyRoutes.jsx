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
import { Checkin } from "../pages/AdminPages/dashboard/Checkin";
import { User } from "../pages/AdminPages/dashboard/User";
import { UploadMaterials } from "../pages/AdminPages/dashboard/UploadMaterials";
import { Payment } from "../pages/AdminPages/dashboard/Payment";
import { Result } from "../pages/AdminPages/dashboard/Result";
import { AdminOverview } from "../pages/AdminPages/dashboard/AdminOverview";

export const MyRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        {/* <Route path="/search-results" element={<SearchResults />} />
        <Route path="/search-profile" element={<SearchProfilell />} /> */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        >
          <Route path="overview" element={<DashboardPage />} />
          <Route path="take-exam" element={<TakeExam />} />
          <Route path="material" element={<Materials />} />
          {/* <Route path="practice" element={<DashboardUsers />} /> */}
          <Route path="result" element={<Results />} />
          <Route path="user-profile" element={<ProfilePage />} />
        </Route>
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        >
          <Route path="overview" element={<AdminOverview />} />
          <Route path="checkin" element={<Checkin />} />
          <Route path="user" element={<User />} />
          <Route path="materials" element={<UploadMaterials />} />
          <Route path="result" element={<Result />} />
          <Route path="payment-history" element={<Payment />} />
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