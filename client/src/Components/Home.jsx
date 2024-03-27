// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "./Layouts/NavBar";
import NewProsuct from "./Home/NewProsuct";
import BastSeller from "./Home/BastSeller";
import Footter from "./Layouts/Footter";
const Home = () => {
  return (
    <>
      <NavBar />
      <div className="w-full  overflow-hidden md:overflow-hidden lg:overflow-hidden xl:h-screen   flex flex-col md:flex-row lg:flex-col  justify-center items-center bg-gray-200 ">
        <div className="w-full  flex flex-col items-center gap-10">
          <h4 className="text-[32px] text-gray-700 mt-3 flex items-center">
            สินค้าใหม่
            <div className="badge badge-error text-white ml-3">NEW</div>
          </h4>
          <NewProsuct />
        </div>

        <div className="w-full flex flex-col items-center gap-10">
          <h4 className="text-[32px] text-gray-700 mt-10 md:mt-3 lg:mt-10 ">
            สินค้าขายดี
          </h4>
          <BastSeller />
        </div>
      </div>
      <div className="w-ful">
          <Footter />
        </div>
    </>
  );
};

export default Home;
