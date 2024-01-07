import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { generateDate, months } from "../utils/calender";
import { useNavigate } from "react-router-dom";

export const LogsComp = ({ today, setToday, currentDate }) => {
  const navigate = useNavigate();

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const curr = dayjs();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");

  const MAX_TITLE_LENGTH = 80;
  const MAX_TAG_LENGTH = 8;

  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(inputTitle);
    }
  };

  const handleTagChange = (e) => {
    const inputTag = e.target.value;
    if (inputTag.length <= MAX_TAG_LENGTH) {
      setTag(inputTag);
    }
  };

  const handleContentChange = (e) => {
    const inputContent = e.target.value;
    setContent(inputContent);
  };

  return (
    <div className="">
      <div className="px-4 pt-6 flex justify-between">
        <div className="flex gap-4">
          <div className="">
            {" "}
            <GrFormPrevious className="w-6 h-6 relative top-1"></GrFormPrevious>
          </div>
          <h1 className="text-2xl text-gray-900 tracking-wide font-[700]">
            Add Log
          </h1>
          <h1 className="text-[16px] text-gray-900 font-[500] mt-[6px]">
            {weekDays[today.day() % 7]}, {today.date()} {months[today.month()]}{" "}
            {today.year()}
          </h1>
          
        </div>
        <div className="hidden sm:block">
          {/* Render only on medium and large screens */}
          <div className="shadow-gray-400 bg-blue-600 shadow-lg py-1 px-5 text-[16px] rounded-md mb-1 text-white font-normal hover:scale-[1.04] duration-200">
            <button className="" onClick={()=>navigate("/add-log")}>Add Log</button>
          </div>
        </div>
        <div className="block sm:hidden">
          {/* Render only on small screens */}
          <div className="border-black border shadow-lg w-7 h-7 text-[16px] rounded-md mb-1 text-black text-center font-normal">
          <button className="" onClick={()=>navigate("/add-log")}>+</button>
          </div>
        </div>
      </div>
      
      <div className="h-[1px] bg-gray-200 mt-2"></div>
      <div className="">
        
      </div>
      
    </div>
  );
};
