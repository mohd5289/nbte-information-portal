import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

export default function ProgrammeSearchResult({ institutionsAndProgrammes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 20;
  console.log(institutionsAndProgrammes);
  const arrayInstitutionsAndProgrammes = Object.entries(
    institutionsAndProgrammes
  );
  const router = useRouter();
  const defaultProgramName = "No Programme Selected";
  const { query } = router;

  const { programName = defaultProgramName } = query;
  //   const { department, subdepartment } = query ?? props;
  const [count, setCount] = useState(0);
  const { number } = useSpring({
    from: { number: 0 },
    number: count,
    delay: 200,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const { programme_name_starts_with, accreditation_status, streams } = query;
  console.log(programName);
  const { department, subdepartment } = query ?? props;

  useEffect(() => {
    if (arrayInstitutionsAndProgrammes.length > 0) {
      filterAllPrograms();
    }
  }, [
    programName,
    programme_name_starts_with,
    accreditation_status,
    streams,
    arrayInstitutionsAndProgrammes,
  ]);
  const formatDate = (expirationDate) => {
    const date = new Date(expirationDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  let totalPrograms = 0;
  if (arrayInstitutionsAndProgrammes[0]?.[1]) {
    arrayInstitutionsAndProgrammes[0][1].forEach((institution) => {
      // Access the array of programs for each institution
      const programs = institution.programmes;

      // Add the number of programs in the current institution to the total
      totalPrograms += programs.length;
    });
  }

  //   var accumulator = 0;
  //   const pageCount = Math.ceil(totalPrograms / itemsPerPage);
  //   const pageCount = arrayInstitutionsAndProgrammes[0][1].length;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  arrayInstitutionsAndProgrammes[0][1].forEach((institution) => {
    // Access the array of programs for each institution
    const programs = institution.programmes;

    // Add the number of programs in the current institution to the total
    totalPrograms += programs.length;
  });
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
  const [filteredProgrammes, setFilteredProgrammes] = useState(allPrograms);
  useEffect(() => {
    setCount(filteredProgrammes.length);
  }, [filteredProgrammes.length]);
  const filterAllPrograms = () => {
    let filteredData = allPrograms; // Reset to original data
    console.log(filteredData);
    // const {
    //   programName,
    //   programme_name_starts_with,
    //   accreditation_status,
    //   streams,
    // } = query;
    if (programName !== defaultProgramName) {
      filteredData = filteredData.filter((program) =>
        program.name.toLowerCase().startsWith(programName.toLowerCase())
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
    filteredData.sort((a, b) =>
      a.institutionName.localeCompare(b.institutionName)
    );
    setFilteredProgrammes(filteredData);
    console.log(filteredProgrammes);
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  };

  useEffect(() => {
    filterAllPrograms();
  }, [query]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Layout>
          <div className="flex flex-col border-[6px]  border-gray-300  shadow-md mx-5 lg:mx-40 md:mx-20 sm:mx-10 my-10 ">
            <h2 className="text-4xl font-bold pl-2">{programName}</h2>
            {programme_name_starts_with !== "none" && (
              <h2 className="text-4xl  pl-2">
                Level: {programme_name_starts_with}
              </h2>
            )}
            {accreditation_status !== "all" && (
              <h2 className="text-4xl pl-2">Status: {accreditation_status}</h2>
            )}
            {streams !== "any" && (
              <h2 className="text-4xl  pl-2">Stream: {streams}</h2>
            )}
            <h2 className="text-2xl m-2">
              {" "}
              Total (
              <animated.span>
                {number.to((n) => Math.floor(n))}
              </animated.span>{" "}
              programmes)
            </h2>{" "}
            {/* <h2 className="text-2xl pl-3">
              Category : {allInstitution.ownership} Institution
            </h2>

            <h2 className="text-2xl pt-2 pl-3">
              Established in {allInstitution.year_established}
            </h2>
            <h2 className="text-2xl  pt-2 pl-3">{allInstitution.zone} Zone</h2> */}
            <div className=" flex flex-wrap border border-gray-300 ">
              {" "}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                onClick={() =>
                  router.push({
                    pathname: "/searchInstitutionsByProgrammes",
                    query: { department, subdepartment },
                  })
                }
              >
                Search Another Programme
              </button>{" "}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                // onClick={handleSubmit}
              >
                Check Programme Details
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2  rounded-full  shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                // onClick={handleSubmit}
              >
                Filter By Institution
              </button>
            </div>
            <div className="text-xl font-bold mt-2 pl-2">
              {" "}
              Programmes Directory
            </div>
            <div className="flex flex-wrap justify-around items-stretch">
              <div className="overflow-x-auto mx-auto w-[80vw]">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-green-600">
                    <tr>
                      <th className="lg:py-2 lg:px-4 px-1 py-1 text-center lg:text-lg border text-xs">
                        S/N
                      </th>
                      <th className="lg:py-2 lg:px-4 px-1 py-1 border lg:text-lg text-xs">
                        Programme Name
                      </th>
                      <th className="lg:py-2 lg:px-4 px-1 py-1 border lg:text-lg text-xs">
                        Year Granted
                      </th>
                      <th className="lg:py-2 lg:px-4 px-1 py-1 text-right lg:text-lg border text-xs">
                        Accreditation Status
                      </th>
                      <th className="lg:py-2 lg:px-4 px-1 py-1 text-right lg:text-lg border text-xs">
                        Approved Streams
                      </th>
                      <th className="lg:py-2 lg:px-4 px-1 py-1 text-right lg:text-lg border text-xs ">
                        Expiration Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
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
                              <tr className="bg-gray-500 border-b border-gray-300 text-lg">
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
                                <td className="text-center border lg:text-lg text-xs">
                                  {programNumber}
                                </td>
                                <td className="py-2 px-4 lg:text-lg border text-xs">
                                  {program.name}
                                </td>
                                <td className="py-2 px-4 lg:text-lg border text-xs">
                                  {program.yearGrantedInterimOrAccreditation}
                                </td>
                                <td className="py-2 px-4 lg:text-lg text-right border text-xs">
                                  {program.accreditationStatus}
                                </td>
                                <td className="py-2 px-4 lg:text-lg text-right border text-xs">
                                  {program.approvedStream}
                                </td>
                                <td className="py-2 px-4 lg:text-lg text-right w-1/6 whitespace-nowrap border text-xs">
                                  {formatDate(program.expirationDate)}
                                </td>
                              </tr>
                              {programIndex < programsArray.length - 1 &&
                                program.institutionName !==
                                  programsArray[programIndex + 1]
                                    .institutionName && (
                                  <tr className="bg-gray-500 border-b border-gray-300">
                                    <td
                                      className="py-2 px-4 text-center text-lg font-bold"
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
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
}
export async function getServerSideProps(context) {
  //   const { name } = context.query; // Assuming the name is passed as a query parameter
  const { query } = context;
  let apiUrl = "";

  try {
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

    const institutionsAndProgrammes = response.data;
    // console.log({ institution, programmes, allInstitution });
    return {
      props: {
        institutionsAndProgrammes,

        department: query.department || "",
        subdepartment: query.subdepartment || "",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        institutionsAndProgrammes: [],
        department: query.department || "",
        subdepartment: query.subdepartment || "",
      },
    };
  }
}
