import React, { useState } from "react";
import useVoting from "../../../hooks/useUtilities/useVoting";

export default function Vote({ score, isCurrentUser }) {
  const [hasVoted, sethasVoted] = useState({
    hasUpvoted: false,
    hasDownvoted: false,
  });
  const { state, upvote, downvote } = useVoting(score);
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
        aria-labelledby="upvoteID"
      >
        <span id="upvoteID" className="sr-only">
          {hasUpvoted ? "You have upvoted" : "Click to upvote the comment"}
        </span>
        <img
          className=""
          src="/src/assets/images/icon-plus.svg"
          aria-hidden="true"
          alt=""
        />
      </button>
      <span
        className="grid h-full place-content-center px-1"
        aria-labelledby="totalUpvotesID"
      >
        {state}
      </span>
      <span className="sr-only" id="totalUpvotesID">
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
        aria-labelledby="downvoteID"
      >
        <span id="downvoteID" className="sr-only">
          "Click to downvote the comment"
        </span>
        <img
          src="/src/assets/images/icon-minus.svg"
          aria-hidden="true"
          alt=""
        />
      </button>
    </div>
  );
}
