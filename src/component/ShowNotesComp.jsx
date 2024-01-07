import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { generateDate, months } from "../utils/calender";
import { useNavigate, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const ShowNoteComp = ({ today, setToday, currentDate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.state.date;
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
  const daysInMonth = curr.daysInMonth();
  console.log(curr.day(2));

  console.log(date["$d"] < currentDate["$d"]);
  console.log(currentDate["$d"]);
  const dateElements = [];
  if (date["$d"] < currentDate["$d"]) {
    if (date["$y"] == currentDate["$y"] && date["$M"] == currentDate["$M"]) {
      for (let day = 1; day <= currentDate["$D"]; day++) {
        dateElements.push({
          date: day,
          week_day: dayjs().year(date["$y"]).month(date["$M"]).date(day).day(),
        });
      }
    }

    if (date["$y"] == currentDate["$y"] && date["$M"] < currentDate["$M"]) {
      const lastDateOfMonth = dayjs()
        .year(date["$y"])
        .month(date["$M"])
        .endOf("month")
        .date();
      for (let day = 1; day <= lastDateOfMonth; day++) {
        dateElements.push({
          date: day,
          week_day: dayjs().year(date["$y"]).month(date["$M"]).date(day).day(),
        });
      }
    }

    if (date["$y"] < currentDate["$y"]) {
      const lastDateOfMonth = dayjs()
        .year(date["$y"])
        .month(date["$M"])
        .endOf("month")
        .date();
      // const startDateOfMonth = dayjs().year(date['$y']).month(date['$M']).date(date['$D']).day();
      // console.log(weekDays[startDateOfMonth%7])
      for (let day = 1; day <= lastDateOfMonth; day++) {
        dateElements.push({
          date: day,
          week_day: dayjs().year(date["$y"]).month(date["$M"]).date(day).day(),
        });
      }
    }
  }

  console.log(dateElements);

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [clicked, setClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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

  useEffect(() => {
    fetchData(`${date["$D"]}-${date["$M"] + 1}-${date["$y"]}`);
  }, []);

  const [linkArray, SetLinkArray] = useState([]);

  const fetchData = async (date) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/journal/getJournalByMonth?date=${date}`
      );
      const result = await response.json();

      if (result.status === 1) {
        setData(result.data);
        if (result.data.length != 0) {
          // SetLinkArray(
          //   result.data[0].Link.includes(",")
          //     ? result.data[0].Link.split(",").map((link) => link.trim())
          //     : [result.data[0].Link.trim()]
          // );
          const linkObjects = result.data.map((entry) => {
            const links = entry.Link.includes(",")
              ? entry.Link.split(",").map((link) => link.trim())
              : [entry.Link.trim()];

            return { links };
          });

          // Set the array of link objects to the state
          SetLinkArray(linkObjects);
        }
      } else {
        console.error("Failed to fetch data:", result);
      }
      setTimeout(() => {
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    console.log(currentIndex);
  };
  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="">
      <div className="px-4 pt-6 flex justify-between ">
        <div className="flex gap-4">
          <div className="">
            {" "}
            <GrFormPrevious className="w-6 h-6 relative top-1"></GrFormPrevious>
          </div>
          <h1 className="text-2xl text-gray-900 tracking-wide font-[700]">
            Notes
          </h1>
          <h1 className="text-[16px] text-gray-900 font-[500] mt-[6px]">
            {weekDays[date["$W"] % 7]}, {date["$D"]} {months[date["$M"]]}{" "}
            {date["$y"]}
          </h1>
        </div>
        <div className="flex">
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 text-white px-1 py-1 rounded-md mr-2"
              onClick={handlePreviousClick}
            >
              <GrFormPrevious></GrFormPrevious>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 text-white px-1 py-1 rounded-md mr-3"
              onClick={handleNextClick}
            >
              <GrFormNext></GrFormNext>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gray-200 mt-2"></div>
      <div className="">
        <div className=" flex">
          <div className="flex flex-col mt-5 lg:w-[28vw]  md:w-[300px] sm:w-[250px] w-[180px] lg:px-7 h-[64vh] md:h-[75vh] lg:h-[66vh] between-lg-md:h-[66vh] between-md-sm:h-[66vh] scrollbar-hide overflow-y-auto px-4">
            {dateElements.map((dateElement, index) => (
              <div key={index} className="">
                <div
                  className={`flex border ${
                    selectedDate === dateElement["date"]
                      ? "border-red-600 border-[2px]"
                      : dateElement["date"] == currentDate["$D"] &&
                        date["$M"] == currentDate["$M"] &&
                        date["$y"] == currentDate["$y"]
                      ? "border-blue-600 border-[2px]"
                      : "border-gray-300"
                  } h-20 items-center rounded-[12px] cursor-pointer hover:scale-[1.03] duration-200`}
                  onClick={async () => {
                    await fetchData(
                      `${dateElement["date"]}-${date["$M"] + 1}-${date["$y"]}`
                    );
                    setSelectedDate(dateElement["date"]);
                  }}
                >
                  <div className="h-7 w-7 bg-gray-300 justify-center rounded-[6px] ml-6 text-center">
                    <div>{dateElement["date"]}</div>
                  </div>
                  <div className="px-4">
                    {weekDays[dateElement["week_day"] % 7]}
                  </div>
                </div>
                <div className="h-[0.6px] w-full my-3 bg-gray-200"></div>
              </div>
            ))}
          </div>
          <div className="h-auto w-[0.6px] bg-gray-200"></div>
          <div className="flex flex-col flex-1 px-8 py-5 h-[64vh] md:h-[75vh] lg:h-[66vh] between-lg-md:h-[66vh] between-md-sm:h-[66vh] scrollbar-hide overflow-y-auto">
            {loading ? (
              <div className="justify-center h-full">
                {/* <span className="loading loading-dots loading-lg bg-gray-500"></span> */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-20 w-full"></div>

                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                {/* No data found */}
                <div className="text-xl font-semibold">No data found 😔</div>
              </div>
            ) : (
              data.map((entry, index) => (
                <div
                  className={`flex flex-col gap-y-4 pb-12 ${
                    index === currentIndex ? "visible" : "hidden"
                  }`}
                  id={index}
                  key={index}
                >
                  <div className="flex">
                    <h1 className="font-semibold">Title:&nbsp;</h1>
                    <h1>{entry.Title}</h1>
                  </div>
                  <div className="flex">
                    <h1 className="font-semibold">Tag:&nbsp;</h1>
                    <h1>{entry.Tag}</h1>
                  </div>
                  <div className="flex">
                    <h1 className="font-semibold">Thought:&nbsp;</h1>
                    <h1>{entry.Thoughts}</h1>
                  </div>
                  <div className="font-semibold">Chart: </div>
                  {/* {linkArray.length > 0 && (
                    <div className="grid gap-5 shadow-lg rounded-3xl px-3 py-5">
                      {linkArray.map((link, innerIndex) => (
                        <a
                          key={innerIndex}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={link}
                            alt={`No image added`}
                            className="h-auto w-auto shadow-lg rounded-2xl"
                            onError={(e) => {
                              e.target.src = 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'; // Replace with your placeholder image path
                              e.target.style.height = '150px'; // Set the desired height
                              e.target.style.width = '150px'; // Set the desired width
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  )} */}
                  {linkArray.length > 0 && (
                    <div className="grid gap-5 shadow-lg rounded-3xl px-3 py-5">
                      {linkArray[index].links.map((link, innerIndex) => (
                        <a
                          key={innerIndex}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={link}
                            alt={`No image added`}
                            className="h-auto w-auto shadow-lg rounded-2xl"
                            onError={(e) => {
                              e.target.src =
                                "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"; // Replace with your placeholder image path
                              e.target.style.height = "150px"; // Set the desired height
                              e.target.style.width = "150px"; // Set the desired width
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
