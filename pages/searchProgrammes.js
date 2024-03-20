import React, { useEffect, useState } from "react";

import { Pagination } from "@mui/material";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchProgrammes({ institutionsAndProgrammes }) {
  console.log(institutionsAndProgrammes);

  const arrayInstitutionsAndProgrammes = Object.entries(
    institutionsAndProgrammes
  );

  const router = useRouter();
  const { query } = router;
  const { department, subdepartment } = query;
  const [searchTerm, setSearchTerm] = useState("");
  const [accreditationStatus, setAccreditationStatus] = useState("all");
  const [startsWithString, setStartsWithString] = useState("none");
  const [selectedStream, setSelectedStream] = useState("any");
  const [searchByInstitution, setSearchByInstitution] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  //    const itemsPerPage = 20;
  //   const [currentPage, setCurrentPage] = useState(1);

  //   const handlePageChange = (event, value) => {
  //     setCurrentPage(value);
  //   };

  const formatDate = (expirationDate) => {
    const date = new Date(expirationDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearch = () => {
    router.push({
      pathname: "/searchProgrammes",
      query: {
        programme_name_contains: searchTerm,
        programme_name_starts_with: startsWithString,
        accreditation_status: accreditationStatus,
        streams: selectedStream,
      },
    });
  };
  //   console.log(filteredProgrammes);
  let totalPrograms = 0;
  if (arrayInstitutionsAndProgrammes[0]?.[1]) {
    arrayInstitutionsAndProgrammes[0][1].forEach((institution) => {
      // Access the array of programs for each institution
      const programs = institution.programmes;

      // Add the number of programs in the current institution to the total
      totalPrograms += programs.length;
    });
  }
  // arrayInstitutionsAndProgrammes[0][1].forEach((institution) => {
  //   // Access the array of programs for each institution
  //   const programs = institution.programmes;

  //   // Add the number of programs in the current institution to the total
  //   totalPrograms += programs.length;
  // });

  console.log("Total number of all programs in institutions:", totalPrograms);
  console.log(arrayInstitutionsAndProgrammes[0][1].length);

  const itemsPerPage = 20; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  //   var accumulator = 0;
  //   const pageCount = Math.ceil(totalPrograms / itemsPerPage);
  //   const pageCount = arrayInstitutionsAndProgrammes[0][1].length;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  var lastIndices = [];
  const allPrograms = arrayInstitutionsAndProgrammes[0]?.[1]?.reduce(
    (acc, institution) => {
      const institutionPrograms = institution.programmes.map(
        (program, index) => ({
          institutionName: institution.institution_name,
          programNumber: index + 1,
          ...program,
        })
      );
      const lastProgramIndex = acc.length + institutionPrograms.length - 1;
      lastIndices.push(lastProgramIndex);
      institution.lastProgramIndex = lastProgramIndex;
      console.log(institution.lastProgramIndex);
      return acc.concat(institutionPrograms);
    },
    []
  );
  //   setFilteredProgrammes(allPrograms);

  // Calculate the total number of pages based on the number of programs

  var startIndex = (currentPage - 1) * itemsPerPage;
  //   const currentItems = arrayInstitutionsAndProgrammes[0][1].slice(
  //     startIndex,
  //     endIndex
  //   );
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSideBarVisible(true);
  };
  const sideBarCloseBarHandler = () => {
    setSideBarVisible(false);
  };
  const [filteredProgrammes, setFilteredProgrammes] = useState(allPrograms);
  useEffect(() => {
    filterAllPrograms();
  }, [query, filteredProgrammes]);
  const filterAllPrograms = () => {
    let filteredData = allPrograms; // Reset to original data
    console.log(filteredData);
    const {
      programme_name_contains,
      programme_name_starts_with,
      accreditation_status,
      streams,
    } = query;
    if (programme_name_contains) {
      filteredData = filteredData.filter((program) =>
        searchByInstitution
          ? program.institutionName
              .toLowerCase()
              .includes(programme_name_contains.toLowerCase())
          : program.name
              .toLowerCase()
              .includes(programme_name_contains.toLowerCase())
      );
    }

    if (programme_name_starts_with && programme_name_starts_with !== "none") {
      filteredData = filteredData.filter((program) =>
        program.name.startsWith(programme_name_starts_with)
      );
    }

    if (accreditation_status && accreditation_status !== "all") {
      filteredData = filteredData.filter(
        (program) => program.accreditationStatus === accreditation_status
      );
    }

    if (streams && streams !== "any") {
      filteredData = filteredData.filter(
        (program) => program.approvedStream === parseInt(streams)
      );
    }

    setFilteredProgrammes(filteredData);
    console.log(filteredProgrammes);
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  };
  //   console.log(arrayInstitutionsAndProgrammes[0][1][1]);
  //   console.log(
  //     groupProgrammesByFaculty(arrayInstitutionsAndProgrammes[0][1][0])
  //   );
  console.log(filteredProgrammes);
  console.log(searchByInstitution);
  return (
    <div className="flex flex-col ">
      <div className="flex items-center relative">
        <button
          className="p-2 text-gray-500 focus:outline-none"
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
        <Link href="/" title="Go to Home">
          <a
            className="text-xl font-bold text-gray-800 ml-4 "
            aria-label="Go to Home"
            title="Go to Home"
          >
            {department} Programmes <br />
            {query.subdepartment && ` (${query.subdepartment})`}
          </a>
        </Link>

        <div className="flex flex-col mr-auto ml-auto relative ">
          <div className="md:flex  items-center mr-auto ml-auto ">
            <form
              //   onSubmit={submitHandler}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="border border-white bg-white rounded-md"
            >
              <div className="p-4 bg-white border-b flex items-center ">
                <input
                  type="text"
                  placeholder={
                    searchByInstitution
                      ? "Search Institution"
                      : "Search Programme"
                  }
                  className="border rounded p-2"
                  style={{ width: "40rem" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-green-400 p-2 rounded-r-md"
                  aria-label="search"
                >
                  <MdSearch size="30" color="white" />
                </button>
              </div>
            </form>
          </div>
          <div
            className="absolute left-0 right-0 mt-32  lg:mx-auto  "
            // style={{
            //   marginTop: "400px",
            //   "@media (min-width: 640px)": {},
            //   "@media (min-width: 1024px)": {
            //     marginTop: "120px", // For large screens
            //   },
            // }}
          >
            <h2 className="mb-3 font-bold">
              {" "}
              Directory of Accredited Programmes
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-green-600">
                  {filteredProgrammes
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((program, programIndex, programsArray) => {
                      const isFirstProgramOfInstitution = programIndex === 0;
                      return (
                        <React.Fragment key={programIndex}>
                          {isFirstProgramOfInstitution && (
                            <tr className="bg-gray-500 border-b border-gray-300 text-2xl">
                              <td
                                className="py-2 px-4 text-center font-bold"
                                colSpan="6"
                              >
                                {program.institutionName}
                              </td>
                            </tr>
                          )}
                          {/* Render other program data */}
                        </React.Fragment>
                      );
                    })}
                  <tr>
                    <th className="py-2 px-4 text-center border">S/N</th>
                    <th className="py-2 px-4 border">Programme Name</th>
                    <th className="py-2 px-4 border">Year Granted</th>
                    <th className="py-2 px-4 text-right border">
                      Accreditation Status
                    </th>
                    <th className="py-2 px-4 text-right border">
                      Approved Streams
                    </th>
                    <th className="py-2 px-4 text-right border">
                      Expiration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {filteredProgrammes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        There are no programmes here.
                      </td>
                    </tr>
                  ) : (
                    filteredProgrammes
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((program, programIndex, programsArray) => {
                        const programNumber =
                          (currentPage - 1) * itemsPerPage + programIndex + 1;
                        return (
                          <React.Fragment key={programIndex}>
                            <tr
                              className={`border-b border-gray-300 ${
                                program.accreditationStatus === "Expired"
                                  ? "bg-red-500"
                                  : ""
                              }`}
                            >
                              <td className="py-2 px-4 text-center border">
                                {programNumber}
                              </td>
                              <td className="py-2 px-4 border">
                                {program.name}
                              </td>
                              <td className="py-2 px-4 border">
                                {program.yearGrantedInterimOrAccreditation}
                              </td>
                              <td className="py-2 px-4 text-right border">
                                {program.accreditationStatus}
                              </td>
                              <td className="py-2 px-4 text-right border">
                                {program.approvedStream}
                              </td>
                              <td className="py-2 px-4 text-right w-1/6 whitespace-nowrap border">
                                {formatDate(program.expirationDate)}
                              </td>
                            </tr>
                            {programIndex < programsArray.length - 1 &&
                              program.institutionName !==
                                programsArray[programIndex + 1]
                                  .institutionName && (
                                <tr className="bg-gray-500 border-b border-gray-300">
                                  <td
                                    className="py-2 px-4 text-center text-2xl font-bold"
                                    colSpan="6"
                                  >
                                    {
                                      programsArray[programIndex + 1]
                                        .institutionName
                                    }{" "}
                                    {/* Next institution's name */}
                                  </td>
                                </tr>
                              )}
                          </React.Fragment>
                        );
                      })
                  )}
                </tbody>
              </table>
              <Pagination
                className="mt-10"
                // defaultPage={1}
                // count={5}
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
              ></Pagination>
            </div>
          </div>
        </div>

        <div
          className={`fixed left-0 top-0 h-full bg-white overflow-y-auto transform transition-transform ease-in-out ${
            sideBarVisible ? "translate-x-0 border-r" : "-translate-x-full"
          }`}
          style={{ width: "250px" }}
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
            <Link
              href={`/searchProgrammes?department=${department}${
                query.subdepartment
                  ? `&subdepartment=${query.subdepartment}`
                  : ""
              }`}
            >
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Search Programme
              </a>
            </Link>
          </div>

          <div className="border-b">
            <Link
              href={`/addProgrammes?department=${department}${
                query.subdepartment
                  ? `&subdepartment=${query.subdepartment}`
                  : ""
              }`}
              passHref
            >
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Add Programme
              </a>
            </Link>
          </div>
          <div className="border-b">
            <Link href="/AddAllProgrammes">
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Add All Programmes Under NBTE
              </a>
            </Link>
          </div>
          <div className="border-b">
            <Link href="/AddAllInstitution">
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Add All Institutions Under NBTE
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/4 ml-12 ">
        <ul>
          <li>
            <div className="w-full">
              <p className="font-bold">Level</p>
              <select
                value={startsWithString}
                onChange={(e) => setStartsWithString(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="none">None</option>
                <option value="ND">ND</option>
                <option value="HND">HND</option>
              </select>
            </div>
          </li>
          <li>
            <div className="w-full">
              <p className="font-bold">Accreditation Status</p>
              <select
                value={accreditationStatus}
                onChange={(e) => setAccreditationStatus(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="all">All</option>
                <option value="Accredited">Accredited</option>
                <option value="Interim">Interim</option>
                <option value="Expired">Expired</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </li>
          <li>
            <div className="w-full">
              <p className="font-bold">Number of Streams</p>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="any">Any</option>
                {Array.from({ length: 100 }, (_, index) => index + 1).map(
                  (number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  )
                )}
              </select>
            </div>
          </li>
          <li>
            <div className="w-full">
              <p className="font-bold">Search by Institutions</p>
              <select
                // value={rating}
                value={searchByInstitution ? "yes" : "no"}
                onChange={(e) =>
                  setSearchByInstitution(e.target.value === "yes")
                }
                // onChange={ratingHandler}
                className="w-full border rounded p-2"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    let apiUrl = "";

    const response1 = await axios.get(
      "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-Institutions"
    );
    const institutions = response1.data.institutions;

    // Fetch data from the second URL
    const response2 = await axios.get(
      "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-Programmes"
    );
    const programmes = response2.data.programs;
    // Fetch data from Laravel API endpoint using Axios
    switch (query.department) {
      case "Monotechnic":
        switch (query.subdepartment) {
          case "Colleges of Agriculture":
            apiUrl =
              "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-monotechnic-institutions-and-college-of-agriculture-programmes";
            break;
          case "Colleges of Health Sciences":
            apiUrl =
              "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-monotechnic-institutions-and-college-of-health-sciences-programmes";
            break;
          case "Specialized Institutions":
            apiUrl =
              "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-monotechnic-institutions-and-specialized-institution-programmes";
            break;
        }
        break;
      case "Technical College":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-technical-colleges-institutions-and-programmes";
        break;
      case "IEI":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-iei-institutions-and-programmes";
        break;
      case "VEI":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-vei-institutions-and-programmes";
        break;
      case "Polytechnic":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-institutions-and-programmes";
      default:
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-institutions-and-programmes";
        break;
    }
    const response = await axios.get(apiUrl);
    // const response = await axios.get(
    //   "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-institutions-and-programmes"
    // );

    // Return data to the component;
    const institutionsAndProgrammes = response.data;

    return {
      props: {
        institutionsAndProgrammes,
        institutions,
        programmes,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        institutionsAndProgrammes: [],
      },
    };
  }
}

{
  /* <div className="p-4 bg-white border-b">
        <input
          type="text"
          placeholder="Search Programme"
          className="w-full border rounded p-2"
        />
      </div> */
}
// {filteredProgrammes
//   .slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   )
//   .map((program, programIndex, programsArray) => (
//     <tr className="bg-gray-500 border-b border-gray-300">
//       <td
//         className="py-2 px-4 text-center font-bold"
//         colSpan="6"
//       >
//         {program.institutionName}
//       </td>
//     </tr>
//   ))}
