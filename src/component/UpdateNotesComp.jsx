import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import { generateDate, months } from "../utils/calender";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const UpdateNoteComp = ({ today, setToday, currentDate }) => {
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
  const daysInMonth = curr.daysInMonth();
  console.log(curr.day(2));

  const dateElements = [];
  for (let day = 1; day <= today.date(); day++) {
    const date = curr.date(day);
    dateElements.push(
      //   <div key={day} className="date-item flex">
      //     {day}
      //   </div>
      {
        date: day,
        week_day: curr.day(day).day(),
      }
    );
  }

  console.log(dateElements);

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [allData, setAllData] = useState({
    title: title,
    tag: tag,
    content: content,
    link: link,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

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



  const MAX_TITLE_LENGTH = 80;
  // const MAX_TAG_LENGTH = 8;

  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length <= MAX_TITLE_LENGTH) {
      setTitle(inputTitle);
    }
    console.log(title);
  };

  const handleTagChange = (e) => {
    const inputTag = e.target.value;
    setTag(inputTag);
  };
  const [showToast, setShowToast] = useState(false);
  const handleContentChange = (e) => {
    const inputContent = e.target.value;
    setContent(inputContent);
  };

  useEffect(() => {
    if (status === 1) {
      setShowToast(true);

      const timeoutId = setTimeout(() => {
        setShowToast(false);
        setStatus(0);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [status]);

  useEffect(() => {
    setAllData({
      title: title,
      tag: tag,
      content: content,
      link: link,
    });
  }, [title, tag, content, link]);

  const location = useLocation();
  const editData = location.state.editData;
  console.log(editData);

  useEffect(() => {
    if (editData) {
      setTitle(editData.entry.Title || "");
      setTag(editData.entry.Tag || "");
      setContent(editData.entry.Thoughts || "");
      setLink(editData.entry.Link || "");
    }
  }, [editData]);

  const updateJournal = async () => {
    try {
      const response = await axios.put(
        `https://stock-journal-backend.onrender.com/api/journal/updateJournalEntry?id=${editData._id}`,
        {
          // Replace with the actual ID of the journal entry
          Title: title,
          Tag: tag,
          Thoughts: content,
          Link: link,
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

  return (
    <div className="">
      <div className="px-4 pt-6 flex justify-between">
        <div className="flex gap-4">
          <div className="">
            {" "}
            <GrFormPrevious className="w-6 h-6 relative top-1"></GrFormPrevious>
          </div>
          <h1 className="text-2xl text-gray-900 tracking-wide font-[700]">
            Update Note
          </h1>
          <h1 className="text-[16px] text-gray-900 font-[500] mt-[6px]">
            {weekDays[curr.day(today.date()).day() % 7]}, {today.date()}{" "}
            {months[today.month()]} {today.year()}
          </h1>
        </div>
      </div>
      <div className="h-[1px] bg-gray-200 mt-2"></div>
      <div className="">
        <div className=" flex">
          <div className="flex flex-col mt-5 lg:w-[28vw]  md:w-[300px] sm:w-[250px] w-[180px] lg:px-7 h-[64vh] md:h-[75vh] lg:h-[66vh] between-lg-md:h-[66vh] between-md-sm:h-[66vh] scrollbar-hide overflow-y-auto px-4">
            {dateElements.map((dateElement, index) => (
              <div key={index}>
                <div className="flex border border-gray-300 h-20 items-center rounded-[12px] cursor-pointer hover:scale-[1.03] duration-200">
                  <div className="h-7 w-7 bg-gray-300 my-6 rounded-[6px] ml-6 text-center ">
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
          <div className="h-[80vh] w-[0.6px] bg-gray-200"></div>
          <div className="flex flex-col flex-1 px-8 py-5">
            <div className="flex flex-col">
              <form action="" className="w-full">
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <label htmlFor="" className="">
                      Title*
                    </label>
                    <label htmlFor="" className="px-1 ">
                      :
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={title}
                    onChange={handleTitleChange}
                    className="outline-none font-semibold tracking-wide text-stone-600 pb-1 w-full h-10 px-3"
                  />
                  <div className="text-stone-500 text-sm">
                    {title.length}/{MAX_TITLE_LENGTH}
                  </div>
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]">
                    <label htmlFor="" className="">
                      Tag*
                    </label>
                    <label htmlFor="" className="px-1 ">
                      :
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={tag}
                    onChange={handleTagChange}
                    className="outline-none font-light tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
                <div className=" flex">
                  <div className="flex mt-[5px]"></div>
                  <textarea
                    type="text"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write down your thoughts"
                    className="border rounded-lg outline-stone-500 outline-1 font-light pt-2 tracking-wide pb-1 w-full h-32 px-3"
                  />
                </div>
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
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className="outline-none font-light tracking-wide pb-1 w-full h-10 px-3"
                  />
                </div>
                <div className="h-[0.6px] w-full mb-7 bg-gray-200"></div>
              </form>

              <div>
                <button
                  className="bg-blue-500 p-1 px-4 rounded-lg text-white hover:scale-[1.03] duration-300"
                  onClick={() => {
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  Next
                </button>
              </div>
              <dialog
                id="my_modal_3"
                className="modal"
                onClick={() => {
                  // document.getElementById("my_modal_3").close();
                }}
              >
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Warning!</h3>
                  <p className="py-5">Do you want to add your log?</p>
                  <div className="flex justify-end">
                    {loading && (
                      <span className="loading loading-dots items-center loading-lg bg-gray-500 mr-12"></span>
                    )}
                    {!loading && (
                      <button
                        className="btn mr-4"
                        onClick={() => {
                          updateJournal();
                        }}
                      >
                        Update without log
                      </button>
                    )}
                    <button
                      className="btn border-black"
                      onClick={() => {
                        console.log(`Note data to be passed: ${link}`);
                        navigate("/update-log", {
                          state: {
                            id: 1,
                            editData: editData,
                            others:{
                                Title: title,
                              Tag: tag,
                              Thoughts: content,
                              Link: link,
                            }
                          },
                        });
                      }}
                    >
                      Update Log
                    </button>
                  </div>
                </div>
              </dialog>
              {showToast && (
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
    </div>
  );
};
