import React, { useEffect, useState } from "react";
import RowCard from "../../Components/RowCard";
import { getAllStudentData } from "../../services/apiFunction";

function Staff() {
    const createStudentObject = (name,email,phone,resume,id) =>{
        return {name,email,phone,resume,id};
    }
    // const usersData = [
    //     { name: "random", email: "random@gmail.com", phone: "9473592332", resume: "cv.pdf" },
    //     { name: "John Doe", email: "johndoe@example.com", phone: "1234567890", resume: "john_doe_resume.pdf" },
    //     { name: "Alice Smith", email: "alice.smith@example.com", phone: "9876543210", resume: "alice_smith_resume.pdf" },
    //     { name: "Bob Johnson", email: "bob.johnson@example.com", phone: "5555555555", resume: "bob_johnson_resume.pdf" },
    //     { name: "Emma Brown", email: "emma.brown@example.com", phone: "3333333333", resume: "emma_brown_resume.pdf" },
    //     { name: "Michael Lee", email: "michael.lee@example.com", phone: "9999999999", resume: "michael_lee_resume.pdf" }
    // ];
    const [usersData,setUsersData] = useState([]);
 useEffect(()=>{
    const fetchData = async() =>{
      try{
       const res = await getAllStudentData();
       const fetchData = await res.data;
       const result = fetchData.map((data)=>{
        const {name,email,phone,resume,_id: id} = data;
        const resumeFile = resume.filename.split('#')[1];
        return createStudentObject(name,email,phone,resumeFile,id);
       });
       console.log(result);
       setUsersData(result);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
 },[])
    
  return (
    <div className="w-100">
      <div className="d-flex justify-center align-items-center ">
        <h1>Staff Webpage </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
               Name
              </th>
              <th scope="col" className="px-6 py-3">
               Email
              </th>
              <th scope="col" className="px-6 py-3">
               Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Resume
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Download link</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user)=>(<RowCard rowData={user}/>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;
