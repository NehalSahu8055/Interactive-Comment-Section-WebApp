import React, { useContext, useState } from "react";
import CurrentUserContext from "./CurrentUserContext";

export default function CurrentUserState(props) {
  const [state, setState] = useState(1);
  const changeCurrentUser = (userID) => {
    setState(userID);
  };

  return (
    <CurrentUserContext.Provider value={{ state, changeCurrentUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}
