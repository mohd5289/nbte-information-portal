import { ArrowForwardIosOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import Illustration from "./illustration2.jpg";
import Image from "next/image";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const Section = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };
  // const moveToSearchPage = () => {
  //   router.push("/searchProgrammes");
  // };
  const moveToSearchPage = (department) => {
    router.push({
      pathname: "/searchProgrammes",
      query: { department },
    });
  };
  const moveToInstitutionsPage = () => {
    router.push("/Institutions");
  };
  return (
    <main className=" border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5">
      <h2 className="font-roboto text-3xl font-bold m-4">
        GATEWAY TO TVET IN NIGERIA
      </h2>
      <div className="flex sm:flex-col l:flex-row justify-between">
        <div className="space y-4 m-1">
          <div
            className="intent relative transition-transform transform hover:translate-x-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => moveToSearchPage("Polytechnic")}
          >
            <h2 className="font-roboto text-xl relative">Polytechnics</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("Monotechnic")}
          >
            <h2 className="font-roboto text-xl">Monotechnics</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("Technical College")}
          >
            <h2 className="font-roboto text-xl">Technical Colleges</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("IEI")}
          >
            <h2 className="font-roboto text-xl">IEIs</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => moveToSearchPage("VEI")}
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
            src={Illustration}
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
