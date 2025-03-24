import axios from "axios";
import { USER_ACTIONS } from "../reducers/usersReducer";

export const register = async (usersDispatch, userData) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.post("api/auth/register", userData);
    usersDispatch({
      type: USER_ACTIONS.REGISTER,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Registration failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const verifyEmail = async (usersDispatch, token, userId) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.get(
      `api/auth/verify-email?token=${token}&userId=${userId}`
    );
    usersDispatch({
      type: USER_ACTIONS.VERIFY_EMAIL,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Email verification failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const login = async (usersDispatch, credentials) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.post("api/auth/login", credentials);
    usersDispatch({
      type: USER_ACTIONS.LOGIN,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const googleLogin = async (usersDispatch, credentials) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.post("api/auth/login/google", credentials);
    usersDispatch({
      type: USER_ACTIONS.LOGIN_GOOGLE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Google login failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getUserData = async (usersDispatch) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.post("api/auth/login/google", credentials);
    usersDispatch({
      type: USER_ACTIONS.LOGIN_GOOGLE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Google login failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const updateAccount = async (usersDispatch, userData) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.patch("api/auth/update-account", userData);
    usersDispatch({
      type: USER_ACTIONS.UPDATE_ACCOUNT,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update account.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const logout = async (usersDispatch) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    await axios.get("api/auth/logout");
    usersDispatch({
      type: USER_ACTIONS.LOGOUT,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Logout failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const changePassword = async (usersDispatch, passwordData) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    await axios.patch("/api/auth/change-password", passwordData);
    usersDispatch({
      type: USER_ACTIONS.CHANGE_PASSWORD,
    });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to change password.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const deleteAccount = async (usersDispatch) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    await axios.delete("api/auth/delete-account");
    usersDispatch({
      type: USER_ACTIONS.DELETE_ACCOUNT,
    });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete account.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllVenues = async (usersDispatch) => {
  usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
  try {
    const response = await axios.patch("api/auth/update-account", userData);
    usersDispatch({
      type: USER_ACTIONS.UPDATE_ACCOUNT,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update account.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};
