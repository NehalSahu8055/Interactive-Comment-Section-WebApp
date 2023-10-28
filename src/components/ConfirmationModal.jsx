import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import data from "../data/data.json";
export default function ConfirmationModal({ setisModified }) {
  const { currentUserID, switchUser } = useContext(CurrentUserContext);

  const deleteComment = (e) => {
    const userComment = document.querySelector(".user-comment");
    // const comment = data.comments.find((person) => person.id == targetCard);

    // comment.remove();
    // console.log(
    //   e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove(),
    // );
    setisModified((prev) => {
      return { ...prev, isDeleting: true };
    });
    // closeModal();
  };

  return (
    <dialog id="confirmation-modal" className="modal">
      <form
        method="dialog"
        className="modal-box max-w-[23rem] rounded-[0.32rem]"
      >
        <h3 className="text-xl font-medium text-dark-blue">Delete comment</h3>
        <p className="py-4 leading-6 text-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="buttons flex justify-between">
          <button className="btn btn-neutral font-medium leading-6 text-white">
            NO, CANCEL
          </button>
          <button
            onClick={deleteComment}
            className="btn btn-error font-medium leading-6 text-white"
          >
            YES, DELETE
          </button>
        </div>
      </form>
    </dialog>
  );
}
