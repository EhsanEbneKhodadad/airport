import React from "react";
import { FaBusAlt, FaCarAlt } from "react-icons/fa";
import { FaHotel, FaSuitcaseRolling, FaTrain } from "react-icons/fa6";
import { IoMdBoat } from "react-icons/io";
import { PiAirplaneTakeoffFill } from "react-icons/pi";

export const Navbar = () => {
  return (
    <div className="bg-main-blue flex p-4 flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="text-white flex flex-col gap-2">
          <h1 className="font-bold text-2xl">مستر بلیط</h1>
          <p className="text-[10px]">بلیط هواپیما و رزرو هتل</p>
        </div>
        {/* <div>menu</div> */}
      </div>

      <div className="flex justify-between">
        <div className="text-white flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <PiAirplaneTakeoffFill size={20} />
          <p className="text-sm">هواپیما</p>
        </div>
        <div className="text-[#66B2FF] flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <FaHotel size={20} />
          <p className="text-sm">هتل</p>
        </div>
        <div className="text-[#66B2FF] flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <FaTrain size={20} />
          <p className="text-sm">قطار</p>
        </div>
        <div className="text-[#66B2FF] flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <FaBusAlt size={20} />
          <p className="text-sm">اتوبوس</p>
        </div>
        <div className="text-[#66B2FF] flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <FaCarAlt size={20} />
          <p className="text-sm">سواری</p>
        </div>
        <div className="text-[#66B2FF] flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <IoMdBoat size={20} />
          <p className="text-sm">کشتی</p>
        </div>
        <div className="text-[#66B2FF] flex justify-center items-center flex-col hover:shadow p-3 rounded-lg hover:scale-125 transition duration-300 cursor-pointer">
          <FaSuitcaseRolling size={20} />
          <p className="text-sm">بسته سفر</p>
        </div>
      </div>
    </div>
  );
};
