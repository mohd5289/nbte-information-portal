import React, { useState } from "react";
import TopNav from "./components/TopNav";
import { Link, Pagination } from "@mui/material";
import { MdSearch } from "react-icons/md";

export default function searchProgrammes() {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSideBarVisible(true);
  };
  const sideBarCloseBarHandler = () => {
    setSideBarVisible(false);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center relative">
        <button
          className="p-2 text-gray-500 focus:outline-none"
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

        <a href="/" className="text-xl font-bold text-gray-800 ml-4 ">
          Polytechnic Programmes
        </a>

        <div className="flex flex-col mr-auto ml-auto relative">
          <div className="md:flex  items-center mr-auto ml-auto">
            <form
              //   onSubmit={submitHandler}
              className="border border-white bg-white rounded-md"
            >
              <div className="p-4 bg-white border-b flex items-center">
                <input
                  type="text"
                  placeholder="Search Programme"
                  className="border rounded p-2"
                  style={{ width: "40rem" }}
                />

                <button
                  type="submit"
                  className="bg-green-400 p-2 rounded-r-md"
                  aria-label="search"
                >
                  <MdSearch size="30" color="white" />
                </button>
              </div>
            </form>
          </div>
          <div className="absolute left-0 right-0 mt-32 mx-auto">
            <h2 className="mb-3"> Kaduna Polytechnic</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-center">S/N</th>
                    <th className="py-2 px-4">Programme Name</th>
                    <th className="py-2 px-4">Year Granted</th>
                    <th className="py-2 px-4 text-right">
                      Accreditation Status
                    </th>
                    <th className="py-2 px-4 text-right">Approved Streams</th>
                    <th className="py-2 px-4 text-right">Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">
                      <a>
                        <img
                          //   src={item.image}
                          //   alt={item.name}
                          width={50}
                          height={50}
                          className="cursor-pointer"
                        />
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <a className="text-blue-500">Link </a>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <select
                        // value={item.quantity}
                        // onChange={(e) =>
                        //   updateCartHandler(item, e.target.value)
                        // }
                        className="border p-1"
                      >
                        {Array.from(
                          { length: 100 },
                          (_, index) => index + 1
                        ).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 text-right">${4}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        //   onClick={() => removeItemHandler(item)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        X
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-4">
                      <a>
                        <img
                          //   src={item.image}
                          //   alt={item.name}
                          width={50}
                          height={50}
                          className="cursor-pointer"
                        />
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <a className="text-blue-500">Link </a>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <select
                        // value={item.quantity}
                        // onChange={(e) =>
                        //   updateCartHandler(item, e.target.value)
                        // }
                        className="border p-1"
                      >
                        {Array.from(
                          { length: 100 },
                          (_, index) => index + 1
                        ).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 text-right">${4}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        //   onClick={() => removeItemHandler(item)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">
                      <a>
                        <img
                          //   src={item.image}
                          //   alt={item.name}
                          width={50}
                          height={50}
                          className="cursor-pointer"
                        />
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <a className="text-blue-500">Link </a>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <select
                        // value={item.quantity}
                        // onChange={(e) =>
                        //   updateCartHandler(item, e.target.value)
                        // }
                        className="border p-1"
                      >
                        {Array.from(
                          { length: 100 },
                          (_, index) => index + 1
                        ).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 text-right">${4}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        //   onClick={() => removeItemHandler(item)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      {/* Inserted <p> tag */}
                      <p className="text-center font-bold text-lg">Science</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">
                      <a>
                        <img
                          //   src={item.image}
                          //   alt={item.name}
                          width={50}
                          height={50}
                          className="cursor-pointer"
                        />
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <a className="text-blue-500">Link </a>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <select
                        // value={item.quantity}
                        // onChange={(e) =>
                        //   updateCartHandler(item, e.target.value)
                        // }
                        className="border p-1"
                      >
                        {Array.from(
                          { length: 100 },
                          (_, index) => index + 1
                        ).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 text-right">${4}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        //   onClick={() => removeItemHandler(item)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                className="mt-10"
                defaultPage={1}
                count={5}
                // onChange={pageHandler}
              ></Pagination>
            </div>
          </div>
        </div>

        <div
          className={`fixed left-0 top-0 h-full bg-white overflow-y-auto transform transition-transform ease-in-out ${
            sideBarVisible ? "translate-x-0 border-r" : "-translate-x-full"
          }`}
          style={{ width: "250px" }}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Options</p>
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
            <a
              href={`/searchProgramme`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={sideBarCloseBarHandler}
            >
              Search Programme
            </a>
          </div>

          <div className="border-b">
            <a
              href={`/addProgrammes`}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={sideBarCloseBarHandler}
            >
              Add Programme
            </a>
          </div>
        </div>
      </div>

      <div className="w-1/4 ml-12 ">
        <ul>
          <li>
            <div className="w-full">
              <p className="font-bold">Level</p>
              <select
                // value={category}
                // onChange={categoryHandler}
                className="w-full border rounded p-2"
              >
                <option value="none">None</option>
                <option value="ND">ND</option>
                <option value="HND">HND</option>
              </select>
            </div>
          </li>
          <li>
            <div className="w-full">
              <p className="font-bold">Accreditation Status</p>
              <select
                // value={brand}
                // onChange={brandHandler}
                className="w-full border rounded p-2"
              >
                <option value="all">All</option>
                <option value="accredited">Accredited</option>
                <option value="interim">Interim</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </li>
          <li>
            <div className="w-full">
              <p className="font-bold">Number of Streams</p>
              <select
                // value={price}
                // onChange={priceHandler}
                className="w-full border rounded p-2"
              >
                <option value="any">Any</option>
                {Array.from({ length: 100 }, (_, index) => index + 1).map(
                  (number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  )
                )}
              </select>
            </div>
          </li>
          <li>
            <div className="w-full">
              <p className="font-bold">Show only Institutions</p>
              <select
                // value={rating}
                // onChange={ratingHandler}
                className="w-full border rounded p-2"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

{
  /* <div className="p-4 bg-white border-b">
        <input
          type="text"
          placeholder="Search Programme"
          className="w-full border rounded p-2"
        />
      </div> */
}
