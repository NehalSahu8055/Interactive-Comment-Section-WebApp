import React, { useEffect } from "react";

export default function ConfirmationModal() {
  const deleteComment = () => {
    const userComment = document.querySelector(".user-comment");

    userComment && userComment.remove();
  };

  return (
    <dialog id="confirmation-modal" className="modal">
      <div className="modal-box max-w-[23rem] rounded-[0.32rem]">
        <h3 className="text-xl font-medium text-dark-blue">Delete comment</h3>
        <p className="py-4 leading-6 text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="buttons flex justify-between">
          <button
            onClick={() =>
              document.getElementById("confirmation-modal").close()
            }
            className="btn btn-neutral font-medium leading-6 text-white"
          >
            NO, CANCEL
          </button>
          <button
            onClick={deleteComment}
            className="btn btn-error font-medium leading-6 text-white"
          >
            YES, DELETE
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
