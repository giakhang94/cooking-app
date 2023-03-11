import reducer from "./reducer";
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import {
  CLEART_ALERT,
  COOKING_CREATE_BEGIN,
  COOKING_CREATE_ERROR,
  COOKING_CREATE_SUCCESS,
  COOKING_GET_BY_CATES_BEGIN,
  COOKING_GET_BY_CATES_ERROR,
  COOKING_GET_BY_CATES_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_ERROR,
  GET_CURRENT_USER_SUCCESS,
  USER_LOGIN_BEGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
} from "./action";
const initState = {
  user: null,
  isLogin: false,
  isLoading: false,
  raw: [
    "cá lóc",
    "lòng tong",
    "cá bóng",
    "thăn",
    "cánh gà",
    "bọng gà",
    "đùi gà",
    "điêu hồng",
    "bầu",
    "bí đỏ",
    "mướp",
    "củ cải",
    "củ dền",
    "cải xanh",
  ],
  meals: null,
};
const appContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const authFetch = axios.create({
    baseURL: "/api",
  });
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("intercepter", error);
      if (error.response.data.status === 401) {
        console.log("auth error");
      }
      return Promise.reject(error);
    }
  );
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEART_ALERT });
    }, 5000);
  };
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/user/getCurrentUser");
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({ type: GET_CURRENT_USER_ERROR });
    }
  };
  const login = async (dataLogin) => {
    dispatch({ type: USER_LOGIN_BEGIN });
    try {
      const { data } = authFetch.post("/user/login", { ...dataLogin });
      dispatch({ type: USER_LOGIN_SUCCESS });
    } catch (error) {
      dispatch({ type: USER_LOGIN_ERROR });
    }
  };
  const createMeal = async (dataMeal) => {
    dispatch({ type: COOKING_CREATE_BEGIN });
    try {
      await authFetch.post("/cooking/create", { ...dataMeal });
      dispatch({ type: COOKING_CREATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: COOKING_CREATE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getMealsByCate = async (cate) => {
    dispatch({ type: COOKING_GET_BY_CATES_BEGIN });
    try {
      const { data } = await authFetch.get(`/cooking/getbycates/${cate}`);
      console.log(data.result);
      dispatch({ type: COOKING_GET_BY_CATES_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: COOKING_GET_BY_CATES_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert();
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <appContext.Provider
      value={{ ...state, getCurrentUser, login, createMeal, getMealsByCate }}
    >
      {children}
    </appContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(appContext);
};
export { AppProvider, useAppContext };
