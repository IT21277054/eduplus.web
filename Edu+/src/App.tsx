import { Route, Routes } from "react-router-dom"
import SignIn from "./components/userManagement/SignIn"
import SignUp from "./components/userManagement/SignUp"
import { AdminDashboard } from "./components/courseManagement/adminComponents/AdminDashboard"
import InstructorSignUp from "./components/courseManagement/adminComponents/InstructorSignUp"
import { PendingCourse } from "./components/courseManagement/adminComponents/PendingCourse"
import CourseContent from "./components/courseManagement/adminComponents/CourseContent"
import { AdminGuard, GuestGuard } from "./components/auth/authGuard"
import Header from "./components/templates/Header"
import { Footer } from "./components/templates/Footer"
import { Home } from "./components/templates/Home"
function GuestRoute() {
  return (
    <GuestGuard>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </GuestGuard>
  );
}

function AdminRoute(){
  return (
    <AdminGuard>
      <Header/>
      <Routes>
      <Route path="/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/dashboard/instructor" element={<InstructorSignUp />}></Route>
      <Route path="/dashboard/courses" element={<PendingCourse />}></Route>
      <Route path="/dashboard/courses/:id" element={<CourseContent />} />
      </Routes>
      <Footer/>
    </AdminGuard>
  );
}

function App() {


  return (
    <div >
      <Routes>
        <Route path="admin/*" element={<AdminRoute />} />
        <Route path="*" element={<GuestRoute />} />
      </Routes>
  </div>
  )
}

export default App
