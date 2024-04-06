import React from 'react'
import { downloadResume } from '../services/apiFunction';
import {toast} from "react-toastify"

function RowCard({rowData}) {
    const onClickHandler = async() =>{
        try {
            const response = await downloadResume(rowData.id);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${rowData.resume}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success("Download Successfully")
          } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
              toast.error(error.response.data.msg);
            }
          }
    }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
     {rowData?.name}
    </th>
    <td className="px-6 py-4">{rowData.email}</td>
    <td className="px-6 py-4">{rowData.phone}</td>
    <td className="px-6 py-4">{rowData.resume}</td>
    <td className="px-6 py-4">{`${rowData.date} ${rowData.time}`}</td>
    <td className="px-6 py-4 text-right">
      <p
        className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
        onClick={onClickHandler}
      >
      Download
      </p>
    </td>
  </tr>
  )
}

export default RowCard