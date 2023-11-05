import TimeAgo from "react-timeago";
import PropTypes from "prop-types";

// Prop validation
TimeStamp.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
};

export default function TimeStamp({ timestamp }) {
  return (
    <TimeAgo
      date={timestamp}
      formatter={(value, unit, suffix) => {
        if (unit === "second") {
          return "just now";
        }
        return `${value} ${unit}${value > 1 ? "s" : ""} ${suffix}`;
      }}
      minPeriod={60}
      maxPeriod={3600}
    />
  );
}
