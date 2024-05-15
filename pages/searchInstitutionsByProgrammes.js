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
import LIGHT_NBTE from "./light_nbte.png";
import Backdrop from "./components/Backdrop";

export default function searchInstitutionsByProgrammes() {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${LIGHT_NBTE})` }}
    >
      <Backdrop show={true} clicked={() => {}} />

      <Image src={LIGHT_NBTE} priority className="h-[100vh]" />

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
                    onClick={handleSearchClick}
                  >
                    <SearchIcon sx={{ fontSize: 30 }} />
                  </Box>
                ),
              }}
            />
            <div style={{ marginTop: 10 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel htmlFor="level-select">Level</InputLabel>
                <Select
                  value={startsWithString}
                  onChange={(e) => setStartsWithString(e.target.value)}
                  input={<OutlinedInput label="Level" />}
                  id="level-select"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="ND">ND</MenuItem>
                  <MenuItem value="HND">HND</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel htmlFor="accreditation-status-select">
                  Accreditation Status
                </InputLabel>
                <Select
                  value={accreditationStatus}
                  onChange={(e) => setAccreditationStatus(e.target.value)}
                  input={<OutlinedInput label="Accreditation Status" />}
                  id="accreditation-status-select"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Accredited">Accredited</MenuItem>
                  <MenuItem value="Interim">Interim</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel htmlFor="number-of-streams-select">
                  Number of Streams
                </InputLabel>
                <Select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  input={<OutlinedInput label="Number of Streams" />}
                  id="number-of-streams-select"
                >
                  <MenuItem value="any">Any</MenuItem>
                  {Array.from({ length: 100 }, (_, index) => index + 1).map(
                    (number) => (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel htmlFor="search-by-institutions-select">
                  Search by Institutions
                </InputLabel>
                <Select
                  value={searchByInstitution ? "yes" : "no"}
                  onChange={(e) =>
                    setSearchByInstitution(e.target.value === "yes")
                  }
                  input={<OutlinedInput label="Search by Institutions" />}
                  id="search-by-institutions-select"
                >
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        )}
      />
    </div>
  );
}
