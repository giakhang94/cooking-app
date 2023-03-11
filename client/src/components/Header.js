import { Link } from "react-router-dom";
import Logo from "./Logo";
const Header = () => {
  return (
    <div className="flex justify-center items-center mx-5 py-5">
      <Link to="/">
        <Logo />
        <div className="mr-5 text-slate-700 font-bold tracking-[1.5px] text-md">
          Hôm nay ăn gì?
        </div>
      </Link>
      <Link to="/add-meal">
        <div className="py-1 px-2 bg-emerald-300 text-emerald-600 tracking-[1.5px] font-semibold rounded-md">
          Thêm món
        </div>
      </Link>
    </div>
  );
};

export default Header;
