import React, { useContext, useState } from "react";
import data from "../../../../data/data.json";

import ReusableCard from "./ReusableCard";

export default function CommentCard({ cardID }) {
  const comment = data.comments.find((person) => person.id === cardID);
  
  const replies = comment.replies.map((reply) => (
    <ReusableCard person={reply} type={"update"} key={reply.id} />
  ));
  

  return (
    <>
      {/* Handles comments  */}
      <ReusableCard person={comment} type={"update"} />

      {/* Handles replies under comment  */}
      {/* {comment.replies.length > 0 && <ReplyBox replyCard={replies} />} */}
    </>
  );
}