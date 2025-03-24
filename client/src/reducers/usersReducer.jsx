export const usersInitialState = {
  user: null, // Logged in user data object
  venues: [],
  artists: [],
  favourites: [],
  bookingsReceived: [],
  bookingsSent: [],
  searchResults: [],
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const USER_ACTIONS = {
  // Global
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",

  // Auth
  REGISTER: "REGISTER",
  VERIFY_EMAIL: "VERIFY_EMAIL",
  LOGIN: "LOGIN",
  LOGIN_GOOGLE: "LOGIN_GOOGLE",
  LOGOUT: "LOGOUT",
  GET_USER_DATA: "GET_USER_DATA",
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",

  // Users
  GET_ALL_VENUES: "GET_ALL_VENUES",
  GET_ALL_ARTISTS: "GET_ALL_ARTISTS",
  GET_INDIVIDUAL_ARTIST_OR_VENUE: "GET_INDIVIDUAL_ARTIST_OR_VENUE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  DELETE_SINGLE_MEDIA: "DELETE_SINGLE_MEDIA",
  DELETE_SINGLE_IMAGE: "DELETE_SINGLE_IMAGE",
  ADD_FAVOURITE: "ADD_FAVOURITE",
  REMOVE_FAVOURITE: "REMOVE_FAVOURITE",
  GET_ALL_FAVOURITES: "GET_ALL_FAVOURITES",
  GET_ALL_RECEIVED_AND_SENT_BOOKINGS: "GET_ALL_RECEIVED_AND_SENT_BOOKINGS",
  GET_ALL_RECEIVED_BOOKINGS: "GET_ALL_RECEIVED_BOOKINGS",
  GET_ALL_SENT_BOOKINGS: "GET_ALL_SENT_BOOKINGS",
  SEARCH_FOR_ARTIST_OR_VENUE: "SEARCH_FOR_ARTIST_OR_VENUE",
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };

    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case USER_ACTIONS.REGISTER:
    case USER_ACTIONS.VERIFY_EMAIL:
      return {
        ...state,
        user: action.payload.data,
        error: null,
      };

    case USER_ACTIONS.LOGIN:
    case USER_ACTIONS.LOGIN_GOOGLE:
    case USER_ACTIONS.GET_USER_DATA:
    case USER_ACTIONS.UPDATE_ACCOUNT:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
        error: null,
      };

    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    case USER_ACTIONS.CHANGE_PASSWORD:
      return {
        ...state,
        error: null,
      };

    case USER_ACTIONS.DELETE_ACCOUNT:
      return {
        ...usersInitialState,
        error: null,
      };

    case USER_ACTIONS.GET_ALL_VENUES:
      return {
        ...state,
        venues: action.payload.data, // .data & .count
        error: null,
      };

    case USER_ACTIONS.GET_ALL_ARTISTS:
      return {
        ...state,
        artists: action.payload.data, // .data & .count
        error: null,
      };

    case USER_ACTIONS.GET_INDIVIDUAL_ARTIST_OR_VENUE:
      return {
        ...state,
        user: action.payload.data,
        error: null,
      };

    case USER_ACTIONS.UPDATE_PROFILE:
    case USER_ACTIONS.DELETE_SINGLE_MEDIA:
    case USER_ACTIONS.DELETE_SINGLE_IMAGE:
    case USER_ACTIONS.ADD_FAVOURITE:
    case USER_ACTIONS.REMOVE_FAVOURITE:
      return {
        ...state,
        user: action.payload.data,
        error: null,
      };

    case USER_ACTIONS.GET_ALL_FAVOURITES:
      return {
        ...state,
        favourites: action.payload.data, // .data & .count
        error: null,
      };

    case USER_ACTIONS.GET_ALL_RECEIVED_AND_SENT_BOOKINGS:
      return {
        ...state,
        bookingsReceived: action.payload.data.received.bookings, // & .count
        bookingsSent: action.payload.data.sent.bookings, // & .count
        error: null,
      };

    case USER_ACTIONS.GET_ALL_RECEIVED_BOOKINGS:
      return {
        ...state,
        bookingsReceived: action.payload.data, // .data & .count
        error: null,
      };

    case USER_ACTIONS.GET_ALL_SENT_BOOKINGS:
      return {
        ...state,
        bookingsSent: action.payload.data, // .data & .count
        error: null,
      };

    case USER_ACTIONS.SEARCH_FOR_ARTIST_OR_VENUE:
      return {
        ...state,
        searchResults: action.payload.data, // .data & .count
        error: null,
      };

    default:
      return state;
  }
};
