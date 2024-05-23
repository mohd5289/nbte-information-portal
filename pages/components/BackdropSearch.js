import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Backdrop = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [accreditationStatus, setAccreditationStatus] = useState("all");
  const [startsWithString, setStartsWithString] = useState("none");
  const [selectedStream, setSelectedStream] = useState("any");

  return props.show ? (
    <div className="Backdrop" onClick={props.clicked}>
      <button
        className="absolute top-4 left-4 text-white bg-transparent border-none text-lg cursor-pointer"
        onClick={props.cancelClicked}
      >
        X
      </button>
      <div
        style={{ marginTop: 10, color: "white" }}
        className=" flex flex-col items-center"
      >
        {/* First FormControl */}
        <FormControl sx={{ minWidth: 120, width: 360, marginTop: 10 }}>
          <InputLabel htmlFor="level-select" style={{ color: "white" }}>
            Level
          </InputLabel>
          <Select
            value={props.startsWithString}
            // startsWithString
            style={{ border: "1px solid white", color: "white" }}
            onChange={(e) => props.onStartsWithStringChange(e.target.value)}
            input={<OutlinedInput label="Level" />}
            id="level-select"
            sx={{ "& .MuiSelect-icon": { color: "white" } }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="ND">ND</MenuItem>
            <MenuItem value="HND">HND</MenuItem>
          </Select>
        </FormControl>
        {/* Second FormControl */}
        <FormControl sx={{ minWidth: 120, width: 360, marginTop: 2 }}>
          <InputLabel
            htmlFor="accreditation-status-select"
            style={{ color: "white" }}
          >
            Accreditation Status
          </InputLabel>
          <Select
            value={props.accreditationStatus}
            // accreditationStatus
            style={{ border: "1px solid white", color: "white" }}
            onChange={(e) => props.onAccreditationStatusChange(e.target.value)}
            input={<OutlinedInput label="Accreditation Status" />}
            id="accreditation-status-select"
            sx={{ "& .MuiSelect-icon": { color: "white" } }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Accredited">Accredited</MenuItem>
            <MenuItem value="Interim">Interim</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
          </Select>
        </FormControl>
        {/* Third FormControl */}
        <FormControl
          sx={{ minWidth: 120, width: 360, marginTop: 2, marginBottom: 10 }}
        >
          <InputLabel
            htmlFor="number-of-streams-select"
            style={{ color: "white" }}
          >
            Number of Streams
          </InputLabel>
          <Select
            value={props.selectedStream}
            // selectedStream
            style={{ border: "1px solid white", color: "white" }}
            onChange={(e) => props.onSelectedStreamChange(e.target.value)}
            input={<OutlinedInput label="Number of Streams" />}
            id="number-of-streams-select"
            IconComponent={ExpandMoreIcon}
            sx={{ "& .MuiSelect-icon": { color: "white" } }}
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
      </div>
    </div>
  ) : null;
};
export default Backdrop;

{
  /* Fourth FormControl
        <FormControl sx={{ minWidth: 120, width: 360, marginTop: 2 }}>
          <InputLabel
            htmlFor="search-by-institutions-select"
            style={{ color: "white" }}
          >
            Search by Institutions
          </InputLabel>
          <Select
            style={{ border: "1px solid white", color: "white" }}
            value={"no"}
            // searchByInstitution ? "yes" : "no"
            onChange={(e) => setSearchByInstitution(e.target.value === "yes")}
            input={<OutlinedInput label="Search by Institutions" />}
            id="search-by-institutions-select"
            IconComponent={ExpandMoreIcon}
            sx={{ "& .MuiSelect-icon": { color: "white" } }}
          >
            <MenuItem value="no">No</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
          </Select>
        </FormControl> */
}
