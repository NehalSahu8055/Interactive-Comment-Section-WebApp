import React, { useContext, useState } from "react";
import data from "../data/data.json";

import ReusableCard from "./ReusableCard";
import ReplyBox from "./ReplyBox";

export default function CommentCard({ cardID }) {
  const comment = data.comments.find((person) => person.id === cardID);

  console.log(cardID);
  
  return (
    <>
      {/* {console.log()} */}
      <ReusableCard person={comment} />

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
