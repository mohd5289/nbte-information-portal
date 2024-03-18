import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Admissions() {
  return (
    <div>
      <div>
        <AnimatePresence>
          <motion.div
            key="foreword"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5 mt-10"
          >
            <h2 className="text-xl text-center font-bold">
              HOW TO APPLY FOR ADMISSION INTO A PROGRAMME
            </h2>
            <p className="text-lg">
              The Joint Admissions and Matriculation Board (JAMB) conduct all
              admissions into the National Innovation Diploma (NID) and National
              Diploma (ND) programmes offered by all polytechnics and similar
              tertiary institutions in the country. Usually, a prospective
              candidate for National Innovation Diploma programme applies to
              JAMB for application form; writes the matriculation examination
              and on the basis of his/her score in the examination, and other
              criteria that may be laid down by the proprietor of the
              institution, the candidate may be offered provisional admission.
              The final admission of the candidate however, depends on his/her
              meeting the minimum admission requirements as laid down by NBTE.
              In the case of admissions into Higher National Diploma (HND)
              programmes offered by the polytechnics and similar institutions
              the following procedure may apply:
            </p>
            <div class="text-lg mt-8">
              <ul class="list-none ml-6">
                <li>
                  All applicants should apply through this link:{" "}
                  <a href="https://hnd.nbte.gov.ng/">hnd.nbte.gov.ng.</a>{" "}
                </li>
                <li>
                  Admission of a candidate into a programme is the prerogative
                  of the Academic Board of the institution which should ensure
                  that the candidate meets the minimum entry requirements for
                  the programme as laid down by the NBTE.
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            key="approvedInstitutions"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5 mt-5"
          >
            <h2 className="text-xl text-center font-bold">
              GENERAL ENTRY REQUIREMENTS FOR NATIONAL DIPLOMA (ND)/ NATIONAL
              INNOVATION DIPLOMA (NID) PROGRAMMES
            </h2>
            <p className="text-lg">
              The minimum entry requirements for the ND/NID Programmes are as
              follows:
            </p>
            <div class="text-lg">
              <ul class="list-none ml-6">
                <li>
                  WASC/SSCE/GCE Ordinary Level or its equivalent with credit
                  level passes in five subjects relevant to the programme at not
                  more than two sittings
                </li>
                <li>
                  The National Technical Certificates (NTC) or National Business
                  Certificate (NBC) with Credit level passes in five
                  subjects/trades relevant to the programme.
                </li>
                <li>Higher National Innovation Diploma (HNID);</li>
                <li>
                  In addition to 1 - 2 above, candidates must obtain a
                  satisfactory score in the UTME Examination which is conducted
                  by JAMB.
                </li>
                <li>
                  A holder of the Advanced National Technical Certificate (ANTC)
                  may be given advanced placement in the ND Programme provided
                  the candidate has also met the minimum entry requirements into
                  the ND Programme and obtained a minimum of credit level grades
                  in the ANTC Examinations.
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            key="accreditation"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5 mt-5"
          >
            <h2 className="text-xl text-center font-bold">
              Applicants for All Programmes
            </h2>
            <p className="text-lg">
              All candidates applying for all programmes in Polytechnics and
              similar Tertiary Technical Institutions must possess credit level
              passes in Mathematics and English Language. (Not Literature in
              English).
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
