import MonthCalendar from "./MonthCalender";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../utils/calender";
import { useNavigate } from "react-router-dom";

import cn from "../utils/cn";
import { useState } from "react";
export const Calender = ({ today, setToday, currentDate }) => {

  const navigate = useNavigate()
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    console.log('shown alert')
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };
  return (
    <div className="">
      <div className="px-4 pt-6 flex justify-between">
        <div className="flex">
          <h1 className="text-2xl text-gray-900 font-[700]">{today.year()}</h1>
          <div className="pl-4 flex items-center gap-3 mb-1">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer border rounded-[4px]"
              onClick={() => {
                setToday(today.year(today.year() - 1));
              }}
            />
            <GrFormNext
              className="w-5 h-5 cursor-pointer border rounded-[4px]"
              onClick={() => {
                setToday(today.year(today.year() + 1));
              }}
            />
            {isAlertVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 "onClick={closeAlert} >
          {/* Alert Content */}
          <div className="bg-white py-3 px-6 rounded-md  text-center">
            <p className="pb-2">Oops !!</p>
            <div className="bg-gray-300 h-[0.5px] w-full"></div>
            <p className="py-4 px-4">You clicked on a later date</p>
          </div>
        </div>
      )}
          </div>
        </div>
        <div className="hidden sm:block">
          {/* Render only on medium and large screens */}
          <div className="shadow-gray-400 bg-blue-600 shadow-lg py-1 px-5 text-[16px] rounded-md mb-1 cursor-pointer text-white font-normal hover:scale-[1.04] duration-200" onClick={()=>navigate("/addNote")}>
            <button className="">Add Notes</button>
          </div>
        </div>
        <div className="block sm:hidden">
          {/* Render only on small screens */}
          <div className="border-black border shadow-lg w-7 h-7 text-[16px] rounded-md mb-1 text-black text-center font-normal" onClick={()=>navigate("/addNote")}>
          <button className="" >+</button>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gray-200 mt-2"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 between-lg-md:grid-cols-3 ">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
          const monthDate = today.month(today.month() + index);
          return (
            <div key={index} className="m-4">
          
              {/* <MonthCalendar
                key={index}
                today={monthDate}
                setToday={setToday}
                currentDate={currentDate}
              /> */}
                    <div key={index} className={cn(
        monthDate.month()==currentDate.month() && monthDate.year()==currentDate.year() ? "border-blue-600 hover:border-blue-600" : "",
        "pt-4 pb-3 border rounded-[0.5rem] hover:border-gray-400 duration-300 hover:scale-[1.02]"
      )}>
      <div className="flex justify-between">
        <div>
          <h1 className="font-[700] text-stone-500 lg:px-3 pb-2 sm:px-2 md:px-2 cursor-pointer">
            {months[monthDate.month()]}
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
        {generateDate(monthDate.month(), monthDate.year()).map(
          ({ date, currentMonth, today }, index) => (
         
            <div
              key={index}
              className="h-8 grid place-content-center"
              onClick= {()=>{
                if(date<=currentDate){
                  navigate('/note',{state:{id:1,date:date}})
                }else{
                  showAlert()
                }
                }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
