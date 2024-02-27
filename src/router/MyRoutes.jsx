import { Route, Routes } from "react-router-dom";
import { TakeExam } from "../pages/TakeExam";
import { Login } from "../pages/Login";

export const MyRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/take-exam" element={<TakeExam />} />
        {/* <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/search-profile" element={<SearchProfilell />} /> */}
        {/* <Route
          path="/dashboard"
          element={<DashboardSideBar />}
          // element={<Navigate replace to="/dashboard/overview" />}
        >
          <Route path="/dashboard/overview" element={<DashboardOverview />} />
          <Route path="/dashboard/venue" element={<DashboardVenue />} />
          <Route path="/dashboard/vendor" element={<DashboardVendor />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
          <Route path="/dashboard/edit-user" element={<DashboardEditUser />} />
          <Route path="/dashboard/add" element={<DashboardAdd />} />
          <Route path="/dashboard/edit" element={<DashboardEdit />} />
          <Route path="/dashboard/edit-venue" />
          <Route path="/dashboard/edit-vendor" />
        </Route> */}
        <Route path="*" />
      </Routes>
    );
  };