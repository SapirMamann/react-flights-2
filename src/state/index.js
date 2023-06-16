import { action, createStore } from 'easy-peasy';


export const store = createStore({
  user: {
    username: '',
    setUsername: action((state, payload) => {
      state.username = payload;
    })
  },

});