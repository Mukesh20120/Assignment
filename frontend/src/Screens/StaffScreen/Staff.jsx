import React, { useEffect, useState } from "react";
import RowCard from "../../Components/RowCard";
import { getAllStudentData } from "../../services/apiFunction";
import Header from "../../Components/Header";
import { toast } from "react-toastify";

function Staff() {
  const createStudentObject = (name, email, phone, resume, id, date, time) => {
    return { name, email, phone, resume, id, date, time };
  };
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllStudentData();
        const fetchData = await res.data;
        const result = fetchData.map((data) => {
          const { name, email, phone, resume, _id: id, createdAt } = data;
          const resumeFile = resume.filename.split("#")[1];
          const dateObj = new Date(createdAt);

          const date = dateObj.toLocaleDateString();

          const time = dateObj.toLocaleTimeString();
          return createStudentObject(
            name,
            email,
            phone,
            resumeFile,
            id,
            date,
            time
          );
        });
        setUsersData(result);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(error.response.data.msg);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-100">
      <Header show={true} />
      <div className="d-flex justify-center align-items-center my-7 w-full">
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
                Date And Time
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Download link</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <RowCard rowData={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;
