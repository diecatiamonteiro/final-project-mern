import axios from "axios";
import { BOOKING_ACTIONS } from "../reducers/bookingsReducer";

/* All the 7 API calls for the bookings page:
    - requestArtistOrVenue()
    - getSpecificBooking()
    - editBookingDate()
    - acceptBooking()
    - declineBooking()
    - cancelBooking()
    - getAllAcceptedBookings()
*/

export const requestArtistOrVenue = async (bookingsDispatch, bookingData) => {
  try {
    const response = await axios.post("/api/bookings", bookingData);
    bookingsDispatch({
      type: BOOKING_ACTIONS.REQUEST_ARTIST_OR_VENUE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Booking request failed.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getSpecificBooking = async (bookingsDispatch, bookingId) => {
  try {
    const response = await axios.get(`api/bookings/${bookingId}`);
    bookingsDispatch({
      type: BOOKING_ACTIONS.GET_SPECIFIC_BOOKING,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Booking request failed.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};

export const editBookingDate = async (
  bookingsDispatch,
  bookingId,
  bookingData
) => {
  try {
    const response = await axios.patch(
      `api/bookings/${bookingId}/edit`,
      bookingData
    );
    bookingsDispatch({
      type: BOOKING_ACTIONS.EDIT_BOOKING_DATE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Booking date edit failed.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};

export const acceptBooking = async (
  bookingsDispatch,
  bookingId,
  bookingData
) => {
  try {
    const response = await axios.patch(
      `api/bookings/${bookingId}/accept`,
      bookingData
    );
    bookingsDispatch({
      type: BOOKING_ACTIONS.ACCEPT_BOOKING,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Booking acceptance failed.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};

export const declineBooking = async (
  bookingsDispatch,
  bookingId,
  bookingData
) => {
  try {
    const response = await axios.patch(
      `api/bookings/${bookingId}/decline`,
      bookingData
    );
    bookingsDispatch({
      type: BOOKING_ACTIONS.DECLINE_BOOKING,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Booking decline failed.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};

export const cancelBooking = async (
  bookingsDispatch,
  bookingId,
  bookingData
) => {
  try {
    const response = await axios.patch(
      `api/bookings/${bookingId}/cancel`,
      bookingData
    );

    bookingsDispatch({
      type: BOOKING_ACTIONS.CANCEL_BOOKING,
      payload: {
        data: response.data,
        cancelledId: bookingId,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Booking cancellation failed.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllAcceptedBookings = async (bookingsDispatch) => {
  try {
    const response = await axios.get(`api/bookings/accepted`);
    bookingsDispatch({
      type: BOOKING_ACTIONS.GET_ALL_ACCEPTED_BOOKINGS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get all accepted bookings.";
    bookingsDispatch({
      type: BOOKING_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    bookingsDispatch({ type: BOOKING_ACTIONS.SET_LOADING, payload: false });
  }
};
