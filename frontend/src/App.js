import Login from "./Screens/LoginScreen/Login";
import Staff from "./Screens/StaffScreen/Staff";
import StudentForm from "./Screens/StudentScreen/StudentForm";

function App() {
  // return <StudentForm/>;
  return (
    <div className="w-100 mx-auto">
      <div className="w-5/6  mx-auto">
      {/* <Staff /> */}
      {/* <Login/> */}
      <StudentForm/>
      </div>
    </div>
  );
}

export default App;
