import React, { useContext, useState } from "react";
import data from "../data/data.json";

import ReusableCard from "./ReusableCard";
import ReplyBox from "./ReplyBox";

export default function CommentCard({ cardID }) {
  const comment = data.comments.find((person) => person.id === cardID);
  console.log(cardID);
  if (!comment) {
    return null; // Handle the case where the comment with the specified ID is not found.
  }

  return (
    <>
      {/* {console.log(comment)} */}
      <ReusableCard person={comment} />
      <ReplyBox
        // key={100 + "RB"}
        replyCard={comment.replies.map((reply) => (
          <ReusableCard person={reply} key={reply.id} />
        ))}
      />
    </>
  );
}
