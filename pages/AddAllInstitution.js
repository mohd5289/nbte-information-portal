import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function AddAllInstitution() {
  const [institutionName, setInstitutionName] = useState("");
  const [institutions, setInstitutions] = useState([]);

  const handleAddInstitution = () => {
    setInstitutions([...institutions, institutionName]);

    // Clear input fields after adding the program
    setInstitutionName("");
  };

  const handleDelete = (index) => {
    // Create a new array containing all the elements of the 'institutions' array
    const newInstitutions = [...institutions];
    // Remove one element at the specified 'index' from the 'newInstitutions' array
    newInstitutions.splice(index, 1);
    // Set the state of 'institutions' to the updated 'newInstitutions' array
    setInstitutions(newInstitutions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you want to submit all ${institutions.length} institutions ?`
    );
    if (confirmed) {
      try {
        const response = await axios.post(
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-institutions",
          {
            institutions,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(
          `${institutions.length} Institutions added successfully`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-success",
          }
        );
        // Handle successful response

        setInstitutions([]);
      } catch (error) {
        // Handle error
        toast.error("Failed to add institutions", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-error",
        });
      }
    }
  };
  return (
    <div className="flex flex-col w-60% border border-gray-300 shadow-md m-64">
      <h1 className="text-center font-bold text-xl"> Add Institutions here</h1>
      <div className="flex flex-row justify-center px-2 mt-2  ">
        <input
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
          type="text"
          className="w-1/2 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter Institution name"
        />
        <button
          className=" bg-green-400 m-2   hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleAddInstitution}
        >
          Add Institution
        </button>
      </div>
      <div className="overflow-x-auto mt-4 w-3/4 mx-auto">
        {/* Table head and body */}
        <table className="min-w-full bg-white border border-gray-300 w-full">
          {/* Table head */}
          {/* Table body */}
          <tbody>
            {institutions &&
              institutions.length > 0 &&
              institutions.map((institution, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4 text-center border w-10%">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-center border w-60%">
                    {institution}
                  </td>
                  <td className="py-2 px-4 text-center border bg-red-600 w-30%">
                    <button onClick={() => handleDelete(index)}>Delete</button>{" "}
                    {/* New column data */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button
        className="mb-2 bg-green-400 mt-2 w-1/2 mx-auto  hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        //   onClick={handleAddInstitution}
        onClick={handleSubmit}
      >
        Add All Institutions
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
}

{
  /* */
}
