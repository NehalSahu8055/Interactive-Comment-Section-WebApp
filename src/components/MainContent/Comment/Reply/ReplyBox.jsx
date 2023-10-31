import React, { useEffect, useState } from "react";
import CommentContext from "../../../../context/commentContext/CommentContext";

export default function ReplyBox({ replyCard, setisModified }) {
  const [isExpanded, setisExpanded] = useState(true);

  const toggleComment = (e) => {
    e.currentTarget.setAttribute("aria-expanded", !isExpanded);
    e.currentTarget.dataset.tip = !isExpanded
      ? "Collapse Comment"
      : "Expand Comment";

    // Handle Toggling Plus Minus Image for toggleComment
    const icon = e.currentTarget.children[1];

    icon.src = !isExpanded
      ? "/src/assets/images/icon-minus.svg"
      : "/src/assets/images/icon-plus.svg";
    setisExpanded((prev) => !prev);
  };

  return (
    <div
      className="reply-box relative flex flex-col  rounded-bl-xl border-l-2  border-light-gray dark:border-d-light-gray"
      id="replyBoxID"
    >
      <button
        id="toggleCommentID"
        onClick={toggleComment}
        data-tip="Collapse Comment"
        className="peer tooltip absolute -left-2.5 -top-2  grid h-5 w-5 cursor-pointer place-content-center rounded-full border border-light-gray bg-light-gray shadow-lg transition-all hover:brightness-[95%] dark:border-d-light-gray dark:border-d-light-grayish-blue dark:bg-d-light-gray"
        aria-expanded="true"
        aria-controls="commentID"
        aria-haspopup="true"
        aria-labelledby="toggleButtonID"
      >
        <span className="sr-only" id="toggleButtonID">
          Click this button to toggle comments and replies
        </span>

        <img
          className=""
          src="/src/assets/images/icon-minus.svg"
          alt=""
          aria-hidden="true"
        />
      </button>

      <div
        className="reply-comment hidden space-y-4 pl-4 pt-4 peer-aria-expanded:block "
        id="commentID"
      >
        <CommentContext.Provider value={"update"}>
          {replyCard}
        </CommentContext.Provider>
      </div>
    </div>
  );
}
