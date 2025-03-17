import { createContext, useEffect, useReducer } from "react";
import { usersReducer, usersInitialState } from "../reducers/usersReducer";
import {
  bookingsReducer,
  bookingsInitialState,
} from "../reducers/bookingsReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  const [bookingsState, bookingsDispatch] = useReducer(
    bookingsReducer,
    bookingsInitialState
  );

  useEffect(() => {}, []); // ADD getUserData = Gets the user data allowing the user to be logged in, even if page is refreshed. Executes once when the component mounts.

  return (
    <DataContext.Provider
      value={{ usersState, usersDispatch, bookingsState, bookingsDispatch }}
    >
      {children}
    </DataContext.Provider>
  );
};
