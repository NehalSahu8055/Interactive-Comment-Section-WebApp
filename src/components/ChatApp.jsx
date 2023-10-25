import SendCommentContext from "../context/SendCommentContext";
import UpdateCommentContext from "../context/UpdateCommentContext";
import CommentBox from "./CommentBox";

export default function ChatApp() {
  return (
    <main className="grid  min-h-screen place-content-center bg-very-light-gray font-rubik">
      <UpdateCommentContext.Provider value={"update"}>
        <CommentBox />
      </UpdateCommentContext.Provider>
      {/* <SendCommentContext.Provider value={"send"}>
        <CommentBox />
      </SendCommentContext.Provider> */}

    </main>
  );
}
