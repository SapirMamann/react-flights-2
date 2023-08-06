import axios from "axios";
import { createStore, persist, useStoreRehydrated } from "easy-peasy";

import { userModel } from "./user";


const models = {
  user: userModel,
};

export const store = createStore(persist(models));


















// export const store = createStore({
//   // This section defines the "user" state within the store. It contains two properties: "username" and "setUsername":
//   user: {
//     // This line initializes the "username" property with an empty string as the initial value:
//     username: '',
//     fetchUsername: thunk(async (actions) => {
//       // const response = await axios('http://127.0.0.1:8000/api/users/get_current_user_details/')
//       const response = await http('http://127.0.0.1:8000/api/users/get_username/')
//       //   // const data = await response.json();
//       console.log("im here herre", response)
//       console.log("im here herre", response.data)
//       console.log("im here herre", response.data['username'])

//       actions.setUsername(response.data['username']);
//     }),
//     // This line defines an action called "setUsername" using the action function from "easy-peasy". The action takes two arguments: state and payload:
//     setUsername: action((state, payload) => {
//       // This is the action's function body. It receives the current state and the payload as arguments. In this case, the function sets the "username" property of the state to the value provided in the payload. It mutates the state by assigning the payload value to state.username.
//       state.username = payload;
//     }),

//     isAdmin: false,
//     setIsAdmin: action((state, payload) => {
//       state.isAdmin = payload;
//     })
//   },
// });

// export const store = createStore({
//   // This section defines the "user" state within the store. It contains two properties: "username" and "setUsername":
//   user: {
//     // This line initializes the "username" property with an empty string as the initial value:
//     username: '',
//     // This line defines an action called "setUsername" using the action function from "easy-peasy". The action takes two arguments: state and payload:
//     setUsername: action((state, payload) => {
//       // This is the action's function body. It receives the current state and the payload as arguments. In this case, the function sets the "username" property of the state to the value provided in the payload. It mutates the state by assigning the payload value to state.username.
//       state.username = payload;
//     }),

//     isAdmin: false,
//     setIsAdmin: action((state, payload) => {
//       state.isAdmin = payload;
//     })
//   },
// });
