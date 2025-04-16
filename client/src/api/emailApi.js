import axios from "axios";
import { USER_ACTIONS } from "../reducers/usersReducer";

export const sendEmail = async (usersDispatch, emailData) => {
  try {
    const response = await axios.post("/api/email", emailData);
    usersDispatch({
      type: USER_ACTIONS.SEND_EMAIL,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to send email.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};
