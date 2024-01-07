// MonthCalendar.jsx
import React from "react";
import { generateDate, months } from "../utils/calender";
import cn from "../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const MonthCalendar = ({ today, setToday, currentDate }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    // <div className=" pt-4 pb-3 border rounded-[0.5rem]">
    <div className={cn(
        today.month()==currentDate.month() && today.year()==currentDate.year() ? "border-blue-600 hover:border-blue-600" : "",
        "pt-4 pb-3 border rounded-[0.5rem] hover:border-gray-400 duration-300 hover:scale-[1.02]"
      )}>
      <div className="flex justify-between">
        <div>
          <h1 className="font-[700] text-stone-500 lg:px-3 pb-2 sm:px-2 md:px-2 cursor-pointer">
            {months[today.month()]}
          </h1>
        </div>

      </div>

      <div className="w-full grid grid-cols-7">
        {days.map((day, index) => (
          <h1
            key={index}
            className="h-8 grid place-content-center text-md text-stone-400"
          >
            {day}
          </h1>
        ))}
      </div>

      <div className="w-full grid grid-cols-7 px-1">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => (
            <div
              key={index}
              className="h-8 grid place-content-center"
            >
              <h1
                className={cn(
                  currentMonth ? "" : "text-gray-400",
                  today ? "bg-red-600 text-white text-[12px] font-semibold" : "bg-zinc-200",
                  "h-5 w-5 grid place-content-center rounded-[5px] hover:bg-black hover:text-white transition-all cursor-pointer duration-200 text-[12px]"
                )}
                onClick={() => {
                  console.log(date);
                }}
              >
                {date.date()}
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
