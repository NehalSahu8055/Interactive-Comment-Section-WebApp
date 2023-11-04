import React from "react";
import ReusableCard from "./ReusableCard";
import data from "../../../../data/data.json";

export default function CommentCard({ cardID }) {
  const comment = data.comments.find((person) => person.id === cardID);

  return (
    <>
      {/* Handles comments  */}
      <ReusableCard person={comment} type={"update"} />
    </>
  );
}
