import React, { useState } from "react";
import CommentContext from "../context/CommentContext";
import CommentBox from "./CommentBox";
import CommentCard from "./CommentCard";
import ReusableCard from "./ReusableCard";
export default function ReplyBox({ replyCard }) {
  const [isExpanded, setisExpanded] = useState(true);

  const toggleComment = (e) => {
    e.currentTarget.setAttribute("aria-expanded", !isExpanded);
    e.currentTarget.dataset.tip = !isExpanded
      ? "Collapse Comment"
      : "Expand Comment";

    // Toggling Plus Minus Image for toggleComment
    const icon = e.currentTarget.children[1];

    icon.src = !isExpanded
      ? "/src/assets/images/icon-minus.svg"
      : "/src/assets/images/icon-plus.svg";
    setisExpanded((prev) => !prev);
  };
  return (
    <div
      className="reply-box relative flex flex-col  rounded-bl-xl border-l-2  border-light-gray"
      id="replyBoxID"
    >
      <button
        id="toggleCommentID"
        onClick={toggleComment}
        data-tip="Collapse Comment"
        className="peer tooltip absolute -left-2.5 -top-2  grid h-5 w-5 cursor-pointer place-content-center rounded-full border border-light-grayish-blue bg-light-gray transition-all hover:brightness-[95%]"
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
          {/* <CommentCard id={2} /> */}
          {replyCard}

          {/* {console.log(replyCard)} */}
        </CommentContext.Provider>
      </div>
    </div>
  );
}
