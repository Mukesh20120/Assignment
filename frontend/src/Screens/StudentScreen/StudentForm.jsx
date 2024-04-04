import React, { useState } from "react";
import ResumeUpload from "../../Components/ResumeUpload";

function StudentForm() {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "",resume: undefined});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
    setUserData({name: "",email: "", password: "", phone: "" });
  };
  const handleUpdateResume = (file) => {
     setUserData(prev=>({...prev,resume: file}));
  }
  const onChangeHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://e7.pngegg.com/pngimages/712/814/png-clipart-computer-icons-student-academic-degree-graduation-ceremony-student-people-logo-thumbnail.png"
          alt="Resume Portal"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Student Form
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={onSubmitHandler}
        >
          {/* user name */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User name
            </label>
            <div className="mt-2">
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
              Email
            </label>
            <div className="mt-2">
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
                Contact Number
              </label>
            </div>
            <div className="mt-2">
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
          <ResumeUpload onResumeUpdate={handleUpdateResume}/>

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
  );
}

export default StudentForm;
