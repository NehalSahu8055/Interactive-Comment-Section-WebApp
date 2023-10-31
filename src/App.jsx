import React from "react";
import ChatApp from "./components/ChatApp";
import "./stylesheets/index.css";
import ErrorBoundary from "./utils/ErrorBoundary";
import CurrentUserContextProvider from "./context/userContext/CurrentUserContextProvider";

export default function App() {
  return (
    <ErrorBoundary>
      <CurrentUserContextProvider>
        <ChatApp />
      </CurrentUserContextProvider>
    </ErrorBoundary>
  );
}
