import { Button, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
export default function AddProgrammes() {
  const [institutionName, setInstitutionName] = useState("");
  const [programName, setProgramName] = useState("");
  const [isTechnologyBased, setIsTechnologyBased] = useState("");
  const [numberOfStreams, setNumberOfStreams] = useState("");
  const [accreditationStatus, setAccreditationStatus] = useState("");
  const [faculty, setFaculty] = useState("");
  const [yearApproved, setYearApproved] = useState("");
  const [yearGranted, setYearGranted] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [programs, setPrograms] = useState([]);

  const [sideBarVisible, setSideBarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSideBarVisible(true);
  };

  const sideBarCloseBarHandler = () => {
    setSideBarVisible(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you want to submit all ${programs.length} programmes ?`
    );
    if (confirmed) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/create-institution-with-programmes",
          {
            institution_name: institutionName,
            programmes: programs,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(
          `${institutionName} ${programs.length} programmes added successfully`,
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
        setInstitutionName("");
        setPrograms([]);
      } catch (error) {
        // Handle error
        toast.error("Failed to add institution and programs", {
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
  const handleAddProgram = () => {
    const newProgram = {
      institutionName,
      name: programName,
      isTechnologyBased: isTechnologyBased === "true",
      approvedStream: parseInt(numberOfStreams),
      accreditationStatus,
      faculty,
      yearApproved,
      yearGrantedInterimOrAccredition: yearGranted,
      expirationDate,
    };

    setPrograms([...programs, newProgram]);

    // Clear input fields after adding the program
    setProgramName("");
    setIsTechnologyBased("");
    setNumberOfStreams("");
    setAccreditationStatus("");
    setYearGranted("");
    setExpirationDate("");
    setFaculty("");
  };

  //   const handleSnackbarOpen = (message, severity) => {
  //     setSnackbarMessage(message);
  //     setSnackbarSeverity(severity);
  //     setOpenSnackbar(true);
  //   };
  const handleDelete = (rowId) => {
    // Filter out the program with the given rowId
    const updatedPrograms = programs.filter(
      (program, index) => index !== rowId
    );

    // Update the programs state with the filtered array
    setPrograms(updatedPrograms);
  };
  //   const handleSnackbarClose = () => {
  //     setOpenSnackbar(false);
  //   };
  return (
    <div className="flex flex-col relative">
      <div
        className={`fixed left-0 top-0 h-full bg-white overflow-y-auto transform transition-transform ease-in-out ${
          sideBarVisible
            ? "translate-x-0 border-r z-20"
            : "-translate-x-full z-10"
        }`}
        style={{ width: "300px" }}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Options</p>
            <button
              className="text-gray-600 focus:outline-none"
              onClick={sideBarCloseBarHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-b">
          <Link href={`/searchProgrammes`}>
            <a
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={sideBarCloseBarHandler}
            >
              Search Programme
            </a>
          </Link>
        </div>

        <div className="border-b">
          <Link href={`/addProgrammes`}>
            <a
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={sideBarCloseBarHandler}
            >
              Add Programme
            </a>
          </Link>
        </div>
      </div>
      <div className="flex  relative z-0">
        <button
          className="absolute top-0 left-0 z-30 p-2 text-gray-500 focus:outline-none"
          onClick={sidebarOpenHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link href="/">
          <a className="text-xl font-bold text-gray-800 ml-12 ">
            Polytechnic Programmes
          </a>
        </Link>
        <div className="flex flex-wrap w-3/4 border border-gray-300 shadow-md ml-auto p-1">
          <input
            type="text"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter Institution's name"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
          <input
            type="text"
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ml-2"
            placeholder="Enter Programme's name"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
          />

          <input
            type="number"
            className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  m-2"
            placeholder="Number of Streams"
            value={numberOfStreams}
            onChange={(e) => setNumberOfStreams(e.target.value)}
          />
          <select
            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2"
            value={accreditationStatus}
            onChange={(e) => setAccreditationStatus(e.target.value)}
          >
            <option value="" disabled selected>
              Select Accreditation Status
            </option>
            <option value="Accredited">Accredited</option>
            <option value="Interim">Interim</option>
            <option value="Approved">Approved</option>
          </select>

          <select
            className="w-60 my-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2"
            value={yearApproved}
            onChange={(e) => setYearApproved(e.target.value)}
          >
            <option value="" disabled selected>
              Select Year Approved
            </option>
            {Array.from(
              { length: new Date().getFullYear() - 1899 },
              (_, i) => 1900 + i
            )
              .reverse() // Reverse the array to have the latest year first
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
          <select
            className="w-60 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2"
            value={yearGranted}
            onChange={(e) => setYearGranted(e.target.value)}
          >
            <option value="" disabled selected>
              Select Year Granted
            </option>
            {Array.from(
              { length: new Date().getFullYear() - 1899 },
              (_, i) => 1900 + i
            )
              .reverse() // Reverse the array to have the latest year first
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
          <button
            className="w-1/4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-30 "
            onClick={handleAddProgram}
          >
            Add programme
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-4 w-3/4 ml-auto">
        {/* Table head and body */}
        <table className="min-w-full bg-white border border-gray-300 w-full">
          {/* Table head */}
          <thead className="bg-green-600">
            <tr>
              <th className="py-2 px-4 text-center border">S/N</th>
              <th className="py-2 px-4 border">Programme Name</th>
              <th className="py-2 px-4 border">Year Granted</th>
              <th className="py-2 px-4 text-right border">
                Accreditation Status
              </th>
              <th className="py-2 px-4 text-right border">Approved Streams</th>
              <th className="py-2 px-4 text-right border">Expiration Date</th>
              <th className="py-2 px-4 text-right border">Actions</th>{" "}
              {/* New column */}
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            <tr className="bg-gray-500 border-b border-gray-300">
              <td className="py-2 px-4 text-center font-bold" colSpan="7">
                {institutionName}
              </td>
            </tr>
            {programs.map((program, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-2 px-4 text-center border">{index + 1}</td>
                <td className="py-2 px-4 border">{program.name}</td>
                <td className="py-2 px-4 border">
                  {program.yearGrantedInterimOrAccredition}
                </td>
                <td className="py-2 px-4 text-right border">
                  {program.accreditationStatus}
                </td>
                <td className="py-2 px-4 text-right border">
                  {program.approvedStream}
                </td>
                <td className="py-2 px-4 text-right w-1/6 whitespace-nowrap border">
                  {program.expirationDate}
                </td>
                <td className="py-2 px-4 text-right border bg-red-600">
                  <button onClick={() => handleDelete(index)}>Delete</button>{" "}
                  {/* New column data */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          {" "}
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
            onClick={handleSubmit}
          >
            Submit All programmes
          </button>
        </div>

        {/* Pagination component */}
        {/* <Pagination
          className="mt-10"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        /> */}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
{
  /* <select
className="w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2 ml-1"
value={isTechnologyBased}
onChange={(e) => setIsTechnologyBased(e.target.value)}
>
<option value="" disabled selected>
  Select if Programme is Technology based
</option>
<option value="true">True</option>
<option value="false">False</option>
</select> */
}
{
  /* <div className="relative">
<input
  type="date"
  className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-2"
  name="expirationDate"
  value={expirationDate}
  onChange={(e) => setExpirationDate(e.target.value)}
/>
<span
  className={`absolute top-0 left-4 ${"block"}`}
  style={{ pointerEvents: "none", color: "#999" }}
  //   value={expirationDate}
  //   onChange={(e) => setExpirationDate(e.target.value)}
>
  Select Expiration Date
</span>
</div> */
}
{
  /* <select
type="number"
className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mx-2"
placeholder="Year Granted"
value={faculty}
onChange={(e) => setFaculty(e.target.value)}
> */
}
{
  (" ");
}
{
  /* <option value="" disabled selected>
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
<option value="INFORMATION AND RELATED STUDIES">
  INFORMATION{" "}
</option>
<option value="HOSPITALITY AND RELATED TECHNOLOGY">
  HOSPITALITY{" "}
</option>
<option value="SCIENCE, COMPUTING AND RELATED TECHNOLOGY">
  SCIENCE{" "}
</option>
<option value="INSTITUTIONAL ADMIN">INSTITUTIONAL </option>
</select> */
}
