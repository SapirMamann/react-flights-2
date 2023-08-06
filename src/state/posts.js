import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

//this button triggers the set user in state
const UserBu = () => {
  const fetchUser = useStoreActions((actions) => actions.user.fetchUser);
  // because in index.js=> user, in user.js => user
  const user = useStoreState((state) => state.user.user)
  const status = useStoreState((state) => state.user.status)

  console.log("userbu", user)
  return (
    <div>
      <button onClick={fetchUser}>Fetch User</button>
      <p>{status}</p>
    </div>
  );
};

export default UserBu;
