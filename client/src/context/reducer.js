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

const reducer = (state, action) => {
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLogin: true,
      user: action.payload.data.user,
    };
  }
  if (action.type === GET_CURRENT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === USER_LOGIN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === USER_LOGIN_SUCCESS) {
    return {
      ...state,
      isLogin: true,
    };
  }
  if (action.type === USER_LOGIN_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === COOKING_CREATE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === COOKING_CREATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Tạo thành công",
      alertType: "success",
    };
  }
  if (action.type === COOKING_CREATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === CLEART_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === COOKING_GET_BY_CATES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === COOKING_GET_BY_CATES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      meals: action.payload.data.result,
    };
  }
  if (action.type === COOKING_GET_BY_CATES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
      meals: null,
    };
  }
};
export default reducer;
