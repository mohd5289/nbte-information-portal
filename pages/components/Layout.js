// import React from "react";
import { Autocomplete, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import Autosuggest from "react-autosuggest";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Modal from "./Modal";
import FadeLoader from "react-spinners/FadeLoader";
import Backdrop from "./Backdrop";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import NBTE from "../../public/favicon.ico";
import Image from "next/image";

export default function Layout({ children }) {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { department, subdepartment } = query ?? props;
  const sidebarOpenHandler = () => {
    setSideBarVisible(true);
  };
  const sideBarCloseBarHandler = () => {
    setSideBarVisible(false);
  };
  return (
    <div className="flex flex-col relative">
      <div
        className={`fixed left-0 top-0 h-full bg-white overflow-y-auto transform transition-transform ease-in-out ${
          sideBarVisible
            ? "translate-x-0 border-r z-20"
            : "-translate-x-full z-10"
        }`}
        style={{ width: "325px" }}
      >
        <div className="px-2 py-4  border-b">
          <div className="flex items-center justify-between">
            <Link href="/" passHref>
              <a>
                <div className="flex items-center">
                  <Image
                    src={NBTE}
                    className="rounded-md"
                    objectPosition="center"
                    priority
                    width={45}
                    height={45}
                  />
                  <p className="text-lg font-bold ml-2">
                    NBTE Information Portal
                  </p>
                </div>
              </a>
            </Link>
            <button
              className="text-gray-600 focus:outline-none"
              onClick={sideBarCloseBarHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-b">
          <div className="flex items-center  hover:bg-gray-100">
            <FaSearch className="ml-2" />
            <Link
              href={`/searchProgrammes?department=${department}${
                query.subdepartment
                  ? `&subdepartment=${query.subdepartment}`
                  : ""
              }`}
            >
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Search Programme
              </a>
            </Link>
          </div>
        </div>

        <div className="border-b">
          <div className="flex items-center  hover:bg-gray-100">
            <MdOutlineAdd className="ml-2" />
            <Link
              href={`/addProgrammes?department=${department}${
                subdepartment ? `&subdepartment=${subdepartment}` : ""
              }`}
            >
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Add Programme
              </a>
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div className="flex items-center hover:bg-gray-100">
            <MdOutlineAdd className="ml-2" />
            <Link href="/AddAllProgrammes">
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Add All Programmes Under NBTE
              </a>
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div className=" flex items-center hover:bg-gray-100">
            <MdOutlineAdd className="ml-2" />
            <Link href="/AddAllInstitution">
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Add All Institutions Under NBTE
              </a>
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div className="flex items-center hover:bg-gray-100">
            <MdOutlineUpdate className="ml-2" />
            <Link href="/UpdateInstitutionDetails">
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Update Institution Details
              </a>
            </Link>
          </div>
        </div>

        <div className="border-b">
          <div className="flex items-center hover:bg-gray-100">
            <MdOutlineUpdate className="ml-2" />
            <Link
              href={`/UpdateProgrammeDetails?department=${department}${
                query.subdepartment
                  ? `&subdepartment=${query.subdepartment}`
                  : ""
              }`}
            >
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={sideBarCloseBarHandler}
              >
                Update Programmes Details
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex  relative z-0">
        <button
          className="absolute top-0 left-0 z-30 p-2 text-gray-500 focus:outline-none"
          onClick={sidebarOpenHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
