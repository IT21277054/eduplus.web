import { Route, Routes } from "react-router-dom"
import SignIn from "./components/userManagement/SignIn"
import SignUp from "./components/userManagement/SignUp"
import  AddCourse from "./components/courseManagement/instructorComponent/addCourse"
import { InstructorDashboard } from "./components/courseManagement/instructorComponent/instructorDashboard"
import { AdminDashboard } from "./components/courseManagement/adminComponents/adminDashboard"
import InstructorSignUp from "./components/courseManagement/adminComponents/InstructorSignUp"
import { PendingCourse } from "./components/courseManagement/adminComponents/pendingCourse"
import UnitForm from "./components/courseManagement/instructorComponent/AddContentPage"
import CourseContent from "./components/courseManagement/adminComponents/CourseContent"
import AllCourses from "./components/courseManagement/instructorComponent/displayCourse"
import UnitDetailsList from "./components/courseManagement/instructorComponent/displayCourseContent"
import QuizForm from "./components/courseManagement/instructorComponent/QizForm"
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
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/dashboard/instructor" element={<InstructorSignUp />}></Route>
      <Route path="/instructor/dashboard/addcontent" element={<UnitForm onSubmit={function (unitData: FormData): void {
          throw new Error("Function not implemented.")
        } } />}/>
      <Route path="/admin/dashboard/courses" element={<PendingCourse />}></Route>
      <Route path="/admin/dashboard/courses/:id" element={<CourseContent />} />
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/instructor/dashboard/coursesadd" element={<AddCourse />}></Route>
      <Route path="/instructor/dashboard/displaycourse" element={<AllCourses />}/>
      <Route path="/instructor/dashboard/quizform" element={< QuizForm courseId={""}/>}></Route>
      <Route path="/instructor/dashboard/diplaycontent" element={<UnitDetailsList/>}/>
    </Routes>
      <Routes>
        <Route path="admin/*" element={<AdminRoute />} />
        <Route path="*" element={<GuestRoute />} />
      </Routes>
  </div>
  )
}

export default App
