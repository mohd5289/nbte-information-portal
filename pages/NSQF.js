import React from "react";

// import NSQFDocument from "../public/NSQF.pdf";
// import { Document } from "react-pdf";

export default function NSQF() {
  const pdfUrl = "/NSQF.pdf";
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={pdfUrl}
        frameBorder="0"
        style={{ width: "100%", height: "100vh" }}
      ></iframe>
    </div>
  );
}
