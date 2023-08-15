import { action, thunk } from "easy-peasy";
import axios from "axios";

import getCurrentUserDetails from "../api/user/UserApi";


export const userModel = {
  user: [],
  error: null,
  status: null, // Display loading, success, error..
  isAuthenticated: false,

  setUser: action((state, payload) => {
    state.user.push(payload);
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setStatus: action((state, payload) => {
    state.status = payload;
  }),
  clearUserState: action((state, payload) => { 
    state.user = [];
    state.error = null;
    state.status = null;
  }),
  fetchUser: thunk(async (actions, payload) => {
    try {
      actions.setStatus("loading");
      const data = await getCurrentUserDetails();
      console.log("data", data)
      actions.setUser(data);
      setTimeout(() => {
        actions.setStatus("success");
      }, 3000);
    } catch (e) {
      console.log("error catch in user.js action fetch", e.message)
      actions.setStatus("failed");
      actions.setError(e.message);
    }
  }),
  setIsAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload;
  }),
};

// export const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;

// export const isAdmin = user?.length > 0 && user[0]?.is_staff;
