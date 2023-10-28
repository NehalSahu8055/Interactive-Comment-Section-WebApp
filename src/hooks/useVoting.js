import { useReducer } from "react";

export default function useVoting(initState) {
  const initialState = Number(initState);

  const reducer = (state, action) => {

    if (action.type === "UPVOTE") return state + 1;
    else if (action.type === "DOWNVOTE") return state - 1;
    return state;
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    upvote: () => {
      dispatch({ type: "UPVOTE" });
    },
    downvote: () => {
      dispatch({ type: "DOWNVOTE" });
    },
  };
}
