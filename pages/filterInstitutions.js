import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import Layout from "./components/Layout";
import { Pagination } from "@mui/material";

export default function FilterInstitutions({ institutions, allinstitutions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();
  const itemsPerPage = 20;
  const { query } = router;
  const { department, subdepartment } = query ?? props;

  const { ownership, zone } = query;

  console.log(institutions);
  const institutionNames = institutions.map((institution) => institution.name);

  const filledinstitutions = allinstitutions.filter((institution) => {
    const lowerCaseInstitutionNames = institutionNames.map((name) =>
      name.toLowerCase()
    );

    lowerCaseInstitutionNames.includes(institution.name.toLowerCase());
  });

  const [count, setCount] = useState(0);
  const { number } = useSpring({
    from: { number: 0 },
    number: count,
    delay: 200,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const filterInstitutionsByName = () => {
    // Further filter by ownership and zone if they exist in the query
    if (ownership) {
      filledinstitutions = filledinstitutions.filter(
        (institution) => institution.ownership === ownership
      );
    }

    if (zone) {
      filledinstitutions = filledinstitutions.filter(
        (institution) => institution.zone === zone
      );
    }

    setFilteredInstitutions(filledinstitutions);
    setPageCount(Math.ceil(filledinstitutions.length / itemsPerPage));
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    if (institutions && allinstitutions) {
      filterInstitutionsByName();
    }
  }, [ownership, zone]);
  useEffect(() => {
    setCount(filteredInstitutions.length);
  }, [filteredInstitutions.length]);

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
            {ownership && (
              <h2 className="text-4xl font-bold pl-2">
                Ownership: {ownership}
              </h2>
            )}
            {zone && <h2 className="text-4xl font-bold pl-2">Zone: {zone}</h2>}
            <h2 className="text-2xl m-2 pl-1">
              {" "}
              Total (
              <animated.span>
                {number.to((n) => Math.floor(n))}
              </animated.span>{" "}
              Institutions)
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
                    pathname: "/SelectFilterInstitution",
                  })
                }
              >
                Filter Institutions
              </button>{" "}
            </div>
            <div className="text-xl font-bold mt-2 pl-2 mb-5">
              {" "}
              Institution List
            </div>
            <div className="flex flex-wrap justify-around items-stretch">
              <div className="overflow-x-auto mx-auto w-[80vw]">
                <table className="min-w-full bg-white border border-gray-300">
                  <tbody>
                    {" "}
                    {filteredInstitutions.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          There are no institutions here.
                        </td>
                      </tr>
                    ) : (
                      filteredInstitutions
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((institution, programIndex, institutionsArray) => {
                          const programNumber =
                            (currentPage - 1) * itemsPerPage + programIndex + 1;
                          const isNotFirstProgram = programIndex > 0;
                          return (
                            <React.Fragment key={programIndex}>
                              {isNotFirstProgram && (
                                <tr key={`${programIndex}-spacer`}>
                                  <td colSpan="6" className="py-2"></td>
                                </tr>
                              )}
                              {
                                <tr className="bg-gray-500 border-b border-gray-300 text-2xl">
                                  <td
                                    className="py-2 px-4 text-center font-bold"
                                    colSpan="6"
                                  >
                                    {institution.name}
                                  </td>
                                </tr>
                              }
                              {/* Render other program data */}
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
  const { query } = context;
  try {
    let apiUrl = "";

    switch (query.department) {
      case "Monotechnic":
        switch (query.subdepartment) {
          case "Colleges of Agriculture":
            apiUrl =
              "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_monotechnic_institutions";
            break;
          case "Colleges of Health Sciences":
            apiUrl =
              "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_monotechnic_institutions";
            break;
          case "Specialized Institutions":
            apiUrl =
              "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_monotechnic_institutions";
            break;
        }
        break;
      case "Technical College":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_technical_college_institutions";
        break;
      case "IEI":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_iei_institutions";
        break;
      case "VEI":
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_vei_institutions";
        break;
      case "Polytechnic":
      default:
        apiUrl =
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/get_polytechnic_institutions";
        break;
    }
    let response;
    if (query.department === "Monotechnic") {
      response = await axios.get(
        `${apiUrl}?subDepartment=${query.subdepartment}`
      );
    } else {
      response = await axios.get(apiUrl);
    }

    const response1 = await axios.get(
      "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-Institutions"
    );
    const allinstitutions = response1.data.institutions;
    // console.log(response);
    const institutions = response.data.institutions;
    // console.log(response);
    console.log(institutions);
    return {
      props: {
        institutions,
        allinstitutions,
        department: query.department || "",
        subdepartment: query.subdepartment || "",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        institutions: null,
        allinstitutions: null,
        department: query.department || "",
        subdepartment: query.subdepartment || "",
      },
    };
  }
}
