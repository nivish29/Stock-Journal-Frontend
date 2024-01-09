import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { generateDate, months } from "../utils/calender";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const UpdateLogsComp = ({ today, setToday, currentDate }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const editData = location.state.editData;
  const others = location.state.others;
  console.log(editData.entry)
  console.log(others)

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const userId = decodedToken._id;

  const [symbol, setSymbol] = useState(editData.entry.Symbol);
  const [positionSize, setPositionSize] = useState(
    editData.entry["Position Size"]
  );
  const [positionSizePercentage, setPositionSizePercentage] = useState(
    editData.entry["Position Size %"]
  );
  const [rpt, setRpt] = useState(editData.entry["RPT"]);
  const [rptPercentage, setRptPercentage] = useState(editData.entry["RPT %"]);
  const [exitPercentage, setExitPercentage] = useState(
    editData.entry["Exit %"]
  );
  const [exitPrice, setExitPrice] = useState(editData.entry["Exit Price"]);
  const [gainPercentage, setGainPercentage] = useState(
    editData.entry["Gain %"]
  );
  const [accountGainPercentage, setAccountGainPercentage] = useState(
    editData.entry["Account Gain %"]
  );
  const [roiPercentage, setRoiPercentage] = useState(editData.entry["ROI%"]);
  const [days, setDays] = useState(editData.entry["Days"]);
  const [rr, setRr] = useState(editData.entry["RR"]);
  const [charges, setCharges] = useState(editData.entry["Charges"]);
  const [netProfit, setNetProfit] = useState(editData.entry["Net Profit"]);
  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateJournal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://stock-journal-backend.onrender.com/api/journal/updateJournalEntry?id=${editData.entry._id}`,
        {
          // Replace with the actual ID of the journal entry
          Title: others.Title,
          Tag: others.Tag,
          Thoughts:others.Thoughts,
          Link: others.Link,
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
          userId: userId,
        }
      );
      console.log(response.data);

      setStatus(response.data.status);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error updating journal entry:", error);
      setStatus(0);
      setResponseMessage("Error occurred while making the request.");
    }
  };

  useEffect(() => {
    if (status === 1) {
      const timeoutId = setTimeout(() => {
        setStatus(0);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [status]);

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
              <form action="" className="w-full" onSubmit={updateJournal}>
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
                  {loading && (
                    <span className="loading loading-dots items-center loading-lg bg-gray-500 mr-12"></span>
                  )}
                  {!loading && (
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg ">
                      Submit
                    </button>
                  )}
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
