import React, { useState } from "react";
import data from "../data/data.json";
import IconButton from "./IconButton";
import Vote from "./Vote";
import ConfirmationModal from "./ConfirmationModal";
import Filter from "bad-words";
import errorCommentData from "../data/errorCommentData";

// import useTextCensor from "../hooks/useTextCensor";

export default function User() {
  const filter = new Filter();
  const [charCount, setcharCount] = useState();

  let isCurrentUser = true;
  const [isModified, setisModified] = useState({
    isDeleting: false,
    isEditing: false,
  });
  const { isDeleting, isEditing } = isModified;

  const initComment =
    "Impressive! shit Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.";

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
    <div className="user-comment grid  max-w-[343px] place-content-center gap-4 rounded-lg bg-white p-4">
      <div className="flex items-center">
        <figure className="flex items-center gap-4 pr-2 font-medium">
          <img
            className="w-8 rounded-full"
            src="/src/assets/images/avatars/image-amyrobson.webp"
            alt="avatar of a smiling curly hair girl with sunglasses"
          />
          <figcaption className="text-dark-blue">amyrobson</figcaption>
        </figure>
        {isCurrentUser && (
          <div className="h-fit rounded-sm bg-moderate-blue px-1.5 text-sm text-white">
            you
          </div>
        )}
        <span className="pl-4 text-grayish-blue">1 month ago</span>
      </div>

      {isEditing ? (
        <form className="relative" onSubmit={updateComment}>
          <textarea
            name="comment"
            className="comment-editing flex h-[10rem] w-full resize-none items-center justify-center overflow-auto rounded-sm border border-red-500  p-2 text-grayish-blue caret-moderate-blue outline-none focus:border-moderate-blue"
            value={comment}
            onChange={editComment}
            placeholder="Add your Comment here..."
          />
          <small className="absolute -top-4 right-3 text-slate-400 ">
            {charCount}
          </small>
          <div className="flex items-center justify-between pt-3">
            <small className="error-comment visible -mt-2 self-start italic text-red-500">
              {commentError}
            </small>
            <button
              type="submit"
              className="btn btn-sm  w-fit bg-moderate-blue font-medium text-white transition-all hover:bg-moderate-blue hover:opacity-80"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="comment-actual text-grayish-blue">
            {filter.clean(comment)}
          </p>
          <div className="btnss flex items-center justify-between">
            <Vote />
            {isCurrentUser ? (
              <div className="flex">
                <IconButton btnIndex="0" action={setisModified} />
                <ConfirmationModal />

                <IconButton btnIndex="1" action={setisModified} />
              </div>
            ) : (
              <IconButton btnIndex="2" />
            )}
          </div>
        </>
      )}
    </div>
  );
}
