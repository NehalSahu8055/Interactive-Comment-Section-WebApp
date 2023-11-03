import React from "react";
import CommentBox from "./Comment/CommentBox";
export default function MainContent() {
  return (
    <main className="ml-[3.5rem] grid min-h-screen place-content-center py-4 font-rubik transition-all">
      <CommentBox />
    </main>
  );
}
