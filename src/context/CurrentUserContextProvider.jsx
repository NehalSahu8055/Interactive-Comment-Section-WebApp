import React, { useContext, useState } from "react";
import CurrentUserContext from "./CurrentUserContext";

export default function CurrentUserState(props) {
  const [currentUserID, setCurrentUserID] = useState(2);
  const switchUser = (userID) => {
    setCurrentUserID(userID);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUserID, switchUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}
