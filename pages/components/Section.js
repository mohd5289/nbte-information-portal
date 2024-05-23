import { ArrowForwardIosOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Illustration from "./illustration2.jpg";
import Image from "next/image";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import NBTEHQ from "./NBTE HQ 3.jpg";
import Slider from "react-slick";
import { Carousel, Slide } from "@mui/lab";
import { motion, AnimatePresence } from "framer-motion";
import SelectSearchOptionDialog from "./SelectSearchOptionDialog";

const Section = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuInfoOpen, setIsMenuInfoOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState("");
  const [currentSubDepartment, setCurrentSubDepartment] = useState("");

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
    // router.push({
    //   pathname: "/searchProgrammes",
    //   query: { department, subdepartment },
    // });
    setOpen(true);
    setCurrentDepartment(department);
    setCurrentSubDepartment(subdepartment);
  };
  const openDialog = (department, subdepartment) => {
    setOpen(true);
    setCurrentDepartment(department);
    setCurrentSubDepartment(subdepartment);
  };
  const moveToInstitutionsPage = () => {
    router.push("/Institutions");
  };
  const carouselVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 7000); // Change interval time as needed
    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };
  return (
    <main className=" border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95 m-auto mb-2.5 font-roboto">
      <AnimatePresence>
        <SelectSearchOptionDialog
          setOpen={setOpen}
          open={open}
          department={currentDepartment}
          subdepartment={currentSubDepartment}
        />
      </AnimatePresence>
      <h2 className="font-roboto text-3xl font-bold m-4">
        GATEWAY TO TVET IN NIGERIA
      </h2>
      <div className="flex sm:flex-col l:flex-row md:flex-col justify-between">
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
            onClick={() => openDialog("Polytechnic", "")}
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
                      openDialog("Monotechnic", "Colleges of Agriculture")
                    }
                  >
                    {" "}
                    Colleges of Agriculture
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      openDialog("Monotechnic", "Colleges of Health Sciences")
                    }
                  >
                    Colleges of Health Sciences
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      openDialog("Monotechnic", "Specialized Institutions")
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
            onClick={() => openDialog("Technical College", "")}
          >
            <h2 className="font-roboto text-xl">Technical Colleges</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => openDialog("IEI", "")}
          >
            <h2 className="font-roboto text-xl">IEIs</h2>
          </div>
          <div
            className="intent transition-transform transform hover:translate-x-4"
            onClick={() => openDialog("VEI", "")}
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
        <div className="relative xl:absolute xl:flex w-80 h-80 xl:w-[800px] l:w-[400px] xl:h-[330px]  right-10 hidden sm:block md:w-64 md:h-64 m-auto md:hidden">
          <Image
            src={NBTEHQ}
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
{
  /* <Image
            src={NBTE}
            className="rounded-md"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          /> */
}
{
  /* <motion.div
variants={carouselVariants}
initial="initial"
animate="animate"
exit="exit"
key={activeIndex}
className="carousel-item"
>
{activeIndex === 0 && (
  <div className="text-lg font-bold italic">
    <p className="text-lg">
      This is the Digital Edition of the Directory of accredited
      Programmes offered in all institutions in Nigeria under the
      regulation of NBTE. It contains the list of Programmes that
      are granted full accreditation and interim accreditation. It
      is published in exercise of the powers conferred on the Board
      by the Education (National Minimum Standards and Establishment
      of Institutions) CAP E3 LFN 2004. Accreditation has been
      granted to the following categories of institutions:
    </p>
    <ul className="list-none ml-6">
      <li>Polytechnics;</li>
      <li>Colleges of Agriculture;</li>
      <li>Colleges of Health Sciences;</li>
      <li>Specialized Institutions;</li>
      <li>Innovation Enterprise Institutions;</li>
      <li>Technical Colleges;</li>
      <li>Vocational Enterprise Institutions; and</li>
      <li>NSQ Training Providers/Centers/Institutions.</li>
    </ul>
  </div>
)}
{activeIndex === 1 && (
  <div className="text-lg font-bold italic">
    <p className="text-lg">
      Approved institutions offering the approved programmes can
      award the following certificates as the case may be and as
      appropriate to the graduates of the programmes:
    </p>
    <ul className="list-none ml-6">
      <li>Post Higher National Diploma (Post-HND);</li>
      <li>Higher National Diploma (HND);</li>
      <li>Higher National Innovation Diploma (HNID);</li>
      <li>National Diploma (ND);</li>
      <li>National Innovation Diploma (NID);</li>
      <li>Advanced National Business Certificate (ANBC);</li>
      <li>Advanced National Technical Certificate (ANTC);</li>
      <li>NSQ Training Providers/Centers/Institutions;</li>
      <li>National Technical Certificate (NTC);</li>
      <li>National Vocational Certificate (NVC);</li>
      <li>National Skills Qualifications (NSQs);</li>
    </ul>
  </div>
)}
{activeIndex === 2 && (
  <div className="text-lg font-bold italic">
    <p>
      The Accreditation granted to a programme is with effect from
      the latest date indicated in the expiration date column.
      Programmes granted Accreditation will be due for another visit
      after five calendar years. The purpose of publishing this
      Digital Directory is to inform academic institutions,
      Scholarship Boards, employers of labour, stakeholders in the
      technical education sector, parents and prospective students
      about the accreditation status of programmes that are offered
      by these institutions. Institutions whose programmes have been
      granted interim accreditation should take appropriate steps to
      ensure that they are visited when due and granted full
      accreditation status. I congratulate the institutions whose
      programmes have been granted full accreditation and implore
      them to strive to improve the quality of their programmes.
    </p>
    <div className="flex flex-col pt-10">
      <p className="text-left text-lg">
        {" "}
        Prof Idris Muhammed Bugaje
      </p>
      <p className="text-left text-lg font-bold">
        {" "}
        EXECUTIVE SECRETARY
      </p>
    </div>
  </div>
)}
</motion.div> */
}
