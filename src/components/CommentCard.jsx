import React, { useContext, useState } from "react";
import data from "../data/data.json";

import ReusableCard from "./ReusableCard";
import ReplyBox from "./ReplyBox";

export default function CommentCard({ cardID }) {
  const comment = data.comments.find((person) => person.id === cardID);

  // console.log(cardID);

  return (
    <>
      {/* Handles comments  */}
      <ReusableCard person={comment} />

      {/* Handles replies under comment  */}
      {comment.replies.length > 0 && (
        <ReplyBox
          replyCard={comment.replies.map((reply) => (
            <ReusableCard person={reply} key={reply.id} />
          ))}
        />
      )}
    </>
  );
}
