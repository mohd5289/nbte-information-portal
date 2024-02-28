import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAllProgrammes() {
  const [programName, setProgramName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [isTechnologyBased, setIsTechnologyBased] = useState("");
  const [programs, setPrograms] = useState([]);

  const handleAddProgrammes = () => {
    // setInstitutions([...institutions, programName]);
    const newProgram = {
      name: programName,
      isTechnologyBased,
      faculty,
    };

    setPrograms([...programs, newProgram]);
    setProgramName("");
    setIsTechnologyBased("");
    setFaculty("");
    // Clear input fields after adding the program
  };
  const handleDelete = (index) => {
    // Create a new array containing all the elements of the 'institutions' array
    const newPrograms = [...programs];
    // Remove one element at the specified 'index' from the 'newInstitutions' array
    newPrograms.splice(index, 1);
    // Set the state of 'institutions' to the updated 'newInstitutions' array
    setPrograms(newPrograms);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you want to submit all ${programs.length} programmes ?`
    );
    if (confirmed) {
      console.log(programs);
      try {
        const response = await axios.post(
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-programmes",
          {
            programs,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(`${programs.length} Programmes added successfully`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        });
        // Handle successful response

        setPrograms([]);
      } catch (error) {
        // Handle error
        console.log(error.message);
        toast.error("Failed to add programmes", {
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
      <h1 className="text-center font-bold text-xl"> Add Programmes here</h1>
      <div className="flex flex-row justify-center px-2 mt-2  ">
        <input
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          type="text"
          className="w-1/3 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter Programme Name"
        />
        <select
          className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2 ml-1"
          value={isTechnologyBased}
          onChange={(e) => setIsTechnologyBased(e.target.value)}
        >
          <option value="" disabled selected>
            Select Programme Type
          </option>
          <option value="true">Technology</option>
          <option value="false">Non-Technology</option>
          <option value="neither">None of the above</option>
        </select>
        <select
          type="number"
          className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2"
          placeholder="Year Granted"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        >
          {" "}
          <option value="" disabled selected>
            Select Faculty
          </option>
          <option value="AGRICULTURE AND RELATED TECHNOLOGY">
            AGRICULTURE
          </option>
          <option value="ART, PRINTING AND RELATED TECHNOLOGY">ART</option>
          <option value="BUSINESS, MANAGEMENT AND RELATED TECHNOLOGY">
            BUSINESS
          </option>
          <option value="ENGINEERING AND RELATED TECHNOLOGY">
            ENGINEERING
          </option>
          <option value="ENVIRONMENTAL DESIGN AND RELATED STUDIES">
            ENVIRONMENTAL
          </option>
          <option value="FINANCE AND RELATED STUDIES">FINANCE</option>
          <option value="INFORMATION AND RELATED STUDIES">INFORMATION </option>
          <option value="HOSPITALITY AND RELATED TECHNOLOGY">
            HOSPITALITY{" "}
          </option>
          <option value="SCIENCE, COMPUTING AND RELATED TECHNOLOGY">
            SCIENCE{" "}
          </option>
          <option value="HEALTH AND RELATED TECHNOLOGY">HEALTH </option>
          <option value="INSTITUTIONAL ADMIN">INSTITUTIONAL</option>
        </select>
        <button
          className=" bg-green-400 m-2   hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleAddProgrammes}
        >
          Add Programme
        </button>
      </div>
      <div className="overflow-x-auto mt-4 w-3/4 mx-auto">
        {/* Table head and body */}
        <table className="min-w-full bg-white border border-gray-300 w-full">
          {/* Table head */}
          {/* Table body */}
          <tbody>
            {programs &&
              programs.length > 0 &&
              programs.map((program, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4 text-center border w-10%">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-center border w-20%">
                    {program.name}
                  </td>
                  <td className="py-2 px-4 text-center border w-20%">
                    {program.isTechnologyBased}
                  </td>
                  <td className="py-2 px-4 text-center border w-20%">
                    {program.faculty}
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
        Add All Programmes
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
}
