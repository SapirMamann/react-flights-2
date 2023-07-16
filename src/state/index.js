import React from 'react';
import { action, createStore } from 'easy-peasy';


export const store = createStore({
  // This section defines the "user" state within the store. It contains two properties: "username" and "setUsername":
  user: {
    // This line initializes the "username" property with an empty string as the initial value:
    username: '',
    // This line defines an action called "setUsername" using the action function from "easy-peasy". The action takes two arguments: state and payload:
    setUsername: action((state, payload) => {
      // This is the action's function body. It receives the current state and the payload as arguments. In this case, the function sets the "username" property of the state to the value provided in the payload. It mutates the state by assigning the payload value to state.username.
      state.username = payload;
    }),

  isAdmin: false,
    setIsAdmin: action((state, payload) => {
      state.isAdmin = payload;
    })
  },
});