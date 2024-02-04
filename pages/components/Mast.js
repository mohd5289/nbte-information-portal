import React from "react";
import MastHead from "./NBTE WebsiteMasthead.png";
import Image from "next/image";

const Mast = () => {
  return (
    <header className="border border-gray-300 shadow-md p-4 ml-4 mr-4 text-center w-95 block mb-2.5">
      <Image className="block mx-auto w-95" src={MastHead} alt="Masthead" />
      {/* <Image src={Illustration}/> */}
      <h1 className="font-roboto text-4xl font-bold mb-4">
        NBTE Directory Portal for TVET Institutions{" "}
      </h1>
    </header>
  );
};

export default Mast;
