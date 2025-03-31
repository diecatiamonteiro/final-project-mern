export const bookingsInitialState = {
  booking: null, // Single booking object
  allAcceptedBookings: [],
  isLoading: false,
  error: null,
};

export const BOOKING_ACTIONS = {
  // Global
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",

  // Bookings
  REQUEST_ARTIST_OR_VENUE: "REQUEST_ARTIST_OR_VENUE",
  GET_SPECIFIC_BOOKING: "GET_SPECIFIC_BOOKING",
  EDIT_BOOKING_DATE: "EDIT_BOOKING_DATE",
  ACCEPT_BOOKING: "ACCEPT_BOOKING",
  DECLINE_BOOKING: "DECLINE_BOOKING",
  CANCEL_BOOKING: "CANCEL_BOOKING",
  GET_ALL_ACCEPTED_BOOKINGS: "GET_ALL_ACCEPTED_BOOKINGS",
};

export const bookingsReducer = (state, action) => {
  switch (action.type) {
    case BOOKING_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };

    case BOOKING_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case BOOKING_ACTIONS.REQUEST_ARTIST_OR_VENUE:
    case BOOKING_ACTIONS.GET_SPECIFIC_BOOKING:
    case BOOKING_ACTIONS.EDIT_BOOKING_DATE:
    case BOOKING_ACTIONS.ACCEPT_BOOKING:
    case BOOKING_ACTIONS.DECLINE_BOOKING:
    case BOOKING_ACTIONS.CANCEL_BOOKING:
      return {
        ...state,
        booking: action.payload.data,
        allAcceptedBookings: state.allAcceptedBookings.filter(
          (booking) => booking._id !== action.payload.cancelledId
        ),
        error: null,
      };

    case BOOKING_ACTIONS.GET_ALL_ACCEPTED_BOOKINGS:
      return {
        ...state,
        allAcceptedBookings: action.payload.data,
        error: null,
      };

    default:
      return state;
  }
};
