import React, { useState } from "react";
import data from "../data/data.json";
import IconButton from "./IconButton";
import Vote from "./Vote";
import ConfirmationModal from "./ConfirmationModal";

export default function User() {
  console.log(data);
  let isCurrentUser = true;
  const [isModified, setisModified] = useState({
    isDeleting: false,
    isEditing: false,
  });
  const { isDeleting, isEditing } = isModified;
  const initComment =
    "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.";

  const [comment, setComment] = useState(initComment);

  const editComment = (e) => {
    setComment(e.target.value);
  };

  const updateComment = () => {
    setisModified((prev) => {
      return { ...prev, isEditing: false };
    });
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
        <textarea
          className="comment-editing flex h-[10rem] resize-none items-center justify-center overflow-auto rounded-sm border px-2 py-1 text-grayish-blue caret-moderate-blue outline-none focus:border-moderate-blue"
          value={comment}
          onChange={editComment}
        />
      ) : (
        <p className="comment-actual text-grayish-blue">{comment}</p>
      )}

      {isEditing ? (
        <button
          type="submit"
          onClick={updateComment}
          className="btn btn-sm ml-auto w-fit bg-moderate-blue font-medium text-white transition-all hover:bg-moderate-blue hover:opacity-80"
        >
          Update
        </button>
      ) : (
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
      )}
    </div>
  );
}
