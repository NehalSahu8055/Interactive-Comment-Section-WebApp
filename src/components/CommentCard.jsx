import React from "react";

export default function CommentCard({}) {
  const isCurrentUser = id === 2;
  return (
    id == c_id && (
      <div
        key={id}
        className={`user-comment grid   gap-4 rounded-lg bg-white p-4`}
      >
        <div
          className={`${commentType === "send" && "hidden"} flex items-center `}
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
    )
  );
}
