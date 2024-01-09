import { useEffect, useState, useRef } from "react";
import { SideNavbar } from "../component/SideNavbar";
import { AddLogsComp } from "../component/AddLogsComp";
import dayjs from "dayjs";
import { months } from "../utils/calender";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { LogsComp } from "../component/LogsComp";
import DataTable from "../component/table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { jwtDecode } from "jwt-decode";
// import { data } from "../utils/data";
export const Logs = () => {
  const [open, setOpen] = useState(false);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const createHeaders = (keys) => {
    const result = [];
    keys.forEach((key) => {
      result.push({
        id: key,
        name: key,
        prompt: key,
      });
    });
    return result;
  };


const exportData = () => {
  const limit=30
  const doc = new jsPDF({ orientation: 'landscape' });
  // const reverseData=data.reverse()
  const limitedData = data.slice(0, limit);
  const headers = createHeaders([
    "Date",
    "Symbol",
    "Position Size",
    "Position Size %",
    "RPT",
    "RPT %",
    "Exit %",
    "Exit Price",
    "Gain %",
    "Account Gain %",
    "ROI%",
    "Days",
    "RR",
    "Charges",
    "Net Profit",
  ]);

  const tableData = limitedData.filter(entry => entry.Symbol).map((row) => ({
    ...row,
    Date: row.Date.toString(),
    Symbol: row.Symbol.toString(),
    PositionSize: row['Position Size'].toString(),
    PositionSizePercentage: row['Position Size %'].toString(),
    RPT: row.RPT.toString(),
    RPTPercentage: row['RPT %'].toString(),
    ExitPercentage: row['Exit %'].toString(),
    ExitPrice: row['Exit Price'].toString(),
    GainPercentage: row['Gain %'].toString(),
    AccountGainPercentage: row['Account Gain %'].toString(),
    ROIPercentage: row['ROI%'].toString(),
    Days: row.Days.toString(),
    RR: row.RR.toString(),
    Charges: row.Charges.toString(),
    NetProfit: row['Net Profit'].toString(),
  }));

  // Set up table
  const table = [headers.map(header => header.name)];
  tableData.forEach(row => {
    table.push(headers.map(header => row[header.id]));
  });

  // Calculate column widths
  const columnWidths = headers.reduce((acc, header) => {
    const maxCellWidth = Math.max(
      header.name.length,
      ...tableData.map(row => String(row[header.id]).length)
    );
    acc[header.id] = Math.min(10, maxCellWidth * 5); // Adjust the maximum width if needed
    return acc;
  }, {});

  // Set up initial position for the table
  let yPos = 20;

  // Add table headers
  doc.setFontSize(15);
  
  // doc.setFont("bold");
  const textWidth = doc.getTextWidth("Logs Data");
  const startX = (doc.internal.pageSize.width - textWidth) / 2;
  doc.text("Logs Data", startX, yPos);
  // yPos += 15; 
  yPos += 10;

  // Add table
  doc.autoTable({
    head: [headers.map(header => header.name)],
    body: tableData.map(row => headers.map(header => row[header.id])),
    startY: yPos,
    columnStyles: columnWidths,
    headStyles: {
      fillColor: [176, 176, 176],
      valign: 'middle',
    },
    bodyStyles: {
      valign: 'middle', // Center-align row text vertically
    },
    styles: {
      fontSize: 7,
      cellPadding: 1.5,
      halign: 'center',
    },
  });

  doc.save("data.pdf");
};


  const componentPDF = useRef();

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const token=localStorage.getItem("token")
    const decodedToken=decodeToken(token)
    const userId=decodedToken._id;
console.log(userId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://stock-journal-backend.onrender.com/api/journal/getAllJournals?userId=${userId}`
        );
        
        const result = await response.json();
        console.log(result);
        setData(result.data.reverse());
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-auto ">
      <SideNavbar open={open} setOpen={setOpen} />
      <div className="flex justify-center bg-[#F2F2F2] w-[83%] md:w-[90%] lg:w-full   pt-4">
        <div className="bg-white w-[90%] lg:w-[95%] my-[60px] rounded-[16px] shadow-xl  shadow-zinc-300">
          <div className="absolute top-4 tracking-wider text-2xl font-[600] text-stone-500">
            Log
          </div>
          <div className="overflow-y-auto scrollbar-hide pt-3">
            <div className="flex justify-between px-5">
              <div className="flex gap-4">
                <div className="">
                  {" "}
                  <GrFormPrevious className="w-6 h-6 relative top-1"></GrFormPrevious>
                </div>

                <h1 className="text-2xl text-gray-900 tracking-wide font-[700]">
                  Add Log
                </h1>
                <h1 className="text-[16px] text-gray-900 font-[500] mt-[6px]">
                  {weekDays[today.day() % 7]}, {today.date()}{" "}
                  {months[today.month()]} {today.year()}
                </h1>
              </div>
              <div
                className="shadow-gray-400 bg-blue-600 shadow-lg py-1 px-5 text-[16px] rounded-md mb-1 cursor-pointer text-white font-normal hover:scale-[1.04] duration-200"
                onClick={exportData}
              >
                <button className="">Download Pdf</button>
              </div>
            </div>

            <div className="h-[1px] bg-gray-200 mt-2"></div>
            <div className="my-8 mx-2">
              {loading ? (
                <div className="h-full items-center text-center justify-center ">
                  <span className="loading loading-dots items-center loading-lg bg-gray-500"></span>
                </div>
              ) : (
                <div id="table" ref={componentPDF}>
                  <DataTable data={data}></DataTable>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <AddLogsComp
            today={today}
            setToday={setToday}
            currentDate={currentDate}
          /> */}
      </div>
    </div>

    // <div className="flex h-screen ">
    //   <SideNavbar open={open} setOpen={setOpen} />
    //   <div className="flex justify-center px-8 bg-[#F2F2F2] w-full ">
    //     <div className="absolute left-28 top-4 tracking-wider text-2xl font-[600] text-stone-500">
    //       Log
    //     </div>

    //     <div className="bg-white  w-[90vw]  overflow-x-auto  mt-[70px] mb-[50px] rounded-[16px] shadow-xl shadow-zinc-300 scrollbar-hide">
    //       <div className="px-4 pt-6 flex justify-between">
    //         <div className="flex gap-4">
    //           <div className="">
    //             {" "}
    //             <GrFormPrevious className="w-6 h-6 relative top-1"></GrFormPrevious>
    //           </div>
    //           <h1 className="text-2xl text-gray-900 tracking-wide font-[700]">
    //             Add Log
    //           </h1>
    //           <h1 className="text-[16px] text-gray-900 font-[500] mt-[6px]">
    //             {weekDays[today.day() % 7]}, {today.date()}{" "}
    //             {months[today.month()]} {today.year()}
    //           </h1>
    //         </div>
    //         <div className="hidden sm:block">
    //           {/* Render only on medium and large screens */}
    //           <div className="shadow-gray-400 bg-blue-600 shadow-lg py-1 px-5 text-[16px] rounded-md mb-1 text-white font-normal hover:scale-[1.04] duration-200">
    //             <button className="" onClick={() => navigate("/add-log")}>
    //               Add Log
    //             </button>
    //           </div>
    //         </div>
    //         <div className="block sm:hidden">
    //           {/* Render only on small screens */}
    //           <div className="border-black border shadow-lg w-7 h-7 text-[16px] rounded-md mb-1 text-black text-center font-normal">
    //             <button className="" onClick={() => navigate("/add-log")}>
    //               +
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="">
    //         <div className="h-[1px] bg-gray-200 mt-2"></div>
    //         <div className="my-8 mx-2 ">
    //           <DataTable data={data}></DataTable>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
