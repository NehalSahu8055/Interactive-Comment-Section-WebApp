import React, { useContext, useState } from "react";
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

export default function ReusableCard({ person, type }) {
  const { currentUserID } = useContext(CurrentUserContext);
  // switchUser(data.currentUser.id);
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

  const isCurrentUser = id === currentUserID;

  //  Handle Emoji Picker Functions [Custom Hook used]

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

  return (
    <>
      {!isDeleting && (
        <div
          key={id}
          id={id}
          className={`user-comment space-y-4  rounded-lg bg-white p-4 `}
        >
          {commentType === "update" && (
            <div className="flex items-center">
              <a
                href="#"
                className="cursor-pointer rounded-full p-1 transition-all duration-500 hover:bg-light-gray"
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
                  <figcaption className="text-dark-blue">{username}</figcaption>
                </figure>
              </a>
              {isCurrentUser && (
                <div className="h-fit rounded-sm bg-moderate-blue px-1.5 text-sm text-white">
                  you
                </div>
              )}
              <span className="pl-4 text-grayish-blue">{createdAt}</span>
            </div>
          )}

          {/* Handle textarea editing */}
          {isCurrentUser &&
          (commentType === "update" ? isEditing : !isEditing) ? (
            <form className="relative" onSubmit={updateComment}>
              <textarea
                id="commentTextAreaID"
                name="comment"
                className={`comment-editing flex h-[10rem] w-full resize-none items-center justify-center overflow-auto rounded-md border ${
                  commentError ? "border-red-500" : "focus:border-moderate-blue"
                }  p-2 text-grayish-blue caret-moderate-blue outline-none `}
                value={comment}
                onChange={editComment}
                placeholder="Add a comment..."
              />

              {/* Handle emoji picker */}
              {showEmoji && (
                <div className="absolute right-2 top-full z-10 bg-very-light-gray shadow-xl">
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
                      alt="User avatar of a smiling girl with curly hair wearing sunglasses"
                    />
                  </a>
                )}
                <div className="cta-btns flex w-full justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmoji((prev) => !prev);
                    }}
                    className={`emojiBtn ${
                      commentType === "send" && "hidden"
                    } group btn glass btn-sm`}
                    aria-labelledby="emojiBtnID"
                  >
                    <span className="sr-only" id="emojiBtnID">
                      Click this button for emoji tray
                    </span>
                    <MdAddReaction className="fill-dark-blue text-xl transition group-hover:fill-moderate-blue" />
                  </button>

                  <button
                    type="submit"
                    className={`${
                      commentType === "send" && "h-fit px-7 py-3"
                    } btn btn-sm w-fit bg-moderate-blue font-medium text-white transition-all hover:bg-moderate-blue hover:opacity-80`}
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
              <p className="comment-actual whitespace-normal break-words text-grayish-blue">
                {
                  // Handle censored text filtering if any
                  commentType === "update" && filter.clean(comment)
                }
              </p>

              <div className="btnss flex items-center justify-between">
                {/* Handle voting functions*/}
                <Vote score={score} isCurrentUser={isCurrentUser} />

                {/* Handle icon buttons according to card type */}
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
      {/* Handle adding reply card by current user in the reply box */}
      {isReplying &&
        (replyCard ? (
          <ReplyBox
            replyCard={<ReusableCard person={replyCard} type={"update"} />}
          />
        ) : (
          <ReplyBox
            replyCard={<ReusableCard person={replyCard2} type={"update"} />}
          />
        ))}
    </>
  );
}
