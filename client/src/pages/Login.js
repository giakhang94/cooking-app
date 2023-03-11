import { useState } from "react";
import { useAppContext } from "../context/context";

const Login = () => {
  const { login } = useAppContext();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username: input.username, password: input.password });
  };
  return (
    <form className="flex flex-col w-[full] items-center">
      <h2 className="text-slate-700 font-semibold text-xl mb-5">Login</h2>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={input.username}
        onChange={handleChange}
        className="border w-[80%] max-w-[300px] border-gray-300 rounded-sm py-2 px-1 text-gray-500 mb-5"
      />
      <input
        type="password"
        name="password"
        value={input.password}
        onChange={handleChange}
        placeholder="password"
        className="border w-[80%] max-w-[300px] border-gray-300 rounded-sm py-2 px-1 text-gray-500 mb-5"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-green-500 w-[80%] max-w-[300px] rounded-sm py-2 text-center text-white font-semibold tracking-[1.5px] text-lg"
      >
        Submit
      </button>
    </form>
  );
};
export default Login;
