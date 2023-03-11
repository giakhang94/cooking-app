import "./App.css";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreatMeal, Home, Login } from "./pages";
import Header from "./components/Header";
import { useAppContext } from "./context/context";
function App() {
  const { isLogin } = useAppContext();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-meal" element={isLogin ? <CreatMeal /> : <Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
