// import React from 'react'
import React, { useEffect, useState } from "react";
import NBTE from "../public/favicon.ico";
import {
  Autocomplete,
  Pagination,
  TextField,
  Box,
  Button,
} from "@mui/material";
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
import Backdrop from "./components/BackdropFilterInstitution";
// import { useHistory } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "green",
  },
});
export default function SelectFilterInstitution() {
  const router = useRouter();
  const [ownership, setOwnership] = useState("");
  const [zone, setZone] = useState("");
  const { query } = router;
  const handleOwnershipChange = (value) => {
    setOwnership(value);
  };
  const { department, subdepartment } = query ?? props;
  const handleSelectedZoneChange = (value) => {
    setZone(value);
  };
  const handleSearch = () => {
    // setLoading(true);

    router.push({
      pathname: "/filterInstitutions",
      query: {
        zone: zone,
        ownership: ownership,
        department: department,
        subdepartment: subdepartment,
      },
    });
    //   .then(() => {
    //     setLoading(false); // Set loading to false after navigation is complete
    //   });
  };
  return (
    <div
      className="bg-cover bg-center z-6000 relative font-serif"
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
          console.log("Stop");
        }}
        ownership={ownership}
        zone={zone}
        onOwnershipChange={handleOwnershipChange}
        onZoneChange={handleSelectedZoneChange}
      />
      <Image src={NBTEHQ} priority className="h-[100vh]" />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        sx={{
          top: {
            xs: "90%", // Small screens
            sm: "70%", // Medium screens
            md: "60%", // Large screens
            lg: "50%", // Extra-large screens
          },
          left: {
            xs: "38%", // Small screens
            sm: "42%", // Medium screens
            md: "47%", // Large screens
            lg: "47%", // Extra-large screens
          },
        }}
        width="100px"
        height="100px"
        zIndex="400"
        mt={2}
      >
        <CustomButton
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </CustomButton>
      </Box>
    </div>
  );
}
