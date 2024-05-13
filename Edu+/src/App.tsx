import { Route, Routes } from "react-router-dom"
import SignIn from "./components/userManagement/SignIn"
import SignUp from "./components/userManagement/SignUp"
import { AdminDashboard } from "./components/courseManagement/adminComponents/adminDashboard"
import InstructorSignUp from "./components/courseManagement/adminComponents/InstructorSignUp"
import LearnerDashboard from "./components/learnerManagement/LearnerDashbord"


function App() {


  return (
    <div >
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/dashboard/instructor" element={<InstructorSignUp />}></Route>

      {/* Learner routes*/}
      <Route path="/learner/dashboard" element={<LearnerDashboard />}></Route>
      
    </Routes>
  </div>
  )
}

export default App
