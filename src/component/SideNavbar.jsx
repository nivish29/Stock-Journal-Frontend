import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import history from "./../assets/history_icon.svg";
import { useState } from "react";
import stock from "./../assets/stock_icon.svg";
import tvIcon from "./../assets/tv_icon.svg";
import logoutIcon from "./../assets/logout_icon.svg";
import homeIcon from "./../assets/home_icon.svg";
import { useNavigate } from "react-router-dom";

export const SideNavbar = ({ open, setOpen }) => {

const navigate= useNavigate();

  return (
    <div
      className={`
      
      ${
        open
          ? "w-56 lg:w-64 md:w-64 duration-500"
          : "w-16 lg:w-20 md:w-20 duration-500"
      } min-h-screen relative bg-white z-50 `}
      onMouseEnter={()=>setOpen(true)}
      onMouseLeave={()=>setOpen(false)}
    >
      <div className="flex flex-col mt-5">
      <div className="flex items-center gap-x-4 ml-5">
          <img
            src={homeIcon}
            alt=""
            className="h-[22px] w-[22px] fill-white cursor-pointer duration-500 ml-[5px] "
          />

          <h1
            className={`text-black text-[16px] font-normal tracking-wide origin-left duration-300 ${
              !open && "scale-0"
            } cursor-pointer hover:scale-105`}
            onClick={()=>navigate("/",{replace:true})}
          >
            Home
          </h1>
        </div>
        <div className="flex items-center gap-x-4 ml-5 mt-5">
          <img
            src={history}
            alt=""
            className="h-5 w-5 fill-white cursor-pointer duration-500 ml-[6px] "
          />

          <h1
            className={`text-black text-[16px] font-normal tracking-wide origin-left duration-300 ${
              !open && "scale-0"
            } cursor-pointer hover:scale-105`}
            onClick={()=>navigate("/logs")}
          >
            Logs
          </h1>
        </div>
        <div className="flex items-center gap-x-4 ml-5 mt-5">
          <img
            src={stock}
            alt=""
            className="h-5 w-5 fill-white cursor-pointer duration-500 ml-[6px]"
          />
          <h1
            className={`text-black text-[16px] font-normal tracking-wide origin-left duration-300 ${
              !open && "scale-0"
            } cursor-pointer hover:scale-105 `}
          >
            Chart
          </h1>
        </div>
        <div
          className={`flex items-center gap-x-4 ml-5 duration-300 ${
            open ? "mt-5" : 
            "mt-5"
          }`}
        >
          <img
            src={tvIcon}
            alt=""
            className="h-5 w-5 fill-white cursor-pointer duration-500 ml-[6px]"
          />
          <a
            className={`text-black text-[16px] font-normal tracking-wide origin-left duration-300 ${
              !open && "scale-0"
            }  cursor-pointer hover:scale-105`}
            href="https://in.tradingview.com/chart/YibKLWZp/"
            target="_blank"
            rel="noreferrer"
          >
            TradingView
          </a>
        </div>
        
      </div>
      {open ? (
        <GrFormPrevious
          className="absolute cursor-pointer right-[-12px] top-4 w-6 border-2 border-stone-400 bg-white rounded-full h-6"
          onClick={() => {
            setOpen(false);
          }}
        ></GrFormPrevious>
      ) : (
        <GrFormNext
          className="absolute cursor-pointer right-[-12px] top-4 w-6 border-2 border-stone-400 bg-white rounded-full h-6"
          onClick={() => {
            setOpen(true);
          }}
        ></GrFormNext>
      )}
    </div>
  );
};
