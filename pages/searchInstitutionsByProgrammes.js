import Backdrop from "./components/BackdropSearch";
import React, { useEffect, useState } from "react";
import NBTE from "../public/favicon.ico";
import { Autocomplete, Pagination, TextField, Box } from "@mui/material";
import { MdSearch } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import RingLoader from "react-spinners/RingLoader";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import NBTEHQ from "./NBTE HQ 3.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
// import Backdrop from "./components/Backdrop";
// import Backdrop from "./components/BackdropK";
// import { useHistory } from "react-router-dom";

export default function SearchInstitutionsByProgrammes({ programmes }) {
  console.log(programmes);
  const [institution1Suggestions, setInstitutionSuggestions] = useState([]);
  //   const [institutionName, setInstitutionName] = useState("");
  const [programName, setProgramName] = useState("");
  //   const institutionNames = institutions.map((institution) => institution.name);
  const router = useRouter();
  const { query } = router;
  const { department, subdepartment } = query ?? props;
  // const history = useHistory();

  const inputStyles = {
    width: "50%",
    marginTop: 2,
    padding: 1,
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "&:focus": {
      outline: "none",
      borderColor: "#2196F3",
      boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.2)",
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [accreditationStatus, setAccreditationStatus] = useState("all");
  const [startsWithString, setStartsWithString] = useState("none");
  const [selectedStream, setSelectedStream] = useState("any");
  const [searchByInstitution, setSearchByInstitution] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAccreditationStatusChange = (value) => {
    setAccreditationStatus(value);
  };

  const handleStartsWithStringChange = (value) => {
    setStartsWithString(value);
  };

  const handleSelectedStreamChange = (value) => {
    setSelectedStream(value);
  };
  const formatDate = (expirationDate) => {
    const date = new Date(expirationDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [program1Suggestions, setProgramSuggestions] = useState([]);

  const programmeNames = programmes.map((programme) => programme.name);

  //   const uniqueProgrammeNamesSet = new Set();
  const handleSearch = () => {
    // setLoading(true);

    router.push({
      pathname: `/Programme/${programName}`,
      query: {
        programme_name_starts_with: startsWithString,
        accreditation_status: accreditationStatus,
        streams: selectedStream,
        department: department,
        subdepartment: subdepartment,
      },
    });
    //   .then(() => {
    //     setLoading(false); // Set loading to false after navigation is complete
    //   });
  };

  const handleSearchClick = () => {
    // Redirect to InstitutionDetails page with institutionName as a query parameter
    router.push({
      pathname: `/Institution/${institutionName}`,
      query: {
        name: institutionName,
        department: department, // Assuming department is available in scope
        subdepartment: subdepartment,
      },
    });
  };
  //   const uniqueInstitutionNamesSet = new Set();
  const uniqueProgrammeNamesSet = new Set();

  //   const uniqueNames = institutionNames.filter((name) => {
  //     if (uniqueInstitutionNamesSet.has(name)) {
  //       // If the name already exists in the set, it's a duplicate, so return false
  //       return false;
  //     } else {
  //       // If the name doesn't exist in the set, add it and return true
  //       uniqueInstitutionNamesSet.add(name);
  //       return true;
  //     }
  //   });
  //   console.log(uniqueNames);

  const uniqueProgrammes = programmeNames.filter((name) => {
    if (uniqueProgrammeNamesSet.has(name)) {
      return false;
    } else {
      uniqueProgrammeNamesSet.add(name);
      return true;
    }
  });

  // Suggestions for Programme Name
  const programSuggestions = [...uniqueProgrammeNamesSet];

  console.log(programSuggestions);
  const onProgramChange = (event, { newValue }) => {
    setProgramName(newValue);
  };
  return (
    <div
      className="bg-cover bg-center z-6000 font-serif"
      style={{ backgroundImage: `url(${NBTEHQ})` }}
      onClick={() => {
        console.log("Hello");
      }}
    >
      <Backdrop
        show={true}
        clicked={() => {}}
        cancelClicked={() => {
          router.back();
        }}
        accreditationStatus={accreditationStatus}
        startsWithString={startsWithString}
        selectedStream={selectedStream}
        onAccreditationStatusChange={handleAccreditationStatusChange}
        onStartsWithStringChange={handleStartsWithStringChange}
        onSelectedStreamChange={handleSelectedStreamChange}
      />
      <Image src={NBTEHQ} priority className="h-[100vh]" />
      <Autocomplete
        freeSolo
        options={program1Suggestions}
        value={programName}
        onChange={(event, newValue) => setProgramName(newValue)}
        // onChange={(event, newValue) => setInstitutionName(newValue)}
        onInputChange={(event, newInputValue) => {
          // Fetch institution suggestions based on new input value
          // Update institutionSuggestions state
          const inputValue = newInputValue.trim().toLowerCase();
          const filteredSuggestions = programSuggestions.filter((suggestion) =>
            suggestion.toLowerCase().startsWith(inputValue)
          );
          setProgramSuggestions(filteredSuggestions);
        }}
        sx={{
          width: "60vw", // Add this line to make the CustomAutocomplete 60% of the screen width
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 500,
          backgroundColor: "#ffffff",
          borderRadius: 24,
          ":hover": {
            backgroundColor: "#f1f3f4",
          },
          "&.Mui-focused": {
            backgroundColor: "#f1f3f4",
          },
        }}
        renderInput={(params) => (
          <Box
            sx={{
              position: "relative",
              borderRadius: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:focus-within": {
                outline: "none",
                borderColor: "#2196F3",
                boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.2)",
                zIndex: 600,
              },
            }}
          >
            <TextField
              {...params}
              placeholder={`Search ${
                subdepartment ? `${department} ${subdepartment}` : department
              } Programme`}
              // inputProps={{
              //   readOnly: false,
              // }}
              InputProps={{
                ...params.InputProps,

                endAdornment: (
                  <Box
                    sx={{
                      backgroundColor: "#4caf50",
                      borderRadius: "0 24px 24px 0",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "4px",
                      width: "60px",
                      cursor: "pointer",
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                      zIndex: 600,
                    }}
                    onClick={handleSearch}
                  >
                    <SearchIcon sx={{ fontSize: 30 }} />
                  </Box>
                ),
              }}
            />
          </Box>
        )}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  try {
    // Fetch data from the first URL
    // const response1 = await axios.get(
    //   "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-Institutions"
    // );
    // const institutions = response1.data.institutions;

    // Fetch data from the second URL
    const response2 = await axios.get(
      "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-Programmes"
    );
    const programmes = response2.data.programs;

    // Return the fetched data to the component
    return {
      props: {
        programmes,
        department: query.department || "",
        subdepartment: query.subdepartment || "",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    // Return empty props or handle the error as needed
    return {
      props: {
        programmes: null,
        department: query.department || "",
        subdepartment: query.subdepartment || "",
      },
    };
  }
}
//   console.log(filteredProgrammes);
//   let totalPrograms = 0;
//   if (arrayInstitutionsAndProgrammes[0]?.[1]) {
//     arrayInstitutionsAndProgrammes[0][1].forEach((institution) => {
//       // Access the array of programs for each institution
//       const programs = institution.programmes;

//       // Add the number of programs in the current institution to the total
//       totalPrograms += programs.length;
//     });
//   }
// arrayInstitutionsAndProgrammes[0][1].forEach((institution) => {
//   // Access the array of programs for each institution
//   const programs = institution.programmes;

//   // Add the number of programs in the current institution to the total
//   totalPrograms += programs.length;
// });

//   console.log("Total number of all programs in institutions:", totalPrograms);
//   //   console.log(arrayInstitutionsAndProgrammes[0][1].length);

//   const itemsPerPage = 100; // Adjust the number of items per page
//   const [currentPage, setCurrentPage] = useState(1);
//   var accumulator = 0;
//   const pageCount = Math.ceil(totalPrograms / itemsPerPage);
//   const pageCount = arrayInstitutionsAndProgrammes[0][1].length;
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };
//   var lastIndices = [];
//   const allPrograms = arrayInstitutionsAndProgrammes[0]?.[1]?.reduce(
//     (acc, institution) => {
//       const institutionPrograms = institution.programmes.map(
//         (program, index) => ({
//           institutionName: institution.institution_name,
//           programNumber: index + 1,
//           ...program,
//         })
//       );
//       const lastProgramIndex = acc.length + institutionPrograms.length - 1;
//       lastIndices.push(lastProgramIndex);
//       institution.lastProgramIndex = lastProgramIndex;
//       console.log(institution.lastProgramIndex);
//       return acc.concat(institutionPrograms);
//     },
//     []
//   );
//   setFilteredProgrammes(allPrograms);

// Calculate the total number of pages based on the number of programs

//   var startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = arrayInstitutionsAndProgrammes[0][1].slice(
//     startIndex,
//     endIndex
//   );

//   const [filteredProgrammes, setFilteredProgrammes] = useState(allPrograms);
//   useEffect(() => {
//     filterAllPrograms();
//   }, [query]);
//   const filterAllPrograms = () => {
//     let filteredData = allPrograms; // Reset to original data
//     console.log(filteredData);
//     const {
//       programme_name_contains,
//       programme_name_starts_with,
//       accreditation_status,
//       streams,
//     } = query;
//     if (programme_name_contains) {
//       filteredData = filteredData.filter((program) =>
//         searchByInstitution
//           ? program.institutionName
//               .toLowerCase()
//               .includes(programme_name_contains.toLowerCase())
//           : program.name
//               .toLowerCase()
//               .includes(programme_name_contains.toLowerCase())
//       );
//     }

//     if (programme_name_starts_with && programme_name_starts_with !== "none") {
//       filteredData = filteredData.filter((program) =>
//         program.name.startsWith(programme_name_starts_with)
//       );
//     }

//     if (accreditation_status && accreditation_status !== "all") {
//       filteredData = filteredData.filter(
//         (program) => program.accreditationStatus === accreditation_status
//       );
//     }

//     if (streams && streams !== "any") {
//       filteredData = filteredData.filter(
//         (program) => program.approvedStream === parseInt(streams)
//       );
//     }
//     filteredData.sort((a, b) =>
//       a.institutionName.localeCompare(b.institutionName)
//     );
//     setFilteredProgrammes(filteredData);
//     console.log(filteredProgrammes);
//     setPageCount(Math.ceil(filteredData.length / itemsPerPage));
//   };
//   console.log(arrayInstitutionsAndProgrammes[0][1][1]);
//   console.log(
//     groupProgrammesByFaculty(arrayInstitutionsAndProgrammes[0][1][0])
//   );
//   console.log(filteredProgrammes);
//   console.log(searchByInstitution);

//   const CustomAutocomplete = styled(Autocomplete)({
//     "& .MuiAutocomplete-inputRoot": {
//       borderRadius: "24px",
//       backgroundColor: "#ffffff",
//       "&:hover": {
//         backgroundColor: "#f1f3f4",
//       },
//       "&.Mui-focused": {
//         backgroundColor: "#f1f3f4",
//       },
//     },
//   });
//   const uniqueInstitutionNamesSet = new Set();
//   const uniqueProgrammeNamesSet = new Set();

//   const uniqueNames = institutionNames.filter((name) => {
//     if (uniqueInstitutionNamesSet.has(name)) {
//       // If the name already exists in the set, it's a duplicate, so return false
//       return false;
//     } else {
//       // If the name doesn't exist in the set, add it and return true
//       uniqueInstitutionNamesSet.add(name);
//       return true;
//     }
//   });
//   console.log(uniqueNames);

//   let institutionSuggestions = [...uniqueInstitutionNamesSet];
//   institutionSuggestions = institutionSuggestions.map((name) => {
//     // Split the name into words
//     const words = name.toLowerCase().split(" ");

//     // Capitalize the first letter of each word
//     const capitalizedWords = words.map(
//       (word) => word.charAt(0).toUpperCase() + word.slice(1)
//     );

//     // Join the words back together to form the sentence case name
//     return capitalizedWords.join(" ");
//   });

// const handleBack = () => {
//   router.push("/");
// };

// import React, { useEffect, useState } from "react";
// import NBTE from "../public/favicon.ico";
// import { Autocomplete, Pagination, TextField, Box } from "@mui/material";
// import { MdSearch } from "react-icons/md";
// import { MdOutlineUpdate } from "react-icons/md";
// import { MdOutlineAdd } from "react-icons/md";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import RingLoader from "react-spinners/RingLoader";
// import Image from "next/image";
// import { FaSearch } from "react-icons/fa";
// import LIGHT_NBTE from "./light_nbte.png";
// import Backdrop from "./components/Backdrop";

// export default function searchInstitutionsByProgrammes() {
//   return (
//     <div
//       className="bg-cover bg-center"
//       style={{ backgroundImage: `url(${LIGHT_NBTE})` }}
//     >
//       <Backdrop show={true} clicked={() => {}} />

//       <Image src={LIGHT_NBTE} priority className="h-[100vh]" />

//       <Autocomplete
//         freeSolo
//         options={institution1Suggestions}
//         value={institutionName}
//         onChange={(event, newValue) => setInstitutionName(newValue)}
//         onInputChange={(event, newInputValue) => {
//           // Fetch institution suggestions based on new input value
//           // Update institutionSuggestions state
//           const inputValue = newInputValue.trim().toLowerCase();
//           const filteredSuggestions = institutionSuggestions.filter(
//             (suggestion) => suggestion.toLowerCase().startsWith(inputValue)
//           );
//           setInstitutionSuggestions(filteredSuggestions);
//         }}
//         sx={{
//           width: "60vw", // Add this line to make the CustomAutocomplete 60% of the screen width
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           zIndex: 500,
//           backgroundColor: "#ffffff",
//           borderRadius: 24,
//           ":hover": {
//             backgroundColor: "#f1f3f4",
//           },
//           "&.Mui-focused": {
//             backgroundColor: "#f1f3f4",
//           },
//         }}
//         renderInput={(params) => (
//           <Box
//             sx={{
//               position: "relative",
//               borderRadius: "24px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               "&:focus-within": {
//                 outline: "none",
//                 borderColor: "#2196F3",
//                 boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.2)",
//                 zIndex: 600,
//               },
//             }}
//           >
//             <TextField
//               {...params}
//               placeholder={`Search ${
//                 subdepartment ? `${department} ${subdepartment}` : department
//               } Institution`}
//               // inputProps={{
//               //   readOnly: false,
//               // }}
//               InputProps={{
//                 ...params.InputProps,

//                 endAdornment: (
//                   <Box
//                     sx={{
//                       backgroundColor: "#4caf50",
//                       borderRadius: "0 24px 24px 0",
//                       color: "#fff",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       padding: "4px",
//                       width: "60px",
//                       cursor: "pointer",
//                       position: "absolute",
//                       right: 0,
//                       top: 0,
//                       bottom: 0,
//                       zIndex: 600,
//                     }}
//                     onClick={handleSearchClick}
//                   >
//                     <SearchIcon sx={{ fontSize: 30 }} />
//                   </Box>
//                 ),
//               }}
//             />
//             <div style={{ marginTop: 10 }}>
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel htmlFor="level-select">Level</InputLabel>
//                 <Select
//                   value={startsWithString}
//                   onChange={(e) => setStartsWithString(e.target.value)}
//                   input={<OutlinedInput label="Level" />}
//                   id="level-select"
//                 >
//                   <MenuItem value="none">None</MenuItem>
//                   <MenuItem value="ND">ND</MenuItem>
//                   <MenuItem value="HND">HND</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel htmlFor="accreditation-status-select">
//                   Accreditation Status
//                 </InputLabel>
//                 <Select
//                   value={accreditationStatus}
//                   onChange={(e) => setAccreditationStatus(e.target.value)}
//                   input={<OutlinedInput label="Accreditation Status" />}
//                   id="accreditation-status-select"
//                 >
//                   <MenuItem value="all">All</MenuItem>
//                   <MenuItem value="Accredited">Accredited</MenuItem>
//                   <MenuItem value="Interim">Interim</MenuItem>
//                   <MenuItem value="Expired">Expired</MenuItem>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel htmlFor="number-of-streams-select">
//                   Number of Streams
//                 </InputLabel>
//                 <Select
//                   value={selectedStream}
//                   onChange={(e) => setSelectedStream(e.target.value)}
//                   input={<OutlinedInput label="Number of Streams" />}
//                   id="number-of-streams-select"
//                 >
//                   <MenuItem value="any">Any</MenuItem>
//                   {Array.from({ length: 100 }, (_, index) => index + 1).map(
//                     (number) => (
//                       <MenuItem key={number} value={number}>
//                         {number}
//                       </MenuItem>
//                     )
//                   )}
//                 </Select>
//               </FormControl>
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel htmlFor="search-by-institutions-select">
//                   Search by Institutions
//                 </InputLabel>
//                 <Select
//                   value={searchByInstitution ? "yes" : "no"}
//                   onChange={(e) =>
//                     setSearchByInstitution(e.target.value === "yes")
//                   }
//                   input={<OutlinedInput label="Search by Institutions" />}
//                   id="search-by-institutions-select"
//                 >
//                   <MenuItem value="no">No</MenuItem>
//                   <MenuItem value="yes">Yes</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>
//           </Box>
//         )}
//       />
//     </div>
//   );
// }
