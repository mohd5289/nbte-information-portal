import React, { useContext } from "react";
// import "tabler-react/dist/Tabler.css";
// import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import Link from "next/link";
// import { Menu } from "antd";
// import { Home, Settings, User } from "tabler-icons-react";
// import { Container, Navbar, Nav, Dropdown, NavLink } from "tabler-react";
// import { Home, Settings, User } from "tabler-icons-react";
import "./TopNav.module.css";
// import Link from "next/link";
// import {
//   AppstoreOutlined,
//   CoffeeOutlined,
//   LoginOutlined,
//   LogoutOutlined,
//   UserAddOutlined,
// } from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";
// import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import { SubMenu } from "antd/es/menu/SubMenu";

// const { Item, SubMenu } = Menu;
const TopNav = () => {
  // const float = {
  //   float: "right",
  // };

  const [current, setCurrent] = useState("");
  // const { state, dispatch } = useContext(Context);
  const router = useRouter();
  // const { user } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    // console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    handleNotificationClose();
    toast(data.message);
    router.push("/");
  };
  // console.log(user);
  return (
    <AppBar
      position="static"
      elevation={2}
      style={{
        backgroundColor: "white",
        border: "3px solid #e0e0e0",

        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ color: "#333", flexGrow: 1 }}>
          My App
        </Typography>
        <div>
          (
          <>
            <IconButton aria-label="notifications" color="inherit">
              <LoginSharpIcon style={{ color: "#333" }} />
              <Typography
                variant="body1"
                style={{ marginLeft: 5, color: "#333" }}
              >
                <Link href={"/login"}>
                  <a>Login</a>
                </Link>
              </Typography>
            </IconButton>

            <IconButton aria-label="mail" color="inherit">
              <AppRegistrationSharpIcon style={{ color: "#333" }} />
              <Typography
                variant="body1"
                style={{ marginLeft: 5, color: "#333" }}
              >
                <Link href={"/register"}>
                  <a>Register</a>
                </Link>
              </Typography>
            </IconButton>
          </>
          )
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
// {/* <Menu mode="horizontal" selectedKeys={[current]}>
//       <Item
//         key="/"
//         icon={<AppstoreOutlined />}
//         onClick={(e) => setCurrent(e.key)}
//       >
//         <Link href={"/"}>
//           <a>App</a>
//         </Link>
//       </Item>

//       {user === null && (
//         <>
//           <Item key={"/login"} icon={<LoginOutlined />}>
//             <Link href={"/login"}>
//               <a>Login</a>
//             </Link>
//           </Item>
//           <Item key={"/register"} icon={<UserAddOutlined />}>
//             <Link href={"/register"}>
//               <a>Register</a>
//             </Link>
//           </Item>
//         </>
//       )}
//       {user !== null && (
//         <SubMenu
//           icon={<CoffeeOutlined />}
//           title={user && user.name}
//           className="float-end"
//         >
//           {" "}
//           <Item
//             onClick={logout}
//             icon={<LogoutOutlined />}
//             className="float-end"
//           >
//             {/* <Link href={"/logout"}> */}
//             Logout
//             {/* </Link> */}
//           </Item>
//         </SubMenu>
//       )}
//       {/* <div className="float-end"> */}

//       {/* </div> */}
//     </Menu> */}
