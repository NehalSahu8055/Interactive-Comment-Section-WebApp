import React, { useState, useEffect } from "react";

function ErrorBoundary({ children }) {
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "",
  });

  useEffect(() => {
    const handleError = (error) => {
      setError((prev) => {
        return {
          ...prev,
          hasError: true,
          errorMessage: error.message,
        };
      });
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);
  if (error.hasError)
    useEffect(() => {
      const interval = setInterval(() => {
        return (
          <div className="alert alert-error mx-auto mt-2 w-fit text-white shadow-md">
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
          </div>
        );
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }, []);

  return children;
}

export default ErrorBoundary;
