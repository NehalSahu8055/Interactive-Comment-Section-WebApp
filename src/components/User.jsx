import React, { useContext, useState } from "react";

import ReplyBox from "./ReplyBox";
import CommentCard from "./CommentCard";

export default function User() {
  return (
    <div className="flex max-w-[343px] flex-col gap-4">
      <CommentCard cardID={1} />
      <CommentCard cardID={2} />
    </div>
  );
}
