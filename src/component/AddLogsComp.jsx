import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { generateDate, months } from "../utils/calender";
import { useLocation, useNavigate } from "react-router-dom";

export const AddLogsComp = ({ today, setToday, currentDate }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const noteData = location.state.noteData;
  console.log(noteData["link"]);
  // console.log(
  //   `from note ${noteData.tag},${noteData.title},${noteData.content}`
  // );

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [symbol, setSymbol] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [positionSizePercentage, setPositionSizePercentage] = useState("");
  const [rpt, setRpt] = useState("");
  const [rptPercentage, setRptPercentage] = useState("");
  const [exitPercentage, setExitPercentage] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [gainPercentage, setGainPercentage] = useState("");
  const [accountGainPercentage, setAccountGainPercentage] = useState("");
  const [roiPercentage, setRoiPercentage] = useState("");
  const [days, setDays] = useState("");
  const [rr, setRr] = useState("");
  const [charges, setCharges] = useState("");
  const [netProfit, setNetProfit] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const addJournal = async (e) => {
    e.preventDefault();
    const url = "https://stock-journal-backend.onrender.com/api/journal/addJournal";
    // console.log()
    const data = {
      Title: noteData.title,
      Tag: noteData.tag,
      Thoughts: noteData.content,
      Link: noteData.link,
      Date: `${today.date()}-${today.month() + 1}-${today.year()}`,
      Symbol: symbol,
      "Position Size": positionSize,
      "Position Size %": positionSizePercentage,
      RPT: rpt,
      "RPT %": rptPercentage,
      "Exit %": exitPercentage,
      "Exit Price": exitPrice,
      "Gain %": gainPercentage,
      "Account Gain %": accountGainPercentage,
      "ROI%": roiPercentage,
      Days: days,
      RR: rr,
      Charges: charges,
      "Net Profit": netProfit,
    };
    // console.log(data);

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setStatus(responseData.status);
      setResponseMessage(responseData.message);
      setLoading(false);
    } catch (error) {
      setStatus("Error");
      setStatus(0);
      console.error("Error:", error);
      setResponseMessage("Error occurred while making the request.");
    }
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
      </div>

      <div className="h-[1px] bg-gray-200 mt-2"></div>
      <div className="">
        <div className=" flex">
          <div className="flex flex-col flex-1 px-8 py-5">
            <div className="grid grid-cols-2 gap-16">
              <form action="" className="w-full">
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <label htmlFor="" className="">
                      Symbol
                    </label>
                    <label htmlFor="" className="px-1 ">
                      :
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={symbol}
                    onChange={(e) => {
                      setSymbol(e.target.value);
                    }}
                    className="outline-none font-semibold tracking-wide text-stone-600 pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Position % :</h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={positionSizePercentage}
                    onChange={(e) => {
                      setPositionSizePercentage(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>RPT % :</h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={rptPercentage}
                    onChange={(e) => {
                      setRptPercentage(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Exit Price : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={exitPrice}
                    onChange={(e) => {
                      setExitPrice(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Account Gain % : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={accountGainPercentage}
                    onChange={(e) => {
                      setAccountGainPercentage(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Days : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={days}
                    onChange={(e) => {
                      setDays(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Charges : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={charges}
                    onChange={(e) => {
                      setCharges(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                {/* 
                <div className=" flex mt-5">
                  <div className="flex mt-[6px]">
                    <label htmlFor="" className="">
                      Link*
                    </label>
                    <span htmlFor="" className="px-1">
                      :
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="outline-none font-light tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div> */}
                {/* <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div> */}
              </form>
              <form action="" className="w-full" onSubmit={addJournal}>
                <div className=" flex ">
                  <div className="flex mt-[5px]">
                    <h1 className="">Position Size :</h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={positionSize}
                    onChange={(e) => {
                      setPositionSize(e.target.value);
                    }}
                    className="outline-none font-semibold tracking-wide flex-1 text-stone-600 pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>RPT :</h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={rpt}
                    onChange={(e) => {
                      setRpt(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Exit % : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={exitPercentage}
                    onChange={(e) => {
                      setExitPercentage(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Gain % : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={gainPercentage}
                    onChange={(e) => {
                      setGainPercentage(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>ROI %: </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={roiPercentage}
                    onChange={(e) => {
                      setRoiPercentage(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>RR : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={rr}
                    onChange={(e) => {
                      setRr(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <h1>Net Profit : </h1>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={netProfit}
                    onChange={(e) => {
                      setNetProfit(e.target.value);
                    }}
                    className="outline-none font-light flex-1 tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className="w-full text-end">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg ">
                    Submit
                  </button>
                </div>
                {/* <button className="bg-blue-600 text-white px-6 py-2 rounded-lg " onClick={()=>console.log('nihal')}>Submit</button> */}
              </form>
            </div>
            {status === 1 && (
              <div className="toast toast-top toast-end">
                <div className="alert alert-info px-10 bg-blue-700 text-white text-[17px]">
                  <span>{responseMessage}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
