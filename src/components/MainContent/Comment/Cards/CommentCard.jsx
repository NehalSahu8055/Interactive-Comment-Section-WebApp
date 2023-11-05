import PropTypes from "prop-types";
import ReusableCard from "./ReusableCard";
import data from "../../../../data/data.json";

// Prop Validation
CommentCard.propTypes = {
  cardID: PropTypes.number.isRequired,
};

export default function CommentCard({ cardID }) {
  const comment = data.comments.find((person) => person.id === cardID);

  return (
    <>
      {/* Handles comments  */}
      <ReusableCard person={comment} type={"update"} />
    </>
  );
}
