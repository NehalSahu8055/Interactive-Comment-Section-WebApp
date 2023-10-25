import User from "./User";
import CommentContextProvider from "../context/CommentContextProvider";
export default function CommentBox() {
  // document.body.scrollTop = document.body.scrollHeight;

  return (
    <>
      <CommentContextProvider>
        <User />
      </CommentContextProvider>
    </>
  );
}
