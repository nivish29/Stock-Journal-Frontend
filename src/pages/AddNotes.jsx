import { useState } from "react";
import { SideNavbar } from "../component/SideNavbar";
import { AddNoteComp } from "../component/AddNoteComp";
import dayjs from "dayjs";
export const AddNotes = () => {
  const [open, setOpen] = useState(false);
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  return (
    <div className="flex h-screen">
      <SideNavbar open={open} setOpen={setOpen} />
      <div className="flex justify-center bg-[#F2F2F2] w-full">
        <div className="bg-white w-[95%] my-[70px] rounded-[16px] shadow-xl shadow-zinc-300">
          <div className="absolute top-4 tracking-wider text-2xl font-[600] text-stone-500">
            Journal
          </div>
          <AddNoteComp
            today={today}
            setToday={setToday}
            currentDate={currentDate}
          />
        </div>
      </div>
    </div>
  );
};
