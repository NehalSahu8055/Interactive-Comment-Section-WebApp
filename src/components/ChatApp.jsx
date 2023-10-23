// import SendCommentContextProvider from "../context/SendCommentContext";
// import UpdateCOmmentContextProvider from "../context/UpdateCommentContext";
import ChatBox from "./ChatBox";

export default function ChatApp() {
  return (
    <main className="grid min-h-screen place-content-center bg-very-light-gray font-rubik">
      {/* <SendCommentContextProvider> */}
        <ChatBox commentType={"update"} />
      {/* </SendCommentContextProvider> */}
      {/* <UpdateCommentContextProvider> */}
        <ChatBox commentType={"send"} />
      {/* </UpdateCommentContextProvider> */}
    </main>
  );
}
