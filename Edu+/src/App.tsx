import { Route, Routes } from "react-router-dom"
import SignIn from "./components/userManagement/SignIn"
import SignUp from "./components/userManagement/SignUp"
import { AdminDashboard } from "./components/courseManagement/adminComponents/AdminDashboard"
import InstructorSignUp from "./components/courseManagement/adminComponents/InstructorSignUp"
import { PendingCourse } from "./components/courseManagement/adminComponents/PendingCourse"
import CourseContent from "./components/courseManagement/adminComponents/CourseContent"
import { AdminGuard, GuestGuard } from "./components/auth/authGuard"
import Header from "./components/templates/Header"
function GuestRoute() {
  return (
    <GuestGuard>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </GuestGuard>
  );
}

function AdminRoute(){
  return (
    <AdminGuard>
      <Routes>
      <Route path="/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/dashboard/instructor" element={<InstructorSignUp />}></Route>
      <Route path="/dashboard/courses" element={<PendingCourse />}></Route>
      <Route path="/dashboard/courses/:id" element={<CourseContent />} />
      </Routes>
    </AdminGuard>
  );
}

function App() {


  return (
    <div >
    {/* <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/dashboard/instructor" element={<InstructorSignUp />}></Route>
      <Route path="/admin/dashboard/courses" element={<PendingCourse />}></Route>
      <Route path="/admin/dashboard/courses/:id" element={<CourseContent />} />
    </Routes> */}
    
      <Routes>
        <Route path="admin/*" element={<AdminRoute />} />
        <Route path="*" element={<GuestRoute />} />
      </Routes>

  </div>
  )
}

export default App
