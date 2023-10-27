import React, { useContext, useState } from "react";
import ReplyBox from "./ReplyBox";
import CommentCard from "./CommentCard";
import data from "../data/data.json";

export default function User() {
  const comments = data.comments.map((cmnt) => {
    return <CommentCard cardID={cmnt.id} key={cmnt.id} />;
  });

  return comments ? (
    <div className="flex max-w-[343px] flex-col gap-4">{comments}</div>
  ) : (
    <div className="text-2xl font-medium text-soft-red">
      🙅 Sorry No Comment Received 🙅‍♀️
    </div>
  );
}
