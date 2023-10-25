import React, { useContext, useState } from "react";
import data from "../data/data.json";
import Filter from "bad-words";
import errorCommentData from "../data/errorCommentData";
import SendCommentContext from "../context/SendCommentContext";
import UpdateCommentContext from "../context/UpdateCommentContext";
import CommentContext from "./CommentContext";

export default function CommentContextProvider(props) {
  const commentType =
    useContext(SendCommentContext) || useContext(UpdateCommentContext);

  const filter = new Filter();
  const [charCount, setcharCount] = useState();

  const { id: c_id, image: c_image, username: c_username } = data.currentUser;

  const [isModified, setisModified] = useState({
    isDeleting: false,
    isEditing: false,
    isReplying: false,
  });

  const { isDeleting, isEditing, isReplying } = isModified;
  const initComment =
    commentType === "update"
      ? "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."
      : "";

  const [formData, setFormData] = useState({
    comment: initComment,
  });

  const { comment } = formData;

  // const censoredComment = useTextCensor(comment);

  const emptyCommentError = [...errorCommentData][0].error;
  const [maxCharLmtError, MAX_CHARS_COMMENT] = [
    [...errorCommentData][1].error,
    [...errorCommentData][1].MAX_CHARS_COMMENT,
  ];

  // const MAX_CHARS_COMMENT = 400;
  const [commentError, setcommentError] = useState();
  const updateComment = (e) => {
    e.preventDefault();

    !commentError &&
      setisModified((prev) => {
        return { ...prev, isEditing: false };
      });
  };

  const editComment = (e) => {
    const { name, value, length } = e.target;

    const charCount = value.length;
    setcharCount(charCount);

    const maxCharLmtCheck = charCount < MAX_CHARS_COMMENT;

    charCount === 0
      ? setcommentError(emptyCommentError)
      : setcommentError(null);

    maxCharLmtCheck
      ? setFormData({
          ...formData,
          [name]: value,
        })
      : setcommentError(maxCharLmtError);
  };

  return (
    <CommentContext.Provider
      value={{
        filter,
        c_id,
        isModified,
        setisModified,
        isDeleting,
        isEditing,
        isReplying,
        comment,
        commentType,
        emptyCommentError,
        commentError,
        setcommentError,
        updateComment,
        editComment,
        charCount,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
}
