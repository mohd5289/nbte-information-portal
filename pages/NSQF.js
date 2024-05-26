import React from "react";
import {
  Document,
  Page,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
// import NSQFDocument from "../public/NSQF.pdf";
// import { Document } from "react-pdf";

export default function NSQF() {
  const pdfUrl = "../public/NSQF.pdf";
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/NSQF.pdf"
        frameBorder="0"
        style={{ width: "100%", height: "100vh" }}
      ></iframe>
    </div>
  );
}
