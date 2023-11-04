import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "",
  });

  useEffect(() => {
    const handleError = (errorEvent) => {
      setError({
        hasError: true,
        errorMessage: errorEvent.message,
      });
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (error.hasError) {
    // If an error occurs, return the error message
    return (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="alert alert-error mx-auto mt-2 w-fit bg-[#be5656] text-white shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {error.errorMessage}</span>
      </motion.div>
    );
  }
  return children;
}
