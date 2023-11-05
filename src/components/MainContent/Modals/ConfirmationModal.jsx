import PropTypes from "prop-types";
import { useRef } from "react";

// Prop Validation
ConfirmationModal.propTypes = {
  setisModified: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
};

export default function ConfirmationModal({ setisModified, isDeleting }) {
  const deleteComment = () => {
    hideModal();
    setisModified((prev) => {
      return { ...prev, isDeleting: !prev.isDeleting };
    });
  };
  const hideModal = () => {
    document.getElementById("confirmation-modal").classList.add("hidden");
  };

  return (
    !isDeleting && (
      <dialog
        id="confirmation-modal"
        className="modal hidden backdrop-blur-[0.15rem]"
        aria-modal="true"
        // aria-hidden="true"
      >
        <form
          method="dialog"
          className="modal-box max-w-[23rem] rounded-[0.32rem]"
        >
          <h2 className="text-xl font-medium text-dark-blue dark:text-d-dark-blue">
            Delete comment
          </h2>
          <p className="py-4 leading-6 text-grayish-blue dark:text-whitee">
            Are you sure you want to delete this comment? This will remove the
            comment and can’t be undone.
          </p>
          <div className="buttons flex justify-between">
            <button
              className="btn btn-neutral font-medium leading-6 text-white"
              onClick={hideModal}
              autoFocus
            >
              NO, CANCEL
            </button>
            <button
              onClick={deleteComment}
              className="btn btn-error bg-[#be4d52] font-medium leading-6 text-white"
            >
              YES, DELETE
            </button>
          </div>
        </form>
      </dialog>
    )
  );
}
