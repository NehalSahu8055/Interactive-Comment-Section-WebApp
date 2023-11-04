import React, { useContext, useState } from "react";
import CommentCard from "./Cards/CommentCard";
import data from "../../../data/data.json";

export default function CommentBox() {
  const comments = data.comments.map((cmnt) => {
    return <CommentCard cardID={cmnt.id} key={cmnt.id} />;
  });

  return comments ? (
    <div className="mx-3 flex max-w-[45.625rem] flex-col gap-4">{comments}</div>
  ) : (
    <div className="text-2xl font-medium text-soft-red">
      🙅 Sorry No Comment Received 🙅‍♀️
    </div>
  );
}
