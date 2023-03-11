import { useState } from "react";
import { Alert } from "../components";
import Loading from "../components/Loading";
import { useAppContext } from "../context/context";

const Home = () => {
  const {
    raw,
    getMealsByCate,
    isLoading,
    meals,
    showAlert,
    alertText,
    alertType,
  } = useAppContext();
  const [input, setInput] = useState("cá lóc");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getMealsByCate(input);
  };
  let random = 0;
  if (meals) {
    random = Math.floor(Math.random() * meals.length);
  }
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="w-full">
      <div className="flex justify-center w-full mb-5">
        <div className="separater w-[280px] h-[1px] bg-gray-300 text-center flex justify-center"></div>
      </div>
      <form action="" className="mx-auto flex flex-col items-center">
        <div className="w-full max-w-[300px]">
          <label className="block text-slate-700 font-semibold mb-1 ">
            Chọn 1 Nguyên Liệu
          </label>
          <select
            name="meat"
            value={input}
            className="border borde-gray-300 py-1 px-1 rounded-sm mb-5 w-full"
            onChange={handleChange}
          >
            {raw &&
              raw.map((meat, index) => {
                return (
                  <option value={meat} key={index + "meat"}>
                    {meat}
                  </option>
                );
              })}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full max-w-[300px] bg-emerald-500 text-white font-semibold tracking-[1.5px] py-2`}
        >
          Nhấn vô cái này
        </button>
      </form>
      {!isLoading ? (
        <div className="flex flex-col items-center mt-8 w-full">
          <div className="w-full max-w-[300px]">
            {showAlert && <Alert alertText={alertText} alertType={alertType} />}
            <h3>
              <span className="text-slate-700 font-semibold text-lg">
                Món:{" "}
              </span>
              <span className="font-semibold text-lg ml-3 py-1 px-3 rounded-md bg-green-200 text-green-800">
                {!!meals && meals[random].name}
              </span>
            </h3>
            <ol>
              <span className="text-slate-700 font-semibold text-lg">
                Mô tả:{" "}
              </span>
              {meals &&
                meals[random].description.split(".").map((line, index) => {
                  return (
                    <li className="pl-5" key={index + "line"}>
                      {line}
                    </li>
                  );
                })}
            </ol>
            <span className="text-slate-700 font-semibold text-lg">
              Link (nếu có):{" "}
            </span>
            <span>
              <a href={meals && meals[random].link}>
                {meals && meals[random].link}
              </a>
            </span>
          </div>
        </div>
      ) : (
        <Loading classname="w-25 h-25 flex justify-center" />
      )}
    </div>
  );
};
export default Home;
