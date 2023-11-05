import { useContext, useState } from "react";
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
  const delay = [0, 0.25, 0.5, 0.75, 1];

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
              delay: delay[id],
            }}
            key={`user${id}`}
            id={`user${id}`}
            onClick={() => userSwitch(id)}
            className={`avatar w-9 overflow-visible border-none ring-2 ${
              currentUserID === id
                ? "ring-moderate-blue dark:ring-d-moderate-blue"
                : ""
            } duration-200  ${
              id === userID ? "before:absolute" : "before:hidden"
            } ring-2 transition-[ring] before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
            aria-label={`${
              currentUserID === id ? "Current" : ""
            } User ${username}`}
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
              delay: delay[id],
            }}
            key={id}
            id={id}
            onClick={() => userSwitch(id)}
            className={`avatar w-9 overflow-visible border-none ring-2 ${
              currentUserID === id
                ? "ring-moderate-blue dark:ring-d-moderate-blue"
                : ""
            } duration-200  ${
              id === userID ? "before:absolute" : "before:hidden"
            } ring-2 transition-[ring] before:-left-3 before:bottom-0 before:top-0 before:my-auto before:h-4 before:w-[5px] before:rounded-r-md before:bg-moderate-blue before:transition-all before:hover:h-3/4 dark:before:bg-d-moderate-blue md:w-12 `}
            aria-label={`${
              currentUserID === id ? "Current" : ""
            } User ${username}`}
          >
            <img src={image} alt={username} width={48} height={48} />
          </motion.button>
        );
      })}
    </div>
  );
}
