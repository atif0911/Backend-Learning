import React from "react";
import Header from "./Header";

import { useState } from "react";
import { useEffect } from "react";
import { notesBaseUrl } from "../../axiosInstance";

const Home = () => {

    const [paperList, setPaperList] = useState([]);

    const getAllPaperList = async () => {
        try {
            const { data } = await notesBaseUrl.get('noteslist');
            setPaperList(data?.NotesList);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPaperList()
    }, []);

  return (
    <div>
      <Header></Header>
      <div className="w-full px-6 min-h-[calc(100vh-60px)] bg-gray-50">
        <div className="w-full mt-10">
          <div className="w-full overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paper Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paper Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Topic
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paperList?.map((paper, index) => (
                  <tr className="hover:bg-indigo-50 transition" key={index}>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-800">
                      {paper?.PaperCode}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-800">
                      {paper?.PaperName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-gray-800">
                      {paper?.Topic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
