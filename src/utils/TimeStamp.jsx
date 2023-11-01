import React from "react";
import TimeAgo from "react-timeago";

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
