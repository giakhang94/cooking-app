import { useState } from "react";
import { useAppContext } from "../context/context";
import { Alert } from "../components";
const CreateMeal = () => {
  const { raw, createMeal, showAlert, alertType, alertText } = useAppContext();
  const [input, setInput] = useState({
    name: "",
    description: "",
    link: "",
    meat: "cá lóc",
  });
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    createMeal({
      name: input.name,
      description: input.description,
      link: input.link,
      meat: input.meat,
    });
    setInput((prev) => ({
      ...prev,
      link: "",
      description: "",
      name: "",
    }));
  };
  return (
    <form className="w-[100%] max-w-[300px] mx-auto px-5 py-8 flex flex-col rounded-md items-center shadow-md  shadow-gray-500">
      <h2 className="text-slate-700 font-semibold text-xl mb-3">Thêm Món</h2>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}
      <div className="w-full max-w-[300px]">
        <label className="block text-slate-700 font-semibold mb-1 ">
          Nguyên Liệu
        </label>
        <select
          name="meat"
          value={input.meat}
          className="border borde-gray-300 py-1 px-1 rounded-sm mb-2 w-full"
          onChange={handleChange}
        >
          {raw.map((meat, index) => {
            return (
              <option value={meat} key={index + "meat"}>
                {meat}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-full max-w-[300px]">
        <label className="block text-slate-700 font-semibold mb-1">
          Món ăn
        </label>
        <input
          type="text"
          className="p-1 border border-gray-300 rounded-sm mb-2 w-full"
          value={input.name}
          onChange={handleChange}
          name="name"
        />
      </div>
      <div className="w-full max-w-[300px]">
        <label className="block text-slate-700 font-semibold mb-1">Mô tả</label>
        <input
          type="text"
          className="p-1 border border-gray-300 rounded-sm mb-2 w-full"
          value={input.description}
          onChange={handleChange}
          name="description"
        />
      </div>
      <div className="w-full max-w-[300px]">
        <label className="block text-slate-700 font-semibold mb-1">Link</label>
        <input
          type="text"
          className="p-1 border border-gray-300 rounded-sm mb-2 w-full"
          value={input.link}
          onChange={handleChange}
          name="link"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full max-w-[300px] py-2 text-center text-white font-semibold tracking-[1.5px] bg-green-500"
      >
        Thêm Món
      </button>
    </form>
  );
};
export default CreateMeal;
