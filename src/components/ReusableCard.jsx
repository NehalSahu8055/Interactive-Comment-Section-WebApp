import React, { useContext, useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import IconButton from "./IconButton";
import ReplyBox from "./ReplyBox";
import Vote from "./Vote";
import Filter from "bad-words";
import errorCommentData from "../data/errorCommentData";
import emojidata from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdAddReaction } from "react-icons/md";
import data from "../data/data.json";
import useEmojiPicker from "../hooks/useEmojiPicker";
import CurrentUserContext from "../context/CurrentUserContext";
import useMutableStack from "../hooks/useMutableStack";
export default function ReusableCard({ person, type }) {
  const { currentUserID } = useContext(CurrentUserContext);
  const {
    id,
    content,
    createdAt,
    score,
    user: { username, image },
    replies,
  } = person;

  const commentType = type;

  const filter = new Filter();
  const [charCount, setcharCount] = useState(content.length);

  const [isModified, setisModified] = useState({
    isDeleting: false,
    isEditing: false,
    isReplying: false,
    isSending: false,
  });

  const { isDeleting, isEditing, isReplying } = isModified;
  const initComment = commentType === "update" ? content : "";

  const [formData, setFormData] = useState({
    comment: initComment,
  });

  const { comment } = formData;

  const emptyCommentError = [...errorCommentData][0].error;
  const [maxCharLmtError, MAX_CHARS_COMMENT] = [
    [...errorCommentData][1].error,
    [...errorCommentData][1].MAX_CHARS_COMMENT,
  ];

  const [commentError, setcommentError] = useState();
  const updateComment = (e) => {
    e.preventDefault();

    !commentError &&
      setisModified((prev) => {
        return { ...prev, isEditing: false };
      });
  };

  const editComment = (e) => {
    const { name, value } = e.target;

    const charCount = value.trim().length;
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

  const isCurrentUser = id === currentUserID;

  //  Handles Emoji Picker Functions
  const { showEmoji, setShowEmoji, addEmoji } = useEmojiPicker(
    comment,
    formData,
    setFormData,
    commentError,
  );

  const replyCard = data.comments.find((person) => person.id === currentUserID);
  const replyCard2 = data.comments[1].replies.find(
    (person) => person.id === currentUserID,
  );

  const { push, top, stack } = useMutableStack([]);

  useEffect(() => {
    if (isReplying) {
      if (replyCard && stack.indexOf(replyCard) === -1) {
        push(replyCard);
      } else if (replyCard2 && stack.indexOf(replyCard2) === -1) {
        push(replyCard2);
      }
    }
  }, [isReplying]);

  const replyCards = stack
    .map((reply) => (
      <ReusableCard person={reply} type={"send"} key={reply.id} />
    ))
    .reverse();

  // <ReusableCard person={top} type={"update"} />
  return (
    <>
      {!isDeleting && (
        <div
          key={id}
          id={id}
          className={`user-comment ${
            commentError ? "animate-shake" : ""
          }  space-y-4  rounded-lg bg-whitee  p-4 dark:bg-d-whitee`}
        >
          {commentType === "update" && (
            <div className="flex items-center">
              <a
                href="#"
                className="cursor-pointer rounded-full p-1 transition-all duration-500 hover:bg-light-gray dark:hover:bg-d-light-gray"
                aria-labelledby="update-userID"
              >
                <span className="sr-only" id="update-userID">
                  Click this to view profile
                </span>
                <figure className="flex items-center gap-4 pr-1  font-medium">
                  <img
                    className="w-8 rounded-full"
                    src={image}
                    alt={`User Avatar ${username}`}
                  />
                  <figcaption className="text-dark-blue dark:text-d-dark-blue">
                    {username}
                  </figcaption>
                </figure>
              </a>
              {isCurrentUser && (
                <div className="h-fit rounded-sm bg-moderate-blue px-1.5 text-sm text-whitee dark:bg-[#676ad1]">
                  you
                </div>
              )}
              <span className="pl-4 text-grayish-blue dark:text-white">
                {createdAt}
              </span>
            </div>
          )}

          {/* Handles textarea editing */}
          {isCurrentUser &&
          (commentType === "update" ? isEditing : !isEditing) ? (
            <form className="relative" onSubmit={updateComment}>
              <textarea
                id="commentTextAreaID"
                name="comment"
                className={`comment-editing flex h-[10rem] w-full resize-none items-center justify-center overflow-auto rounded-md border dark:bg-[#383a40] ${
                  commentError
                    ? "border-red-500"
                    : "focus:border-moderate-blue dark:focus:border-d-moderate-blue"
                }  p-2 text-grayish-blue caret-moderate-blue outline-none dark:text-white dark:caret-d-moderate-blue `}
                value={comment}
                onChange={editComment}
                placeholder="Add a comment..."
                autoFocus
              />

              {/* Handles emoji picker */}
              {showEmoji && (
                <div className="absolute right-2 top-full z-10 bg-very-light-gray shadow-xl  dark:bg-d-very-light-gray">
                  <Picker
                    data={emojidata}
                    onEmojiSelect={addEmoji}
                    emojiButtonSize={30}
                    emojiSize={20}
                    navPosition="bottom"
                    previewPosition="none"
                    skinTonePosition="none"
                    emojiButtonColors={["skyblue", "lightgreen", "violet"]}
                  />
                </div>
              )}
              <small className="absolute -top-4 right-3 text-slate-400 ">
                <i>{charCount}</i>
              </small>
              <small className="error-comment visible mt-2 self-start text-red-500">
                <i>{commentError}</i>
              </small>

              <div className="flex items-center justify-between pt-3">
                {/* <div className="flex w-full justify-between pt-3"> */}

                {commentType == "send" && (
                  <a
                    href="#"
                    className="cursor-pointer"
                    aria-labelledby="send-userID"
                  >
                    <span className="sr-only" id="send-userID">
                      Click this to view profile
                    </span>
                    <img
                      className="w-8 rounded-full"
                      src={image}
                      alt="user avatar"
                    />
                  </a>
                )}
                <div
                  className={`cta-btns flex ${
                    commentType === "update" ? "w-full" : ""
                  } justify-between`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmoji((prev) => !prev);
                    }}
                    className={`emojiBtn ${
                      commentType === "send" && "hidden"
                    } group btn btn-sm`}
                    aria-labelledby="emojiBtnID"
                  >
                    <span className="sr-only" id="emojiBtnID">
                      Click this button for emoji tray
                    </span>
                    <MdAddReaction className="fill-dark-blue text-xl transition  group-hover:fill-moderate-blue dark:fill-d-dark-blue dark:group-hover:fill-d-moderate-blue" />
                  </button>

                  <button
                    type="submit"
                    className={`${
                      commentType === "send" && "h-fit px-7 py-3"
                    } btn btn-sm w-fit bg-moderate-blue font-medium text-whitee transition-all hover:bg-moderate-blue hover:opacity-80 dark:bg-d-moderate-blue`}
                    disabled={commentError}
                  >
                    {commentType === "update" ? "Update" : "Send"}
                  </button>
                </div>
              </div>
              {/* </div> */}
            </form>
          ) : (
            <>
              <p className="comment-actual whitespace-normal break-words text-grayish-blue dark:text-d-light-grayish-blue">
                {
                  // Handles censored text filtering if any
                  commentType === "update" && filter.clean(comment)
                }
              </p>

              <div className="btnss flex items-center justify-between">
                {/* Handles voting functions*/}
                <Vote score={score} isCurrentUser={isCurrentUser} />

                {/* Handles icon buttons according to card type */}
                {isCurrentUser ? (
                  <div className="flex">
                    <IconButton btnIndex="0" action={setisModified} />

                    <IconButton btnIndex="1" action={setisModified} />
                    <ConfirmationModal setisModified={setisModified} />
                  </div>
                ) : (
                  <IconButton btnIndex="2" action={setisModified} />
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Handles adding reply card by current user in the reply box */}
      {isReplying && (
        <ReplyBox setisModified={setisModified} replyCard={replyCards} />
      )}
    </>
  );
}
