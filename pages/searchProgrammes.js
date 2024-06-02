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
// import Backdrop from "./components/Backdrop";
import Backdrop from "./components/BackdropK";
// import { useHistory } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
export default function Search({ institutions }) {
  // const institutions = [
  //   "Auchi Polytechnic, Auchi",
  //   "Kaduna Polytechnic, Kaduna",
  // ];

  console.log(institutions);
  const [institution1Suggestions, setInstitutionSuggestions] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const institutionNames = institutions.map((institution) => institution.name);
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

  const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: "24px",
      backgroundColor: "#f1f3f4",
      "& fieldset": {
        borderColor: "#f1f3f4",
      },
      "&:hover fieldset": {
        borderColor: "#f1f3f4",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2196f3",
      },
      "& .MuiInputAdornment-root": {
        backgroundColor: "#4caf50", // Green background for the search icon area
        borderRadius: "0 24px 24px 0", // Rounded border for the right side
        color: "#fff", // White color for the search icon
      },
    },
  });

  const CustomAutocomplete = styled(Autocomplete)({
    "& .MuiAutocomplete-inputRoot": {
      borderRadius: "24px",
      backgroundColor: "#ffffff",
      "&:hover": {
        backgroundColor: "#f1f3f4",
      },
      "&.Mui-focused": {
        backgroundColor: "#f1f3f4",
      },
    },
  });
  const uniqueInstitutionNamesSet = new Set();
  //   const uniqueProgrammeNamesSet = new Set();

  const uniqueNames = institutionNames.filter((name) => {
    if (uniqueInstitutionNamesSet.has(name)) {
      // If the name already exists in the set, it's a duplicate, so return false
      return false;
    } else {
      // If the name doesn't exist in the set, add it and return true
      uniqueInstitutionNamesSet.add(name);
      return true;
    }
  });
  console.log(uniqueNames);

  let institutionSuggestions = [...uniqueInstitutionNamesSet];
  institutionSuggestions = institutionSuggestions.map((name) => {
    // Split the name into words
    const words = name.toLowerCase().split(" ");

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words back together to form the sentence case name
    return capitalizedWords.join(" ");
  });

  // const handleBack = () => {
  //   router.push("/");
  // };
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
      />
      <Image src={NBTEHQ} priority className="h-[100vh]" />
      <Autocomplete
        freeSolo
        options={institution1Suggestions}
        value={institutionName}
        onChange={(event, newValue) => setInstitutionName(newValue)}
        onInputChange={(event, newInputValue) => {
          // Fetch institution suggestions based on new input value
          // Update institutionSuggestions state
          const inputValue = newInputValue.trim().toLowerCase();
          const filteredSuggestions = institutionSuggestions.filter(
            (suggestion) => suggestion.toLowerCase().includes(inputValue)
          );
          setInstitutionSuggestions(filteredSuggestions);
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
              } Institution`}
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
                    // onClick={ handleSearchClick}
                    onClick={institutionName ? handleSearchClick : undefined}
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

    // console.log(response);
    const institutions = response.data.institutions;
    // console.log(response);
    return {
      props: {
        institutions,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        institutions: null,
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
