import { useState } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "./CurrentUserContext";

// Prop Validation
CurrentUserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function CurrentUserContextProvider(props) {
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
