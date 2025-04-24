import axios from "axios";
import { USER_ACTIONS } from "../reducers/usersReducer";

/* All the 24 API calls for the users page:
    - register()
    - verifyEmail()
    - login()
    - googleLogin()
    - logout()
    - getUserData()
    - updateAccount()
    - changePassword()
    - forgotPassword()
    - resetPassword()
    - deleteAccount()
    - getAllVenues()
    - getAllArtists()
    - getIndividualArtistOrVenue()
    - updateProfile()
    - deleteSingleMedia()
    - deleteSingleImage()
    - addFavourite()
    - removeFavourite()
    - getAllFavourites()
    - getAllReceivedAndSentBookings()
    - getAllReceivedBookings()
    - getAllSentBookings()
    - searchForArtistOrVenue()  

*/

export const register = async (usersDispatch, userData) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
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
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get(
      `/api/auth/verify-email?token=${token}&userId=${userId}`
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
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    // Clear any existing errors first
    usersDispatch({ type: USER_ACTIONS.SET_ERROR, payload: null });

    const response = await axios.post("/api/auth/login", credentials);
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
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    // Clear any existing errors first
    usersDispatch({ type: USER_ACTIONS.SET_ERROR, payload: null });

    const response = await axios.post(
      "/api/auth/login/google",
      {
        token: credentials,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export const logout = async (usersDispatch) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    await axios.get("/api/auth/logout", { withCredentials: true });
    // Force clear any client-side state
    usersDispatch({
      type: USER_ACTIONS.LOGOUT,
    });
    // Force reload the page to clear any cached state
    window.location.href = "/";
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Logout failed.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getUserData = async (usersDispatch) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get("/api/auth/user-data");

    // If we have a user, populate their favourites
    if (response.data.data) {
      const favouritesResponse = await axios.get("/api/users/favourites");
      response.data.data.favourites = favouritesResponse.data.data;

      usersDispatch({
        type: USER_ACTIONS.GET_USER_DATA,
        payload: response.data,
      });
    }

    return response.data;
  } catch (error) {
    // Ignore 401 (unauthorised) errors — this is normal if user not logged in
    if (error.response?.status === 401) {
      return null;
    }

    // For all other errors, dispatch an error
    const errorMessage =
      error.response?.data?.message || "Failed to get user data.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });

    return null;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const updateAccount = async (usersDispatch, userData) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.patch(
      "/api/auth/update-account",
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      },
      {
        withCredentials: true,
      }
    );

    usersDispatch({
      type: USER_ACTIONS.UPDATE_ACCOUNT,
      payload: response.data,
    });

    if (response.data.requireReauth) {
      return { ...response.data, requireReauth: true };
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update account.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const changePassword = async (usersDispatch, passwordData) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.patch(
      "/api/auth/change-password",
      passwordData
    );
    usersDispatch({
      type: USER_ACTIONS.CHANGE_PASSWORD,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to change password.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Throw the error to be caught by the component
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const forgotPassword = async (usersDispatch, { email }) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.post("/api/auth/forgot-password", { email });
    usersDispatch({
      type: USER_ACTIONS.FORGOT_PASSWORD,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to send reset link.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const resetPassword = async (
  usersDispatch,
  { token, userId, newPassword }
) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.post("/api/auth/reset-password", {
      token,
      userId,
      newPassword,
    });
    usersDispatch({
      type: USER_ACTIONS.RESET_PASSWORD,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to reset password.";
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
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
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
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get("api/users/venues");
    usersDispatch({
      type: USER_ACTIONS.GET_ALL_VENUES,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get all venues.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllArtists = async (usersDispatch) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get("api/users/artists");
    usersDispatch({
      type: USER_ACTIONS.GET_ALL_ARTISTS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get all artists.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getIndividualArtistOrVenue = async (usersDispatch, userId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get(`/api/users/${userId}`);
    usersDispatch({
      type: USER_ACTIONS.GET_INDIVIDUAL_ARTIST_OR_VENUE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get user profile.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const updateProfile = async (usersDispatch, userId, profileData) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.patch(
      `/api/users/${userId}/update-profile`,
      profileData
    );
    usersDispatch({
      type: USER_ACTIONS.UPDATE_PROFILE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update profile.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const deleteSingleMedia = async (usersDispatch, userId, mediaId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.delete(
      `/api/users/${userId}/delete-media/${mediaId}`
    );
    usersDispatch({
      type: USER_ACTIONS.DELETE_SINGLE_MEDIA,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete media.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const deleteSingleImage = async (usersDispatch, userId, imageId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.delete(
      `/api/users/${userId}/delete-image/${imageId}`
    );
    usersDispatch({
      type: USER_ACTIONS.DELETE_SINGLE_IMAGE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete image.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const addFavourite = async (usersDispatch, favouriteId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.post("/api/users/favourites", { favouriteId });
    usersDispatch({
      type: USER_ACTIONS.ADD_FAVOURITE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to add favourite.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const removeFavourite = async (usersDispatch, favouriteId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.delete(`/api/users/favourites/${favouriteId}`);
    usersDispatch({
      type: USER_ACTIONS.REMOVE_FAVOURITE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to remove favourite.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllFavourites = async (usersDispatch) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get("/api/users/favourites");
    usersDispatch({
      type: USER_ACTIONS.GET_ALL_FAVOURITES,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get favourites.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllReceivedAndSentBookings = async (usersDispatch, userId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get(`/api/users/${userId}/bookings`);
    usersDispatch({
      type: USER_ACTIONS.GET_ALL_RECEIVED_AND_SENT_BOOKINGS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get bookings.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllReceivedBookings = async (usersDispatch, userId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get(`/api/users/${userId}/bookings/received`);
    usersDispatch({
      type: USER_ACTIONS.GET_ALL_RECEIVED_BOOKINGS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get received bookings.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const getAllSentBookings = async (usersDispatch, userId) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get(`/api/users/${userId}/bookings/sent`);
    usersDispatch({
      type: USER_ACTIONS.GET_ALL_SENT_BOOKINGS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get sent bookings.";
    usersDispatch({
      type: USER_ACTIONS.SET_ERROR,
      payload: errorMessage,
    });
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};

export const searchForArtistOrVenue = async (usersDispatch, searchParams) => {
  try {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    const response = await axios.get("/api/users/search", {
      params: searchParams,
    });
    usersDispatch({
      type: USER_ACTIONS.SEARCH_FOR_ARTIST_OR_VENUE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    // Don't dispatch error for 401 (unauthorized) status
    if (error.response?.status !== 401) {
      const errorMessage = error.response?.data?.message || "Search failed.";
      usersDispatch({
        type: USER_ACTIONS.SET_ERROR,
        payload: errorMessage,
      });
    }
    throw error;
  } finally {
    usersDispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
  }
};
