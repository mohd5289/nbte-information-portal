import React from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Introduction() {
  return (
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
          <h2 className="text-xl text-center font-bold">FOREWORD</h2>
          <p className="text-lg">
            This is the Digital Edition of the Directory of accredited
            Programmes offered in all institutions in Nigeria under the
            regulation of NBTE. It contains the list of Programmes that are
            granted full accreditation and interim accreditation. It is
            published in exercise of the powers conferred on the Board by the
            Education (National Minimum Standards and Establishment of
            Institutions) CAP E3 LFN 2004. Accreditation has been granted to the
            following categories of institutions:
          </p>
          <div class="text-lg">
            <ul class="list-none ml-6">
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
        </motion.div>
        <motion.div
          key="approvedInstitutions"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5 mt-5"
        >
          <p className="text-lg">
            Approved institutions offering the approved programmes can award the
            following certificates as the case may be and as appropriate to the
            graduates of the programmes:
          </p>
          <div class="text-lg">
            <ul class="list-none ml-6">
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
        </motion.div>
        <motion.div
          key="accreditation"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5 mt-5"
        >
          <p className="text-lg">
            The Accreditation granted to a programme is with effect from the
            latest date indicated in the expiration date column. Programmes
            granted Accreditation will be due for another visit after five
            calendar years. The purpose of publishing this Digital Directory is
            to inform academic institutions, Scholarship Boards, employers of
            labour, stakeholders in the technical education sector, parents and
            prospective students about the accreditation status of programmes
            that are offered by these institutions. Institutions whose
            programmes have been granted interim accreditation should take
            appropriate steps to ensure that they are visited when due and
            granted full accreditation status. I congratulate the institutions
            whose programmes have been granted full accreditation and implore
            them to strive to improve the quality of their programmes.
          </p>
          <div class="flex flex-col pt-10">
            <p className="text-left text-lg"> Prof Idris Muhammed Bugaje</p>
            <p className="text-left text-lg font-bold"> EXECUTIVE SECRETARY</p>
          </div>
        </motion.div>
        <motion.div
          key="accreditation"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border border-gray-300 shadow-md p-4 pt-0 ml-4 mr-4 text-center w-95  m-auto mb-2.5 mt-5"
        >
          <h2 className="text-xl text-center font-bold">
            Summary of Technical Institutions in Nigeria as at Dec. 2023
          </h2>
          <table class="border-collapse border border-gray-300 m-auto mt-8">
            <thead class="bg-green-600">
              <tr>
                <th class="border border-gray-300 p-2">S/No</th>
                <th class="border border-gray-300 p-2">Institution Type</th>
                <th class="border border-gray-300 p-2">Federal</th>
                <th class="border border-gray-300 p-2">State</th>
                <th class="border border-gray-300 p-2">Private</th>
                <th class="border border-gray-300 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-2">1</td>
                <td class="border border-gray-300 p-2">Polytechnics</td>
                <td class="border border-gray-300 p-2">42</td>
                <td class="border border-gray-300 p-2">54</td>
                <td class="border border-gray-300 p-2">86</td>
                <td class="border border-gray-300 p-2">182</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">2</td>
                <td class="border border-gray-300 p-2">
                  Colleges of Agriculture
                </td>
                <td class="border border-gray-300 p-2">23</td>
                <td class="border border-gray-300 p-2">8</td>
                <td class="border border-gray-300 p-2">1</td>
                <td class="border border-gray-300 p-2">32</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">3</td>
                <td class="border border-gray-300 p-2">
                  Colleges of Health Sciences
                </td>
                <td class="border border-gray-300 p-2">41</td>
                <td class="border border-gray-300 p-2">66</td>
                <td class="border border-gray-300 p-2">27</td>
                <td class="border border-gray-300 p-2">134</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">4</td>
                <td class="border border-gray-300 p-2">
                  Specialized Institutions
                </td>
                <td class="border border-gray-300 p-2">30</td>
                <td class="border border-gray-300 p-2">9</td>
                <td class="border border-gray-300 p-2">17</td>
                <td class="border border-gray-300 p-2">56</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">5</td>
                <td class="border border-gray-300 p-2">
                  Innovation Enterprise Institutions (IEIs)
                </td>
                <td class="border border-gray-300 p-2">6</td>
                <td class="border border-gray-300 p-2">7</td>
                <td class="border border-gray-300 p-2">168</td>
                <td class="border border-gray-300 p-2">181</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">6</td>
                <td class="border border-gray-300 p-2">Technical Colleges</td>
                <td class="border border-gray-300 p-2">11</td>
                <td class="border border-gray-300 p-2">113</td>
                <td class="border border-gray-300 p-2">2</td>
                <td class="border border-gray-300 p-2">126</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">7</td>
                <td class="border border-gray-300 p-2">
                  Vocational Enterprise Institutions (VEIs)
                </td>
                <td class="border border-gray-300 p-2">10</td>
                <td class="border border-gray-300 p-2">4</td>
                <td class="border border-gray-300 p-2">68</td>
                <td class="border border-gray-300 p-2">82</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">
                  <strong>Sub Total</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>163</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>261</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>369</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>793</strong>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">8</td>
                <td class="border border-gray-300 p-2">
                  Vocational Skills Acquisition Centres
                </td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">427</td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">427</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">9</td>
                <td class="border border-gray-300 p-2">
                  Training Providers (TPs)
                </td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">95</td>
                <td class="border border-gray-300 p-2">95</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">10</td>
                <td class="border border-gray-300 p-2">
                  Awarding Bodies (ABs)
                </td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">16</td>
                <td class="border border-gray-300 p-2">16</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">11</td>
                <td class="border border-gray-300 p-2">
                  Sector Skills Councils SSCs)
                </td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">12</td>
                <td class="border border-gray-300 p-2">12</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">
                  <strong>Sub Total</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>0</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>427</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>123</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>550</strong>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2"></td>
                <td class="border border-gray-300 p-2">
                  <strong>Grand Total</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>163</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>688</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>492</strong>
                </td>
                <td class="border border-gray-300 p-2">
                  <strong>1343</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
