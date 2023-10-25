import React, { useContext, useState } from "react";
import data from "../data/data.json";
import IconButton from "./IconButton";
import Vote from "./Vote";
import ConfirmationModal from "./ConfirmationModal";
import Filter from "bad-words";
import errorCommentData from "../data/errorCommentData";
import SendCommentContext from "../context/SendCommentContext";
import UpdateCommentContext from "../context/UpdateCommentContext";
import ReplyBox from "./ReplyBox";
import CommentContext from "../context/CommentContext";

export default function User() {
  const {
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
  } = useContext(CommentContext);

  // console.log(
  //   data.currentUser.image,
  //   data.currentUser.username,

  //   // data.comments.content,
  //   // data.comments.score,
  //   // data.comments.user
  //   // data.comments.user
  // );

  // const comments = [...data.comments].map((comment) => {
  //   console.log(comment);
  //   const { id, content, createdAt, score, user, replies } = comment;
  //   console.log(id, content, createdAt, score, user, replies);
  // });

  // add(2,3);

  // const commentType =
  //   useContext(SendCommentContext) || useContext(UpdateCommentContext);

  // const filter = new Filter();
  // const [charCount, setcharCount] = useState();

  // const { id: c_id, image: c_image, username: c_username } = data.currentUser;

  // const [isModified, setisModified] = useState({
  //   isDeleting: false,
  //   isEditing: false,
  //   isReplying: false,
  // });

  // const { isDeleting, isEditing, isReplying } = isModified;
  // const initComment =
  //   commentType === "update"
  //     ? "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."
  //     : "";

  // const [formData, setFormData] = useState({
  //   comment: initComment,
  // });

  // const { comment } = formData;

  // // const censoredComment = useTextCensor(comment);

  // const emptyCommentError = [...errorCommentData][0].error;
  // const [maxCharLmtError, MAX_CHARS_COMMENT] = [
  //   [...errorCommentData][1].error,
  //   [...errorCommentData][1].MAX_CHARS_COMMENT,
  // ];

  // // const MAX_CHARS_COMMENT = 400;
  // const [commentError, setcommentError] = useState();
  // const updateComment = (e) => {
  //   e.preventDefault();

  //   !commentError &&
  //     setisModified((prev) => {
  //       return { ...prev, isEditing: false };
  //     });
  // };

  // const editComment = (e) => {
  //   const { name, value, length } = e.target;

  //   const charCount = value.length;
  //   setcharCount(charCount);

  //   const maxCharLmtCheck = charCount < MAX_CHARS_COMMENT;

  //   charCount === 0
  //     ? setcommentError(emptyCommentError)
  //     : setcommentError(null);

  //   maxCharLmtCheck
  //     ? setFormData({
  //         ...formData,
  //         [name]: value,
  //       })
  //     : setcommentError(maxCharLmtError);
  // };

  return (
    <div className="flex max-w-[343px] flex-col gap-4">
      {[...data.comments].map((person) => {
        const {
          id,
          content,
          createdAt,
          score,
          user: { username, image },
          replies,
        } = person;

        const isCurrentUser = id === 2;
        return (
          // id == c_id &&
          <div
            key={id}
            className={`user-comment grid   gap-4 rounded-lg bg-white p-4`}
          >
            <div
              className={`${
                commentType === "send" && "hidden"
              } flex items-center `}
            >
              <a
                href="#"
                className="cursor-pointer rounded-full p-1 transition-all duration-500 hover:bg-light-gray"
              >
                <figure className="flex items-center gap-4 pr-1  font-medium">
                  <img
                    className="w-8 rounded-full"
                    src={image}
                    alt="avatar of a smiling girl with curly hair wearing sunglasses"
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

            {isCurrentUser &&
            (commentType === "update" ? isEditing : !isEditing) ? (
              <form className="relative" onSubmit={updateComment}>
                <textarea
                  name="comment"
                  className="comment-editing flex h-[10rem] w-full resize-none items-center justify-center overflow-auto rounded-sm border border-red-500  p-2 text-grayish-blue caret-moderate-blue outline-none focus:border-moderate-blue"
                  value={comment}
                  onChange={editComment}
                  placeholder="Add a comment..."
                />

                <small className="absolute -top-4 right-3 text-slate-400 ">
                  <i>{charCount}</i>
                </small>
                <small className="error-comment visible mt-2 self-start text-red-500">
                  <i>{commentError}</i>
                </small>

                <div className="flex items-center justify-between pt-3">
                  {/* <div className="flex w-full justify-between pt-3"> */}

                  <a href="#" className="cursor-pointer">
                    <figure
                      className={`${
                        commentType === "update" && "hidden"
                      } flex items-center gap-4 rounded-full p-1 pr-2 font-medium hover:bg-light-gray`}
                    >
                      <img
                        className="w-8 rounded-full"
                        src="/src/assets/images/avatars/image-amyrobson.webp"
                        alt="avatar of a smiling curly hair girl with sunglasses"
                      />
                      <figcaption className="sr-only text-dark-blue">
                        amyrobson
                      </figcaption>
                    </figure>
                  </a>

                  <button
                    type="submit"
                    className={`${
                      commentType === "send" && "h-fit px-7 py-3"
                    } btn btn-sm ml-auto  w-fit bg-moderate-blue font-medium text-white transition-all hover:bg-moderate-blue hover:opacity-80`}
                    disabled={commentError}
                  >
                    {commentType === "update" ? "Update" : "Send"}
                  </button>
                </div>
                {/* </div> */}
              </form>
            ) : (
              <>
                <p className="comment-actual text-grayish-blue">
                  {filter.clean(comment)}
                </p>
                <div className="btnss flex items-center justify-between">
                  <Vote score={score} />
                  {isCurrentUser ? (
                    <div className="flex">
                      <IconButton btnIndex="0" action={setisModified} />
                      <ConfirmationModal />

                      <IconButton btnIndex="1" action={setisModified} />
                    </div>
                  ) : (
                    <IconButton btnIndex="2" action={setisModified} />
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Replying Part */}
      {/* {data.comments.replies.map((reply) => {
          return <span>{reply}</span>;
        })} */}

      {/* <div>
          {
            [...data.comments].map((person) => {
              return [...person.replies].map((item) => {
                // return (<>{}</>)
              });
            })
          }
        </div> */}

      {isReplying && <ReplyBox />}
    </div>
  );
}
