import { useState } from "react";
import authPageImg from "./../assets/authPage_img.jpg";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    //   const userData = { username, role: 'user' };
    //   onLogin(userData);
  };

  return (
    <div className="overflow-y-hidden">
      <div className="h-[100vh] bg-cover items-center flex bg-stock-bg  overflow-y-auto ">
        <div className="flex justify-around w-full px-20">
          <div className="flex flex-col mt-auto mb-auto text-white">
            <h1 className="font-bold text-7xl tracking-wide">InvestLog</h1>
            <h1 className="font-thin text-xl pt-3 tracking-wide">
              Where Every Stock Tells a Story
            </h1>
            <h1 className="font-semibold  text-4xl pt-14  text-white tracking-wide w-[100%] lg:pr-10">
              Fuel your financial journey, record your stocks, and shape your
              success narrative
            </h1>
          </div>
          <div className="bg-white w-fit   items-center py-16 px-12  rounded-3xl shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10">
            {/* <div className="bg-white w-fit   items-center ml-auto py-16 px-12  rounded-3xl shadow-2xl mx-16 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10"> */}
            <h1 className="text-[42px] tracking-wider font-bold text-stone-400 ">
              Login
            </h1>
            <div className="text-[17px] py-4 font-thin w-[25rem] text-stone-200">
              Unlock your financial journey – Log your stocks, track your
              success!
            </div>
            <form className="m-auto flex flex-col">
              <div className="flex border-b border-white mt-8 text-white">
                <label className="flex w-full font-thin text-[18px]">
                  Email:
                  <input
                    className="outline-none font-normal pl-2 pb-2 bg-transparent"
                    type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="flex border-b border-white w-full mt-1 text-white ">
                <label className=" flex w-full font-thin text-[18px]">
                  Password:
                  <input
                    className="outline-none font-normal pl-2 pb-2 bg-transparent"
                    type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
              </div>
              <br />
              <div className="bg-transparent border justify-end items-end w-fit ml-auto mt-6 px-7 py-2 rounded-xl cursor-pointer hover:scale-[1.03] duration-300 text-white">
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div
                className="ml-auto mt-5 text-white cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Don't have an account?{" "}
                <span className="text-blue-700 font-[500]">Sign Up</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
