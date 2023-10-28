import React, { useState } from "react";
import useVoting from "../hooks/useVoting";

export default function Vote({ score, isCurrentUser }) {
  const [hasVoted, sethasVoted] = useState({
    upvotes: false,
    downvotes: false,
  });
  const { state, upvote, downvote } = useVoting(score);

  const toggleVote = (e) => {
    const voteType = e.currentTarget.dataset.vote;

    // Check if the button is already in the voting state
    if (
      (voteType === "upvotes" && hasVoted.upvotes) ||
      (voteType === "downvotes" && hasVoted.downvotes)
    ) {
      // You can choose to show a message or disable the button here to prevent multiple clicks
      // e.currentTarget.setAttribute(disabled,"disabled");
      return;
    }

    sethasVoted((prevVote) => ({
      ...prevVote,
      upvotes: voteType === "upvotes",
      downvotes: voteType === "downvotes",
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
      // e.currentTarget.classList.add("brightness-50", "saturate-[5]");
      e.currentTarget.parentNode.firstElementChild.classList.remove(
        "brightness-50",
        "saturate-[5]",
      );
    }
  };

  return (
    <div className="vote-counter flex w-fit items-center rounded-lg bg-very-light-gray font-medium text-moderate-blue">
      <button
        data-vote="upvotes"
        onClick={toggleVote}
        className={`grid h-full place-content-center p-3 transition ${
          !isCurrentUser && "hover:brightness-50 hover:saturate-[5]"
        }`}
        disabled={isCurrentUser}
      >
        <span className="sr-only">Click to upvote the comment</span>
        <img
          className=""
          src="/src/assets/images/icon-plus.svg"
          aria-hidden="true"
          alt=""
        />
      </button>
      <span className="grid h-full place-content-center px-1">{state}</span>
      <button
        data-vote="downvotes"
        onClick={toggleVote}
        className={`grid h-full place-content-center p-3 transition ${
          !isCurrentUser && "hover:brightness-50 hover:saturate-[5]"
        }`}
        disabled={isCurrentUser}
      >
        <span className="sr-only">Click to downvote the comment</span>
        <img
          src="/src/assets/images/icon-minus.svg"
          aria-hidden="true"
          alt=""
        />
      </button>
    </div>
  );
}
