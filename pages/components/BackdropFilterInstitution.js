import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Backdrop = (props) => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [accreditationStatus, setAccreditationStatus] = useState("all");
  // const [startsWithString, setStartsWithString] = useState("none");
  // const [selectedStream, setSelectedStream] = useState("any");

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
            Ownership
          </InputLabel>
          <Select
            value={props.ownership}
            // startsWithString
            style={{ border: "1px solid white", color: "white" }}
            onChange={(e) => props.onOwnershipChange(e.target.value)}
            input={<OutlinedInput label="Ownership" />}
            id="level-select"
            sx={{ "& .MuiSelect-icon": { color: "white" } }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Federal">Federal</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="State">State</MenuItem>
          </Select>
        </FormControl>
        {/* Second FormControl */}
        <FormControl sx={{ minWidth: 120, width: 360, marginTop: 2 }}>
          <InputLabel htmlFor="zone-select" style={{ color: "white" }}>
            Zone
          </InputLabel>
          <Select
            value={props.zone}
            // accreditationStatus
            style={{ border: "1px solid white", color: "white" }}
            onChange={(e) => props.onZoneChange(e.target.value)}
            input={<OutlinedInput label="Zone" />}
            id="zone-select"
            sx={{ "& .MuiSelect-icon": { color: "white" } }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="South East">SOUTH EAST</MenuItem>
            <MenuItem value="North East">NORTH EAST</MenuItem>
            <MenuItem value="North West">NORTH WEST</MenuItem>
            <MenuItem value="North Central">NORTH CENTRAL</MenuItem>
            <MenuItem value="South South">SOUTH SOUTH</MenuItem>
            <MenuItem value="South West">SOUTH WEST</MenuItem>
          </Select>
        </FormControl>
        {/* Third FormControl */}
      </div>
    </div>
  ) : null;
};
export default backdrop;

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
