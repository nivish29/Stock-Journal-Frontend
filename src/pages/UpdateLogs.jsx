import { useState } from "react"
import { SideNavbar } from "../component/SideNavbar"
import { AddLogsComp } from "../component/AddLogsComp";
import dayjs from "dayjs";
import { UpdateLogsComp } from "../component/UpdateLogsComp";
export const UpdateLogs=()=>{
    const [open, setOpen] = useState(false);
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    return(
        <div className="flex">
              <SideNavbar open={open} setOpen={setOpen} />
              <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
        <div className="bg-white w-[95%] my-[60px] rounded-[16px] shadow-xl shadow-zinc-300">
          <div className="absolute top-4 tracking-wider text-2xl font-[600] text-stone-500">
           Log
          </div>
          <UpdateLogsComp
            today={today}
            setToday={setToday}
            currentDate={currentDate}
          />
        </div>
      </div>
        </div>
    )
}