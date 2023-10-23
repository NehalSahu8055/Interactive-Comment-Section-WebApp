// import Reply from "./Reply"

import ConfirmationModal from "./ConfirmationModal";
import User from "./User";
// import Delete from "./IconButton";

export default function ChatBox({ commentType }) {
  return (
    <>
      <User commentType={commentType} />
      {/* <Reply/>  */}
    </>
  );
}
