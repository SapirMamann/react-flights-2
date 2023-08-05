import { action, thunk } from "easy-peasy";
import axios from "axios";

import getCurrentUserDetails from "../api/user/UserApi";

export const userModel = {
  user: [],
  status: null, // Display loading, success, error..
  setUser: action((state, payload) => {
    state.user.push(payload);
  }),
  setStatus: action((state, payload) => {
    state.status = payload;
  }),
  fetchUser: thunk(async (actions, payload) => {
    try {
      actions.setStatus("loading");
      const data = await getCurrentUserDetails();
      actions.setUser(data);
      actions.setStatus("success");
    } catch (e) {
      actions.setStatus("failed");
    }
  }),
};
