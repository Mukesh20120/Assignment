import Login from "./Screens/LoginScreen/Login";
import Staff from "./Screens/StaffScreen/Staff";
import StudentForm from "./Screens/StudentScreen/StudentForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-100 mx-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<StudentForm />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
    </div>
  );
}

export default App;
