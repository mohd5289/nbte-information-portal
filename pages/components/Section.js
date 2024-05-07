import { ArrowForwardIosOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import Illustration from "./illustration2.jpg";
import Image from "next/image";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import NBTE from "./NBTE HQ 3.jpg";

const Section = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuInfoOpen, setIsMenuInfoOpen] = useState(false);

  const router = useRouter();

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };
  const handleGeneralIntroMouseEnter = () => {
    setIsMenuInfoOpen(true);
  };
  const handleGeneralIntroMouseLeave = () => {
    setIsMenuInfoOpen(false);
  };
  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };
  // const moveToSearchPage = () => {
  //   router.push("/searchProgrammes");
  // };
  const moveToIntroductionsPage = () => {
    router.push("/Introduction");
  };
  const moveToAbbreviationsPage = () => {
    router.push("/Abbreviations");
  };
  const moveToAdmissionsPage = () => {
    router.push("/Admissions");
  };
  const moveToSearchPage = (department, subdepartment) => {
    router.push({
      pathname: "/searchProgrammes",
      query: { department, subdepartment },
    });
  };
  const moveToInstitutionsPage = () => {
    router.push("/Institutions");
  };
  return (
    <main className=" border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95 m-auto mb-2.5">
      <h2 className="font-roboto text-3xl font-bold m-4">
        GATEWAY TO TVET IN NIGERIA
      </h2>
      <div className="flex sm:flex-col l:flex-row justify-between">
        <div className="space y-4 m-1">
          <div
            className="intent relative transition-transform transform hover:translate-x-4"
            onMouseEnter={handleGeneralIntroMouseEnter}
            onMouseLeave={handleGeneralIntroMouseLeave}
          >
            <h2 className="font-roboto text-xl">General Information</h2>
            <ArrowForwardIosOutlined className="text-gray-700" />
            {isMenuInfoOpen && (
              <div
                className={`intent  ${isMenuInfoOpen ? "block " : "hidden"}`}
                style={{ top: "100%", right: 0, zIndex: 100 }}
              >
                <>
                  {" "}
                  <MenuItem onClick={() => moveToIntroductionsPage()}>
                    {" "}
                    Introduction
                  </MenuItem>
                  <MenuItem onClick={() => moveToAbbreviationsPage()}>
                    Abbreviations
                  </MenuItem>
                  <MenuItem onClick={() => moveToAdmissionsPage()}>
                    How to Apply for Admissions
                  </MenuItem>
                </>
              </div>
            )}
          </div>
          <div
            className="intent relative transition-transform transform hover:translate-x-4"
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            onClick={() => moveToSearchPage("Polytechnic", "")}
          >
            <h2 className="font-roboto text-xl relative">Polytechnics</h2>
          </div>
          <div
            className="intent relative transition-transform transform hover:translate-x-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick={() => moveToSearchPage("Monotechnic")}
          >
            <h2 className="font-roboto text-xl">Monotechnics</h2>
            <ArrowForwardIosOutlined className="text-gray-700" />
            {isMenuOpen && (
              <div
                className={`intent  ${isMenuOpen ? "block " : "hidden"}`}
                style={{ top: "100%", right: 0, zIndex: 10 }}
              >
                <>
                  {" "}
                  <MenuItem
                    onClick={() =>
                      moveToSearchPage("Monotechnic", "Colleges of Agriculture")
                    }
                  >
                    {" "}
                    Colleges of Agriculture
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      moveToSearchPage(
                        "Monotechnic",
                        "Colleges of Health Sciences"
                      )
                    }
                  >
                    Colleges of Health Sciences
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      moveToSearchPage(
                        "Monotechnic",
                        "Specialized Institutions"
                      )
                    }
                  >
                    Specialized Institutions
                  </MenuItem>
                </>
              </div>
            )}
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("Technical College", "")}
          >
            <h2 className="font-roboto text-xl">Technical Colleges</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("IEI", "")}
          >
            <h2 className="font-roboto text-xl">IEIs</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("VEI", "")}
          >
            <h2 className="font-roboto text-xl">VEIs</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            // onClick={() => moveToSearchPage("NSQF")}
          >
            <h2 className="font-roboto text-xl">NSQF</h2>
          </div>
        </div>
        <div className="relative xl:absolute xl:flex w-80 h-80 xl:w-[800px] l:w-[400px] xl:h-[330px]  right-10 hidden sm:block md:w-64 md:h-64">
          <Image
            src={NBTE}
            className="rounded-md"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default Section;

{
  /* <ArrowForwardIosOutlined className="text-gray-700" />
{isMenuOpen && (
  <div
    className={`intent absolute ${
      isMenuOpen ? "block " : "hidden"
    }`}
    style={{ top: "100%", right: 0 }}
  >
    <>
      {" "}
      <MenuItem onClick={moveToInstitutionsPage}> Federal</MenuItem>
      <MenuItem>State</MenuItem>
      <MenuItem>Private</MenuItem>
    </>
  </div>
)} */
}
