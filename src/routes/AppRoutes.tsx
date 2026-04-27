import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import LicencePage from "../pages/LicenceListPage";
import SchoolCreatePage from "../pages/SchoolCreatePage";
import SchoolListPage from "../pages/SchoolListPage";
import LicenceCreatePage from "../pages/CreateLicencePage";
import QuestionBank from "../pages/QuestionBank";
import ClassVolumePage from "../pages/ClassVolumePage";
import EditVolumePage from "../pages/EditVolumePage";
import ClassPage from "../pages/ClassPage";
import VolumePage from "../pages/VolumePage";
import LicenceListPage from "../pages/LicenceListPage";
import CreateLicencePage from "../pages/CreateLicencePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
        <Route path="/licences" element={<LicenceListPage />} /> ✅
        <Route path="/schools" element={<SchoolListPage />} />
        <Route path="/schools/create" element={<SchoolCreatePage />} />
<Route path="/licences/create" element={<CreateLicencePage />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/class-volume" element={<ClassVolumePage />} />
        <Route
  path="/volumes/edit/:classId"
  element={<EditVolumePage />}
  
/>

<Route path="/classes" element={<ClassPage />} />
<Route path="/volumes" element={<VolumePage />} />
    </Routes>
  );
};

export default AppRoutes;