import dayjs from "dayjs";
import cn from "../utils/cn";
import { generateDate, months } from "../utils/calender";
import { useEffect, useState } from "react";
import { Calender } from "../component/Calender";
import { SideNavbar } from "../component/SideNavbar";
import { jwtDecode } from "jwt-decode";
import logoutIcon from "../assets/logout_icon.svg"

function Home() {
  console.log(generateDate());
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

 useEffect(()=>{
    const token=localStorage.getItem("token")
    const decodedToken=decodeToken(token)
    // console.log(decodedToken.firstName)
    setName(decodedToken.firstName)
    // if(!decodedToken){
    //   window.location.href="/login"
    // }
 },[])

  const handleLogout=()=>{
    localStorage.removeItem("token")
    window.location.reload();
  }
  return (
    <div className="flex">
      <SideNavbar open={open} setOpen={setOpen} />
      <div className="flex flex-col justify-center items-center bg-[#F2F2F2] w-full">
      <div className="flex  w-full px-10 mt-5 tracking-wider text-2xl font-[600] text-stone-500">
            <div>
            <span>{name}'s </span>Journal
            </div>
            <div
          className={`flex items-center  ml-auto duration-300 cursor-pointer hover:scale-105`}
        onClick={handleLogout}>
          <img
            src={logoutIcon}
            alt=""
            className="h-5 w-5 fill-white cursor-pointer duration-500 "
          />
          <a
            className={`text-black text-[16px] font-normal pl-2 tracking-wide origin-left `}
            href="https://in.tradingview.com/chart/YibKLWZp/"
            target="_blank"
            rel="noreferrer"
          >
            Log Out
          </a>
        </div>
          </div>
        <div className="bg-white w-[95%] my-5 rounded-[16px] shadow-xl shadow-zinc-300">
          
          <Calender
            today={today}
            setToday={setToday}
            currentDate={currentDate}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
