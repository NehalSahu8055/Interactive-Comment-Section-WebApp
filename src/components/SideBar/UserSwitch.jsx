import React, { useContext, useState } from "react";
import data from "../../data/data";
import { motion } from "framer-motion";
import CurrentUserContext from "../../context/userContext/CurrentUserContext";

export default function UserSwitch() {
  const { currentUserID, switchUser } = useContext(CurrentUserContext);
  const [userID, setuserID] = useState(currentUserID);

  const userSwitch = (userID) => {
    setuserID(userID);
    switchUser(userID);
  };

  const comments = data.comments.map((item) => {
    return item;
  });

  return (
    <div className="avatar-group flex flex-col items-center justify-center space-y-4 overflow-visible">
      {comments.map((person) => {
        const {
          id,
          user: { username, image },
        } = person;

        return (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.25,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            key={id}
            id={id}
            onClick={() => userSwitch(id)}
            className={`avatar w-9 overflow-visible border-none ring-2 ${
              currentUserID === userID
                ? "ring-moderate-blue dark:ring-d-moderate-blue"
                : ""
            } duration-500  ${
              id === userID ? "before:absolute" : "before:hidden"
            } ring-2 before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
            aria-label={`${
              currentUserID === userID ? "Current" : ""
            } ${username}`}
          >
            <img src={image} alt={username} />
          </motion.button>
        );
      })}

      {data.comments[1].replies.map((person) => {
        const {
          id,
          user: { username, image },
        } = person;

        return (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.25,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            key={id}
            id={id}
            onClick={() => userSwitch(id)}
            className={`avatar w-9 overflow-visible border-none ring-2 ${
              currentUserID === userID
                ? "ring-moderate-blue dark:ring-d-moderate-blue"
                : ""
            } duration-500  ${
              id === userID ? "before:absolute" : "before:hidden"
            } ring-2 before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
            aria-label={`${
              currentUserID === userID ? "Current" : ""
            } ${username}`}
          >
            <img src={image} alt={username} />
          </motion.button>
        );
      })}
    </div>
  );
}
