import React from "react";
import CommentBox from "./Comment/CommentBox";
export default function MainContent() {
  return (
    <main className="grid min-h-screen place-content-center bg-very-light-gray font-rubik transition-all dark:bg-d-very-light-gray">
      <CommentBox />
    </main>
  );
}
