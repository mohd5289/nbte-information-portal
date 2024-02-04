import React from "react";
import TopNav from "../components/TopNav";
import axios from "axios";

const InstitutionProgrammes = ({ programmes }) => {
  return (
    <div>
      {" "}
      <TopNav />
      <Grid className="mt-4" container spacing={1}>
        <Grid item md={3}>
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
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.
          <Link href={"/"} passHref>
            <MUILink> Go shopping</MUILink>
          </Link>
        </div>
      ) : (
        <Grid container spacing={1} direction="row">
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>
                          <MUILink>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </MUILink>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>
                          <MUILink>
                            <Typography>{item.name}</Typography>
                          </MUILink>
                        </Link>
                      </TableCell>

                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h4">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) :$
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkoutHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    CHECK OUT
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export async function getServerSideProps({ params }) {
  const institutionName = params.name;

  try {
    // Fetch data from Laravel API endpoint using Axios
    const response = await axios.get(
      `http://localhost:8000/api/institution/${institutionName}`
    );
    const programmes = response.data.programmes;

    return {
      props: {
        programmes,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        programmes: [],
      },
    };
  }
}
export default InstitutionProgrammes;
