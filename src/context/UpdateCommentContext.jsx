import React, { createContext, useState } from "react";

const UpdateContext = createContext();

export function UpdateContextProvider(props) {
  return (
    <UpdateContext.Provider value={"update"}>
      {props.children}
    </UpdateContext.Provider>
  );
}

export default UpdateContext;
