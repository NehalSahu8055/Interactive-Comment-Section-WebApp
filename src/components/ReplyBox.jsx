import React, { useState, useId } from "react";
import SendCommentContext from "../context/SendCommentContext";
import CommentBox from "./CommentBox";
import { doc } from "prettier";

export default function ReplyBox() {
  const commentID = useId();
  const toggleCommentID = useId();
  const replyBoxID = useId();

  const toggleComment = (e) => {
    const parent = document.getElementById(`${commentID}`);
    const paren = document.getElementById(`${replyBoxID}`);

    // useEffect(() => {
      // Scroll to the bottom of the component
      if(paren)
      paren.scrollTop = paren.scrollHeight;
      console.log(paren);
    // }, []);

    // Toggling Comment
    if (parent) {
      const childElements = parent.children;
      [...childElements].forEach((child) => {
        child.classList.toggle("hidden");

        // Toggling Plus Minus Image for toggleComment
        const icon = e.currentTarget.children[1];
        const iconSource = "/src/assets/images/icon-minus.svg";
        icon.src =
          icon.getAttribute("src") == iconSource
            ? "/src/assets/images/icon-plus.svg"
            : iconSource;
      });
    }
  };
  return (
    <div
      className="reply-box relative flex flex-col  rounded-bl-xl border-l-2  border-light-gray"
      id={replyBoxID}
    >
      <div className="h-fit w-fit">
        <button
          id={toggleCommentID}
          onClick={toggleComment}
          className="absolute -left-2.5 -top-2  grid h-5 w-5 cursor-pointer place-content-center rounded-full border border-light-grayish-blue bg-light-gray transition-all hover:brightness-[95%]"
        >
          <span className="sr-only">
            Click this button to toggle comments and replies
          </span>

          <img
            src="/src/assets/images/icon-plus.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="reply-comment pl-4" id={commentID}>
        <SendCommentContext.Provider value={"update"}>
          <CommentBox />
        </SendCommentContext.Provider>
      </div>
    </div>
  );
}
