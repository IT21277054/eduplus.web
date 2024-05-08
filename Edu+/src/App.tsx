import { Route, Routes } from "react-router-dom"
import SignIn from "./components/userManagement/SignIn"
import SignUp from "./components/userManagement/SignUp"
import { AdminDashboard } from "./components/courseManagement/adminComponents/adminDashboard"
import InstructorSignUp from "./components/courseManagement/adminComponents/InstructorSignUp"


function App() {


  return (
    <div >
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/dashboard/instructor" element={<InstructorSignUp />}></Route>
    </Routes>
  </div>
  )
}

export default App
