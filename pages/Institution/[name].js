import React from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function InstitutionDetails({
  institution,
  programmes,
  allInstitution,
}) {
  console.log(institution);
  console.log(programmes);
  console.log(allInstitution);
  const router = useRouter();
  const { query } = router;
  const { department, subdepartment } = query ?? props;

  const formatDate = (expirationDate) => {
    const date = new Date(expirationDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Layout>
          <div className="flex flex-col border-[6px]  border-gray-300  shadow-md mx-5 lg:mx-40 md:mx-20 sm:mx-10 my-10 font-serif">
            <h2 className="text-4xl font-bold pl-2">{institution.name}</h2>
            <h2 className="text-2xl m-2 pl-1"> {allInstitution.address}</h2>
            <h2 className="text-2xl pl-3">
              Category : {allInstitution.ownership} Institution
            </h2>

            <h2 className="text-2xl pt-2 pl-3">
              Established in {allInstitution.year_established}
            </h2>
            <h2 className="text-2xl  pt-2 pl-3">{allInstitution.zone} Zone</h2>
            <div className=" flex flex-wrap border border-gray-300 ">
              {" "}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                onClick={() =>
                  router.push({
                    pathname: "/searchProgrammes",
                    query: { department, subdepartment },
                  })
                }
              >
                Search Another Institution
              </button>{" "}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                // onClick={handleSubmit}
              >
                Check Principal Officers Contacts
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2  rounded-full  shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                // onClick={handleSubmit}
              >
                Check Carrying Capacity
              </button>
            </div>
            <div className="text-xl font-bold mt-2 pl-2">
              {" "}
              Programmes Directory
            </div>
            <div className="flex flex-wrap justify-around items-stretch">
              <div className="overflow-x-auto mx-auto mt-3  w-[80vw] mb-20">
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
                      <th className="lg:py-2 lg:px-4 px-1 py-1 text-right lg:text-lg border text-xs">
                        Expiration Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {programmes.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          There are no programmes here.
                        </td>
                      </tr>
                    ) : (
                      programmes.map((program, programIndex, programsArray) => {
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
                                {programIndex + 1}
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
              </div>
            </div>
          </div>
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query; // Assuming the name is passed as a query parameter

  try {
    const response = await axios.get(
      `https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/search_institution_by_name?name=${name}`
    );
    const { institution, programmes, allInstitution } = response.data;
    console.log({ institution, programmes, allInstitution });
    return {
      props: {
        institution,
        programmes,
        allInstitution,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        institution: null,
        programmes: [],
        allInstitution: null,
      },
    };
  }
}
