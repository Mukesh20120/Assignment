import Login from "./Screens/LoginScreen/Login";
import Staff from "./Screens/StaffScreen/Staff";
import StudentForm from "./Screens/StudentScreen/StudentForm";
import { Routes, Route } from "react-router-dom";
import {ToastContainer } from "react-toastify"


function App() {
  return (
    <div className="w-100 mx-auto">
      <ToastContainer autoClose={3000}/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<StudentForm />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
    </div>
  );
}

export default App;
