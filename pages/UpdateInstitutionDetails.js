import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Backdrop from "./components/Backdrop";
import FadeLoader from "react-spinners/FadeLoader";
export default function UpdateInstitutionDetails({ institutions }) {
  console.log(institutions);
  const [institution1Suggestions, setInstitutionSuggestions] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const institutionNames = institutions.map((institution) => institution.name);
  const [address, setAddress] = useState("");
  const [ownership, setOwnership] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [proprietorName, setProprietorName] = useState("");
  const [proprietorEmail, setProprietorEmail] = useState("");
  const [proprietorPhone, setProprietorPhone] = useState("");
  const [rectorName, setRectorName] = useState("");
  const [rectorEmail, setRectorEmail] = useState("");
  const [rectorPhone, setRectorPhone] = useState("");
  const [registrarName, setRegistrarName] = useState("");
  const [registrarEmail, setRegistrarEmail] = useState("");
  const [registrarPhone, setRegistrarPhone] = useState("");
  const [loading, setLoading] = useState(false);
  //   const programmeNames = programmes.map((programme) => programme.name);
  const handleSubmit = async () => {
    // Prepare data to send to the backend

    const confirmed = window.confirm(
      `Are you sure you want to submit the extra institution details ?`
    );
    const requestData = {
      name: institutionName,
      address: address,
      ownership: ownership,
      year_established: yearEstablished,
      proprietor_name: proprietorName,
      proprietor_email: proprietorEmail,
      proprietor_phone: proprietorPhone,
      rector_name: rectorName,
      rector_email: rectorEmail,
      rector_phone: rectorPhone,
      registrar_name: registrarName,
      registrar_email: registrarEmail,
      registrar_phone: registrarPhone,
    };
    if (confirmed) {
      setLoading(true);
      try {
        // Send a POST request to the backend endpoint to update institution details
        const response = await axios.post(
          "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/updateInstitutionDetails",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle success response
        console.log(response.data.message); // Log success message
        // Optionally, you can perform additional actions here, such as showing a success message to the user or redirecting them to another page
        setInstitutionName("");
        setAddress("");
        setOwnership("");
        setYearEstablished("");
        setProprietorName("");
        setProprietorEmail("");
        setProprietorPhone("");
        setRectorName("");
        setRectorEmail("");
        setRectorPhone("");
        setRegistrarName("");
        setRegistrarEmail("");
        setRegistrarPhone("");
        setLoading(false);
        toast.success(`Institution  details added successfully`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        });
      } catch (error) {
        // Handle error response
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error(
            "Server responded with error:",
            error.response.data.errors
          );
          setLoading(false);
          toast.error(
            `${error.response.data.errors}Failed to add institution details`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              className: "toast-error",
            }
          );
          // Optionally, you can display the error message to the user or handle it in another way
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server:", error.request);
          // Optionally, you can inform the user about the issue
          setLoading(false);
          toast.error(`${error.request}Failed to add institution details`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-error",
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error(
            "An error occurred while sending the request:",
            error.message
          );
          setLoading(false);
          toast.error(`${error.message}Failed to add institution details`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-error",
          });
          // Optionally, you can inform the user about the issue
        }
      }
    }
  };
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
  return (
    <div className="relative">
      <Backdrop show={loading} clicked={false} />
      <FadeLoader
        color="#36d7b7"
        loading={loading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <ToastContainer position="top-center" />
      <div className="flex flex-col w-60% border border-gray-300 shadow-md m-64 justify-center items-center">
        <h1 className="text-center font-bold text-xl mt-2">
          {" "}
          Update Institution Details
        </h1>
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
              (suggestion) => suggestion.toLowerCase().startsWith(inputValue)
            );
            setInstitutionSuggestions(filteredSuggestions);
          }}
          sx={{
            width: "80%",
            margin: 2,
            padding: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            "&:focus": {
              outline: "none",
              borderColor: "#2196F3",
              boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.2)",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Institution Name"
              variant="outlined"
            />
          )}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={inputStyles}
        />

        {/* Dropdown for Ownership */}
        <Select
          id="ownership"
          variant="outlined"
          value={ownership}
          onChange={(e) => setOwnership(e.target.value)}
          displayEmpty
          sx={inputStyles}
        >
          <MenuItem value="" disabled>
            Ownership
          </MenuItem>
          <MenuItem value="Federal">Federal</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
          <MenuItem value="State">State</MenuItem>
        </Select>

        {/* Conditional rendering based on ownership */}
        {ownership === "Private" && (
          <>
            <TextField
              label="Rector Name"
              variant="outlined"
              value={rectorName}
              onChange={(e) => setRectorName(e.target.value)}
              sx={inputStyles}
            />
            <TextField
              label="Rector Email"
              variant="outlined"
              value={rectorEmail}
              onChange={(e) => setRectorEmail(e.target.value)}
              sx={inputStyles}
              type="email"
            />
            <TextField
              label="Rector Phone"
              variant="outlined"
              value={rectorPhone}
              onChange={(e) => setRectorPhone(e.target.value)}
              sx={inputStyles}
              type="tel"
            />
            <TextField
              label="Proprietor Name"
              variant="outlined"
              value={proprietorName}
              onChange={(e) => setProprietorName(e.target.value)}
              sx={inputStyles}
            />
            <TextField
              label="Proprietor Email"
              variant="outlined"
              value={proprietorEmail}
              onChange={(e) => setProprietorEmail(e.target.value)}
              sx={inputStyles}
              type="email"
            />
            <TextField
              label="Proprietor Phone"
              variant="outlined"
              value={proprietorPhone}
              onChange={(e) => setProprietorPhone(e.target.value)}
              sx={inputStyles}
              type="tel"
            />
          </>
        )}

        {ownership !== "Private" && (
          <>
            <TextField
              label="Rector Name"
              variant="outlined"
              value={rectorName}
              onChange={(e) => setRectorName(e.target.value)}
              sx={inputStyles}
            />
            <TextField
              label="Rector Email"
              variant="outlined"
              value={rectorEmail}
              onChange={(e) => setRectorEmail(e.target.value)}
              sx={inputStyles}
              type="email"
            />
            <TextField
              label="Rector Phone"
              variant="outlined"
              value={rectorPhone}
              onChange={(e) => setRectorPhone(e.target.value)}
              sx={inputStyles}
              type="tel"
            />
            <TextField
              label="Registrar Name"
              variant="outlined"
              value={registrarName}
              onChange={(e) => setRegistrarName(e.target.value)}
              sx={inputStyles}
            />
            <TextField
              label="Registrar Email"
              variant="outlined"
              value={registrarEmail}
              onChange={(e) => setRegistrarEmail(e.target.value)}
              sx={inputStyles}
              type="email"
            />
            <TextField
              label="Registrar Phone"
              variant="outlined"
              value={registrarPhone}
              onChange={(e) => setRegistrarPhone(e.target.value)}
              sx={inputStyles}
              type="tel"
            />
          </>
        )}

        <TextField
          label="Year Established"
          variant="outlined"
          value={yearEstablished}
          onChange={(e) => setYearEstablished(e.target.value)}
          sx={inputStyles}
          type="number"
        />
        <button
          className="mb-2 bg-green-400 mt-2 w-1/2 mx-auto  hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          //   onClick={handleAddInstitution}
          onClick={handleSubmit}
        >
          Submit Institution Details
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://warm-brook-98900-a7ef17680d47.herokuapp.com/api/all-Institutions"
    );
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
