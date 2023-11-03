import React, { useContext, useState } from "react";
import CurrentUserContext from "../../context/userContext/CurrentUserContext";
import useThemeToggle from "../../hooks/useUtilities/useThemeToggle";
import { motion } from "framer-motion";

export default function Sidebar() {
  const mode = localStorage.getItem("theme");

  const { currentUserID, switchUser } = useContext(CurrentUserContext);
  const [id, setId] = useState(currentUserID);

  const userSwitch = (userID) => {
    setId(userID);
    switchUser(userID);
  };

  const { toggleMode } = useThemeToggle();
  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="rounded-r-box fixed top-0 z-30 flex min-h-screen flex-col justify-between bg-whitee px-3 py-10  shadow-[2px_3px_7px_0px_#00000012] transition-all duration-300 ease-linear dark:bg-d-whitee dark:shadow "
    >
      <h2 className="sr-only">Main Sidebar</h2>
      <div className="avatar-group flex flex-col items-center justify-center space-y-4 overflow-visible">
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.25,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          id={1}
          onClick={() => userSwitch(1)}
          className={`avatar w-9 overflow-visible border-none ring-2 ${
            currentUserID === 1
              ? "ring-moderate-blue dark:ring-d-moderate-blue"
              : ""
          } duration-500  ${
            id === 1 ? "before:absolute" : "before:hidden"
          } ring-2 before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
          aria-label={`${currentUserID === 1 ? "Current" : ""} User Amy Robson`}
        >
          <img
            src="/src/assets/images/avatars/image-amyrobson.webp"
            alt="Amy Robson"
          />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          id={2}
          onClick={() => userSwitch(2)}
          className={`avatar w-9 ${
            currentUserID === 2
              ? "ring-moderate-blue dark:ring-d-moderate-blue"
              : ""
          } overflow-visible border-none duration-500 ${
            id === 2 ? "before:absolute" : "before:hidden"
          } ring-2 before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
          aria-label={`${currentUserID === 2 ? "Current" : ""} User Max Blagun`}
        >
          <img
            src="/src/assets/images/avatars/image-maxblagun.png"
            alt="Max Blagun"
          />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.75,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          id={3}
          onClick={() => userSwitch(3)}
          className={`avatar ${
            currentUserID === 3
              ? "ring-moderate-blue dark:ring-d-moderate-blue"
              : ""
          }  w-9 overflow-visible border-none ring-2 duration-500 ${
            id === 3 ? "before:absolute" : "before:hidden"
          } ring-2 before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
          aria-label={`${
            currentUserID === 3 ? "Current" : ""
          } User Ramses Miron`}
        >
          <img
            src="/src/assets/images/avatars/image-ramsesmiron.png"
            alt="Ramses Miron"
          />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          id={4}
          onClick={() => userSwitch(4)}
          className={`avatar ${
            currentUserID === 4
              ? "ring-moderate-blue dark:ring-d-moderate-blue"
              : ""
          }  w-9 overflow-visible border-none ring-2 duration-500 ${
            id === 4 ? "before:absolute" : "before:hidden"
          } ring-2 before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
          aria-label={`${currentUserID === 4 ? "Current" : ""} User Julius Omo`}
        >
          <img
            src="/src/assets/images/avatars/image-juliusomo.webp"
            alt="Julius Omo"
          />
        </motion.button>
      </div>
      <div className="theme grid place-content-center">
        {/* Handle theme toggling */}
        <fieldset className="theme-toggle">
          <legend className="sr-only">Click to change theme</legend>
          <label className="swap swap-rotate fill-white">
            {/* this hidden checkbox controls the state */}
            <input
              id="toggle-modeID"
              onChange={toggleMode}
              type="checkbox"
              checked={mode === "light"}
              aria-label={`${mode} Mode`}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-8 w-9 fill-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-8 w-9 fill-whitee"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </fieldset>
      </div>
    </motion.aside>
  );
}
