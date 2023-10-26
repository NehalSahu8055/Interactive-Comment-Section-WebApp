import React, { useContext, useState } from "react";

import CommentContext from "../context/CommentContext";
import ReplyBox from "./ReplyBox";
import CommentCard from "./CommentCard";

export default function User() {
  const { isReplying } = useContext(CommentContext);

  return (
    <div className="flex max-w-[343px] flex-col gap-4">
      <CommentCard cardID={1} />
      <CommentCard cardID={2} />
      {/* <CommentCard cardID={3} /> */}

      {/* <CommentCard id={2}/> */}
      {/* <CommentCard id={1}/> */}
      {/* <CommentCard cardID={1}/ > */}
      {/* Replying Part */}
      {/* {data.comments.replies.map((reply) => {
          return <span>{reply}</span>;
        })} */}

      {/* <div>
          {
            [...data.comments].map((person) => {
              return [...person.replies].map((item) => {
                // return (<>{}</>)
              });
            })
          }
        </div> */}

      {isReplying && <ReplyBox />}
    </div>
  );
}
