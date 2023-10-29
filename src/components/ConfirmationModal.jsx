import React, { useContext, useEffect, useState } from "react";
export default function ConfirmationModal({ setisModified }) {
  const deleteComment = (e) => {
    setisModified((prev) => {
      return { ...prev, isDeleting: true };
    });
  };

  return (
      <dialog tabIndex={-1} id="confirmation-modal" className="modal backdrop-blur-[0.15rem]">
      <form
        method="dialog"
        className="modal-box max-w-[23rem] rounded-[0.32rem]"
        tabIndex={-1}
      >
        <h3 className="text-xl font-medium text-dark-blue dark:text-d-dark-blue" tabIndex={-1}>
          Delete comment
        </h3>
        <p className="py-4 leading-6 text-grayish-blue dark:text-whitee" tabIndex={-1}>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="buttons flex justify-between">
          <button
            className="btn btn-neutral font-medium leading-6 text-white"
            tabIndex={-1}
          >
            NO, CANCEL
          </button>
          <button
            onClick={deleteComment}
            className="btn btn-error font-medium leading-6 text-white"
            tabIndex={-1}
          >
            YES, DELETE
          </button>
        </div>
      </form>
    </dialog>
  );
}
