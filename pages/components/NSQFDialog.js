import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function NSQFDialog(props) {
  var index = 0;

  const router = useRouter();

  var x = index + 1;
  var m = `${0.4 + 0 * 0.2}`;
  var n = `${0.2 + 0 * 0.2}`;
  var o = `${0.4 + 1 * 0.2}`;
  var p = `${0.2 + 1 * 0.2}`;
  var q = `${0.4 + 2 * 0.2}`;
  var r = `${0.2 + 2 * 0.2}`;

  const moveToSearchPage = (department, subdepartment) => {
    props.setOpen(false);
    router.push({
      pathname: "/searchProgrammes",
      query: { department, subdepartment },
    });
    // props.setOpen(false);
    // setCurrentDepartment(department);
    // setCurrentSubDepartment(subdepartment);
  };
  const moveToSearchInstitutionByProgrammesPage = (
    department,
    subdepartment
  ) => {
    props.setOpen(false);
    router.push({
      pathname: "/searchInstitutionsByProgrammes",
      query: { department, subdepartment },
    });
    // props.setOpen(false);
    // setCurrentDepartment(department);
    // setCurrentSubDepartment(subdepartment);
  };
  const moveToSelectFilterInstitutionPage = (department, subdepartment) => {
    props.setOpen(false);
    router.push({
      pathname: "/SelectFilterInstitution",
      query: { department, subdepartment },
    });
    // props.setOpen(false);
    // setCurrentDepartment(department);
    // setCurrentSubDepartment(subdepartment);
  };

  const moveToNSQFPage = (department, subdepartment) => {
    props.setOpen(false);
    router.push({
      pathname: "/NSQF.pdf",
      query: { department, subdepartment },
    });
  };
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.2 } }}
          exit={{ scale: 0, transition: { delay: 0.4 } }}
        >
          <motion.div
            className="relative text-center font-serif border border-gray-300 shadow-md h-[40vh] w-[50vw] p-4 bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.2 } }}
            exit={{ scale: 0, transition: { delay: 0.4 } }}
          >
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => props.setOpen(false)} // Add your cancel handler here
            >
              X
            </button>
            <motion.h3
              initial={{ x: 500, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 0.2 },
              }}
              exit={{ x: -500, opacity: 0 }}
              className="text-2xl font-bold"
            >
              Please select one of the available actions for {props.department}
              {props.subdepartment ? ` (${props.subdepartment})` : ""}:
            </motion.h3>

            {/* <!-- Your content here --> */}
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: `${m}`, duration: 0.2 },
              }}
              exit={{ x: -500, opacity: 0, transition: { delay: `${n}` } }}
              className="bg-white block my-2.5 relative"
            >
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 my-2 mx-auto"
                onClick={() =>
                  moveToNSQFPage(props.department, props.subdepartment)
                }
              >
                Open NSQF
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}{" "}
    </AnimatePresence>
  );
}
