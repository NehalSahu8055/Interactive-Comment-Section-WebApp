import React from "react";

export default function CommentBox() {
  return (
    <>
      <div className="user-comment-box grid gap-4 rounded-lg bg-white p-4">
        {/* {isEditing ? ( */}
        <form className="relative">
          <textarea
            name="comment"
            className="comment-editing flex h-[10rem] w-full resize-none items-center justify-center overflow-auto rounded-sm border border-red-500  p-2 text-grayish-blue caret-moderate-blue outline-none focus:border-moderate-blue"
            // value={comment}
            // onChange={editComment}
            placeholder="Add your Comment here..."
          />
          <small className="absolute -top-4 right-3 text-slate-400 ">
            charCount
          </small>
          <small className="error-comment visible -mt-2 self-start italic text-red-500">
            commentError
          </small>
        </form>

        <div className="flex items-center  justify-between">
          <figure className="flex items-center gap-4 pr-2 font-medium">
            <img
              className="w-8 rounded-full"
              src="/src/assets/images/avatars/image-amyrobson.webp"
              alt="avatar of a smiling curly hair girl with sunglasses"
            />
            <figcaption className="text-dark-blue sr-only">amyrobson</figcaption>
          </figure>
          {/* {isCurrentUser && (
          <div className="h-fit rounded-sm bg-moderate-blue px-1.5 text-sm text-white">
            you
          </div>
        )} */}
          {/* <span className="pl-4 text-grayish-blue">1 month ago</span> */}

          <div className="flex items-center justify-between pt-3">
            <button
              type="submit"
              className="btn btn-sm px-7 h-fit py-3 w-fit bg-moderate-blue font-medium text-white transition-all hover:bg-moderate-blue hover:opacity-80"
              // disabled={commentError}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
