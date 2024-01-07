import dayjs from "dayjs";
import cn from "../utils/cn";
import { generateDate, months } from "../utils/calender";
import { useState } from "react";
import { Calender } from "../component/Calender";
import { SideNavbar } from "../component/SideNavbar";

function Home() {
  console.log(generateDate());
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <SideNavbar open={open} setOpen={setOpen} />
      <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
        <div className="bg-white w-[95%] my-[60px] rounded-[16px] shadow-xl shadow-zinc-300">
          <div className="absolute top-4 tracking-wider text-2xl font-[600] text-stone-500">
            Journal
          </div>
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
