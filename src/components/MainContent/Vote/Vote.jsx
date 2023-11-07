import { useId, useState } from "react";
import PropTypes from "prop-types";
import useVoting from "../../../hooks/useUtilities/useVoting";

// Prop Validation
Vote.propTypes = {
  commentType: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};

export default function Vote({ commentType, score, isCurrentUser }) {
  const upvoteID = useId();
  const downvoteID = useId();
  const totalUpvotesID = useId();

  const [hasVoted, sethasVoted] = useState({
    hasUpvoted: false,
    hasDownvoted: false,
  });
  const initScore = Number(commentType === "update" ? score : 0);

  const { state, upvote, downvote } = useVoting(initScore);
  const { hasUpvoted, hasDownvoted } = hasVoted;

  const toggleVote = (e) => {
    const voteType = e.currentTarget.dataset.vote;

    // Check if the button is already in the voting state
    if (
      (voteType === "upvotes" && hasUpvoted) ||
      (voteType === "downvotes" && hasDownvoted)
    ) {
      return;
    }

    sethasVoted((prevVote) => ({
      ...prevVote,
      hasUpvoted: voteType === "upvotes",
      hasDownvoted: voteType === "downvotes",
    }));

    if (voteType === "upvotes") {
      upvote();
      e.currentTarget.classList.add("brightness-50", "saturate-[5]");
      e.currentTarget.nextSibling.nextSibling.classList.remove(
        "brightness-50",
        "saturate-[5]",
      );
    } else if (voteType === "downvotes") {
      downvote();
      e.currentTarget.parentNode.firstElementChild.classList.remove(
        "brightness-50",
        "saturate-[5]",
      );
    }
  };

  return (
    <div className="vote-counter flex w-fit items-center rounded-lg bg-very-light-gray font-medium text-moderate-blue dark:bg-d-very-light-gray dark:text-d-moderate-blue">
      <button
        data-vote="upvotes"
        onClick={toggleVote}
        className={`grid h-full place-content-center p-3 transition ${
          !isCurrentUser &&
          "hover:brightness-50 hover:saturate-[5] dark:hover:brightness-75"
        }`}
        disabled={isCurrentUser}
        aria-labelledby={upvoteID}
      >
        <span id={upvoteID} className="sr-only">
          {hasUpvoted ? "You have upvoted" : "upvote this comment"}
        </span>
        <img
          className=""
          src="/images/icon-plus.svg"
          aria-hidden="true"
          width={11}
          height={3}
          alt=""
        />
      </button>
      <span
        className="grid h-full place-content-center px-1"
        aria-labelledby={totalUpvotesID}
      >
        {state}
      </span>
      <span className="sr-only" id={totalUpvotesID}>
        Live total upvotes is {state}{" "}
      </span>
      <button
        data-vote="downvotes"
        onClick={toggleVote}
        className={`grid h-[2.2rem] place-content-center p-3 transition ${
          !isCurrentUser &&
          "hover:brightness-50 hover:saturate-[5] dark:hover:brightness-75"
        }`}
        disabled={isCurrentUser}
        aria-labelledby={downvoteID}
      >
        <span id={downvoteID} className="sr-only">
          downvote this comment
        </span>
        <img
          src="/images/icon-minus.svg"
          aria-hidden="true"
          width={11}
          height={11}
          alt=""
        />
      </button>
    </div>
  );
}
