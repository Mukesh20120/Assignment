import React, { useState, useRef } from "react";
import Header from "../../Components/Header";
import { uploadStudentData } from "../../services/apiFunction";
import { toast } from "react-toastify";

function StudentForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: undefined,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.name);
    data.append("email", userData.email);
    data.append("phone", userData.phone);
    data.append("resume", userData.resume);
    fileInputRef.current.files = null;
    setFileName("");
    setUserData({ name: "", email: "", password: "", phone: "", resume: null });
    try {
      const res = await uploadStudentData(data);
      const { status, msg } = res.data;
      if (status === "success") toast.success(msg);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const onChangeHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const allowedTypes = ["application/pdf"];

    if (file && allowedTypes.includes(file.type)) {
      setFileName(file.name);
      setUserData((prev) => ({ ...prev, resume: file }));
      if (fileInputRef) {
        fileInputRef.current.files = e.dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    } else {
      toast.error("Please upload a PDF file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["application/pdf"];
    if (file && allowedTypes.includes(file.type)) {
      setFileName(file.name);
      setUserData((prev) => ({ ...prev, resume: file }));
    } else {
      toast.error("Please upload a PDF file.");
      e.target.files = null;
    }
  };

  return (
    <div>
      <Header show={true} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://e7.pngegg.com/pngimages/712/814/png-clipart-computer-icons-student-academic-degree-graduation-ceremony-student-people-logo-thumbnail.png"
            alt="Resume Portal"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
            Student Form
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            {/* user name */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User name<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  autoComplete="name"
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* user end */}

            {/* email start */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  autoComplete="email"
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* email end */}

            {/* phone number start */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  maxLength={10}
                  value={userData.phone}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  autoComplete="current-phone"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* phone number end */}

            {/* upload resume start */}
            {/* <ResumeUpload onResumeUpdate={handleUpdateResume}/> */}
            <div className="col-span-full">
              <label
                htmlFor="resume"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {fileName===""?"Upload Resume":fileName}
                {fileName==="" && <span className="text-red-500">*</span>}
              </label>
              <div
                className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        required
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">{fileName===""?"upload file in pdf format only":fileName}</p>
                </div>
              </div>
            </div>
            {/* upload resume end */}

            {/* submit button start */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
            {/* submit button end */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
