import React, { useContext, useEffect, useId, useState } from "react";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import CurrentUserContext from "../../../../context/userContext/CurrentUserContext";
import Filter from "bad-words";
import IconButton from "../../Buttons/IconButton";
import { MdAddReaction } from "react-icons/md";
import Picker from "@emoji-mart/react";
import ReplyBox from "../Reply/ReplyBox";
import Vote from "../../Vote/Vote";
import data from "../../../../data/data.json";
import emojidata from "@emoji-mart/data";
import errorCommentData from "../../../../data/errorCommentData";
import useEmojiPicker from "../../../../hooks/useUtilities/useEmojiPicker";
import useMutableStack from "../../../../hooks/useUtilities/useMutableStack";
import TimeStamp from "../../../../utils/TimeStamp";
import { motion } from "framer-motion";

export default function ReusableCard({ person, type }) {
  const { currentUserID } = useContext(CurrentUserContext);
  const {
    id,
    content,
    createdAt,
    score,
    user: { username, image },
  } = person;

  const [commentType, setcommentType] = useState(type);

  const [isModified, setisModified] = useState({
    isDeleting: false,
    isEditing: false,
    isReplying: false,
  });

  const { isDeleting, isEditing, isReplying } = isModified;
  const initComment = commentType === "update" ? content : "";

  const [charCount, setcharCount] = useState(initComment.length);

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

    setisModified((prev) => {
      return { ...prev, isEditing: false };
    });

    commentType === "send" && setcommentType("update");
  };

  const editComment = (e) => {
    const { name, value, maxLength } = e.target;

    const charCount = value.trim().length;
    setcharCount(charCount);

    const maxCharLmtCheck = charCount < maxLength;

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

  // Handles on Click Enter Submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      charCount > 0 && updateComment(e);
    }
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

  useEffect(() => {
    if (isReplying) {
      if (replyCard && stack.indexOf(replyCard) === -1) {
        push(replyCard);
      } else if (replyCard2 && stack.indexOf(replyCard2) === -1) {
        push(replyCard2);
      }
    }
  }, [isReplying]);

  const { push, stack, isEmpty } = useMutableStack([]);

  const replyCards = stack
    .map((reply) => (
      <ReusableCard person={reply} type={"send"} key={reply.id} />
    ))
    .reverse();

  // Handles  Reset isReplying when user switch Functions
  useEffect(() => {
    setisModified((prev) => {
      return { ...prev, isReplying: false };
    });
  }, [currentUserID]);

  const filter = new Filter();
  const updateUserID = useId();

  return (
    !isDeleting && (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          key={id}
          id={id}
          className={`user-comment ${
            commentError ? "animate-shake" : ""
          }  space-y-4 rounded-lg  bg-whitee p-4 shadow-[2px_3px_7px_0px_#00000012] dark:bg-d-whitee`}
        >
          {commentType === "update" && (
            <div className="flex items-center">
              <a
                href="#"
                className="cursor-pointer rounded-full p-1 transition-all duration-500 hover:bg-light-gray dark:hover:bg-d-light-gray"
                aria-labelledby={updateUserID}
              >
                <span className="sr-only" id={updateUserID}>
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
                {type === "update" ? (
                  createdAt
                ) : (
                  <TimeStamp timestamp={new Date()} />
                )}
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
                onKeyDown={handleKeyDown}
                placeholder="Add a comment..."
                maxLength={MAX_CHARS_COMMENT}
                autoFocus
              />

              {/* Handles emoji picker */}
              {showEmoji && (
                <div
                  className={`absolute top-full ${
                    commentType === "send" ? "right-24" : "left-0 mt-2 "
                  } dark:bg-d-very-light-gray} z-50 rounded-xl bg-very-light-gray  shadow-xl`}
                >
                  <Picker
                    data={emojidata}
                    onEmojiSelect={addEmoji}
                    emojiButtonSize={30}
                    emojiSize={20}
                    navPosition="bottom"
                    previewPosition="none"
                    skinTonePosition="none"
                    emojiButtonColors={["skyblue", "lightgreen", "violet"]}
                    autoFocus
                  />
                </div>
              )}
              <small className="absolute -top-4 right-3 text-slate-400 ">
                <i>{charCount}</i>
              </small>
              <small className="error-comment visible mt-2 self-start text-soft-red dark:text-d-soft-red">
                <i>{commentError}</i>
              </small>
              <div className="flex items-center justify-between pt-3">
                {commentType === "send" && (
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
                      commentType === "send" ? "mr-6" : ""
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
                      commentType === "send" ? "h-fit px-7 py-3" : ""
                    } btn btn-sm w-fit border-none bg-moderate-blue font-medium text-whitee transition-all hover:bg-moderate-blue hover:opacity-80`}
                    disabled={charCount === 0}
                  >
                    {commentType === "update" ? "Update" : "Send"}
                  </button>
                </div>
              </div>
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
                <Vote
                  commentType={type}
                  score={score}
                  isCurrentUser={isCurrentUser}
                />

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
        </motion.div>

        {/* Handles adding reply card by current user in the reply box */}
        {!isEmpty && (
          <ReplyBox
            isReplying={isReplying}
            setisModified={setisModified}
            replyCard={replyCards}
          />
        )}
      </>
    )
  );
}
