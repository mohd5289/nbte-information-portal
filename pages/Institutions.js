import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  List,
  ListItem,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import Layout from "./components/Layout";
import TopNav from "./components/TopNav";

const Institutions = ({ institutions }) => {
  console.log(institutions);
  //   const [isPointingInstitution, setIsPointingInstitution] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  var categories = ["Accredited", "Interim", "Expired"];
  var brands = ["All, None, Some"];

  var ratings = ["All, None, Some"];
  var prices = ["All, None, Some"];
  return (
    <div>
      <TopNav></TopNav>
      <div className="flex flex-col md:flex-row justify-between items-center w-3/4">
        <Grid className="mt-4" container spacing={1}>
          <Grid item md={12}>
            <List>
              <ListItem>
                <Box className="w-full">
                  <Typography> Categories</Typography>
                  <Select fullWidth value={"None"}>
                    <MenuItem value="all">All</MenuItem>
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="w-full">
                  <Typography>Brands</Typography>
                  <Select value={"None"} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="w-full">
                  <Typography>Prices</Typography>
                  <Select value={"None"} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price.value} value={price.value}>
                        {price.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="w-full">
                  <Typography>Ratings</Typography>
                  <Select value={"None"} fullWidth>
                    <MenuItem value="all">All</MenuItem>
                    {ratings.map((rating) => (
                      <MenuItem display="flex" key={rating} value={rating}>
                        <Rating value={rating} readOnly />
                        <Typography component="span">&amp; Up</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <div className="flex flex-col md:ml-6 mt-6 group text-center items-center w-5/6 mr-auto ">
          <div className="flex flex-col items-center">
            <h2 className="font-roboto text-3xl font-bold mb-3">
              List of Federal Institutions{" "}
            </h2>
            <h4>Click any programme to see their current status</h4>{" "}
          </div>
          <div className="flex flex-col mt-4 items-center">
            {institutions.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`border border-gray-300  shadow-md p-4 ml-4 mr-4 text-center w-200 block mb-2.5 rounded-full bg-white-300 ${
                  hoveredIndex === index
                    ? "group-hover:bg-green-600 scale-110"
                    : ""
                }`}
              >
                <h3>{item.name.toUpperCase()}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    // ax;
    // Fetch data from Laravel API endpoint using Axios
    const response = await axios.get("http://localhost:8000/api/institutions");
    const institutions = response.data.institutions;

    return {
      props: {
        institutions,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        institutions: [],
      },
    };
  }
}

export default Institutions;
