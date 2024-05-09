import { Route, Routes } from "react-router-dom"
import SignIn from "./components/userManagement/SignIn"
import SignUp from "./components/userManagement/SignUp"
import { AdminDashboard } from "./components/courseManagement/adminComponents/AdminDashboard"
import InstructorSignUp from "./components/courseManagement/adminComponents/InstructorSignUp"
import { PendingCourse } from "./components/courseManagement/adminComponents/PendingCourse"
import CourseContent from "./components/courseManagement/adminComponents/CourseContent"


function App() {


  return (
    <div >
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/dashboard/instructor" element={<InstructorSignUp />}></Route>
      <Route path="/admin/dashboard/courses" element={<PendingCourse />}></Route>
      <Route path="/admin/dashboard/courses/:id" element={<CourseContent />} />
    </Routes>
  </div>
  )
}

export default App
