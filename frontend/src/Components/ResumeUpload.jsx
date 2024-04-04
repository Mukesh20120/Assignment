import React, { useRef, useState } from 'react';

function ResumeUpload({onResumeUpdate}) {
  const [fileName, setFileName] = useState('');
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
    setFileName(file.name);
    onResumeUpdate(file);
    if(fileInputRef){
      fileInputRef.current.files=e.dataTransfer.files;
      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    onResumeUpdate(file);
    // Handle file upload logic here
  };

  return (
    <div className="col-span-full">
      <label htmlFor="resume" className="block text-sm font-medium leading-6 text-gray-900">
        Upload Resume
      </label>
      <div
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
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
          <p className="text-xs leading-5 text-gray-600">{fileName}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;
