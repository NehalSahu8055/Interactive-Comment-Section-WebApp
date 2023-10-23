import React, { createContext, useState } from "react";

const SendCommentContext = createContext();

export function SendCommentContextProvider(props) {
  return (
    <SendCommentContext.Provider value={"send"}>{props.children}</SendCommentContext.Provider>
  );
}

export default SendCommentContext;
