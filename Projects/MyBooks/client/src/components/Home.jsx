import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { bookBaseUrl } from "../../axiosInstance";
import { useEffect } from "react";

const Home = () => {

  const [bookList, setBookList] = useState([]);

  const getAllBookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");
      setBookList(data?.BookList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);


  return (
    <>
      <Navbar></Navbar>
      <div className="w-full px-5 min-h-[calc(100vh-60px)] bg-gray-">
        <div className="w-full mt-10 ">
          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Book Name
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Book Description
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Author
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Selling Price
                  </th>
                  <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Publish Date
                  </th>
                </tr>
              </thead>
              <tbody className="w-full bg-white divide-y divide-gray-200">
                {bookList?.map((book, index) => {
                  return (
                    <tr className="hover:bg-gray-200" key={index}>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {book?.BookName}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {book?.BookDescription}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {book?.Author}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {book?.SellingPrice}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {book?.PublishDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
