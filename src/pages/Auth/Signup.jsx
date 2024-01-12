import { useState } from "react";
import authPageImg from "../../assets/authPage_img.jpg";
import { useNavigate } from "react-router-dom";
import "./css/auth.css"
import axios from "axios";

export const SignUp = () => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url =
        "https://stock-journal-backend.onrender.com/api/journal/auth/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status >= 400 && e.response.status <= 500) {
        setError(e.response.data.message);
      }
    }
  };

  return (
    <div className="overflow-y-hidden ">
      {/* <div className="h-[100vh] bg-cover items-center flex bg-stock-bg  overflow-y-auto ">
        <div className="flex justify-around w-full px-20"> */}
      <div className="h-screen items-center overflow-y-hidden relative">
        <img
          src={authPageImg}
          className="object-cover h-full w-full overflow-y-hidden "
          loading="lazy"
          alt=""
        />
        <div className="flex justify-center w-full h-full  px-20 absolute top-0 overflow-y-hidden overflow-x-hidden">
          <div className="flex-col mt-auto mb-auto hidden lg:block md:hidden text-white">
            <h1 className="font-bold text-7xl tracking-wide">InvestLog</h1>
            <h1 className="font-thin text-xl pt-3 tracking-wide">
              Where Every Stock Tells a Story
            </h1>
            <h1 className="font-semibold  text-4xl pt-14  text-white tracking-wide w-[100%] lg:pr-10">
              Fuel your financial journey, record your stocks, and shape your
              success narrative
            </h1>
          </div>
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white w-fit  h-fit justify-center  items-center py-10 px-12  rounded-3xl shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10">
              {/* <div className="bg-white w-fit   items-center ml-auto py-16 px-12  rounded-3xl shadow-2xl mx-16 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10"> */}
              <h1 className="text-[42px] tracking-wider font-bold text-stone-400 ">
                Sign up
              </h1>
              <div className="text-[17px] py-4 font-thin w-[25rem] text-stone-200">
                Unlock your financial journey – Log your stocks, track your
                success!
              </div>
              <form
                className="m-auto flex flex-col overflow-hidden  overflow-y-auto h-[75%] scrollbar-hide"
                onSubmit={handleSubmit}
              >
                <div className="flex border-b border-white mt-5 text-white">
                  <label className="flex w-full font-thin text-[18px]">
                    First Name:
                    <input
                      className="outline-none font-normal pl-2 pb-2 bg-transparent"
                      type="text"
                      name="firstName"
                      placeholder=""
                      value={data.firstName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="flex border-b border-white mt-8 text-white">
                  <label className="flex w-full font-thin text-[18px]">
                    Last Name:
                    <input
                      className="outline-none font-normal pl-2 pb-2 bg-transparent"
                      type="text"
                      name="lastName"
                      placeholder=""
                      value={data.lastName}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="flex border-b border-white mt-8 text-white bg-transparent">
                  <label className="flex w-full font-thin text-[18px]">
                    Email:
                    <input
                      className="outline-none font-normal pl-2 pb-2 bg-transparent"
                      type="text"
                      name="email"
                      placeholder=""
                      value={data.email}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="flex border-b border-white mt-8 text-white bg-transparent">
                  <label className="flex w-full font-thin text-[18px] bg-transparent">
                    Password:
                    <input
                      className="outline-none font-normal pl-2 pb-2 bg-transparent"
                      type="password"
                      name="password"
                      placeholder=""
                      value={data.password}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {error && <div className="text-red-600 mt-3">{error}</div>}
                {loading && (
                  <span className="loading loading-dots items-center loading-lg bg-gray-500 ml-auto mt-3"></span>
                )}
                {!loading && (
                  <div
                    className="bg-transparent border justify-end items-end w-fit ml-auto mt-6 px-7 py-2 rounded-xl cursor-pointer hover:scale-[1.03] duration-300 text-white"
                    onClick={handleSubmit}
                  >
                    <button type="button">Sign up</button>
                  </div>
                )}
                <div
                  className="ml-auto mt-5 text-white cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Already have an account?{" "}
                  <span className="text-blue-700 font-[500]">Login</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
