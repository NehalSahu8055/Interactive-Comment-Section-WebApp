import React from "react";
import iconButtonData from "../../../data/iconButtonData.json";

export default function IconButton({ btnIndex, action }) {
  const btn = iconButtonData[btnIndex];

  const handleClick = (e) => {
    if (btn.id == 1) {
      document.getElementById("confirmation-modal").showModal();
    } else if (btn.id == 2) {
      action((prev) => {
        return { ...prev, isEditing: true };
      });
    } else {
      action((prev) => {
        return { ...prev, isReplying: !prev.isReplying };
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      key={btn.id}
      className={`group btn btn-sm dark:bg-d-very-light-gray  ${
        btn.id != 1
          ? "dark:border-none dark:text-d-moderate-blue dark:hover:bg-d-very-light-gray/90"
          : ""
      }  flex items-center capitalize  ${
        btn.id == 1 ? "btn-error btn-outline mr-2" : ""
      } `}
      aria-labelledby={`iconButtonID${btn.id}`}
    >
      <span id={`iconButtonID${btn.id}`} className="sr-only">
        {btn.accessibleText}
      </span>
      <img
        className={`${btn.id == 1 ? "group-hover:brightness-[25%] " : ""} ${
          btn.id != 1
            ? "dark:[filter:invert(41%)_sepia(83%)_saturate(683%)_hue-rotate(206deg)_brightness(95%)_contrast(101%)]"
            : ""
        }`}
        src={btn.address}
        alt=""
      />
      <span
        className={`text-${btn.textColor} dark:text-d-${btn.textColor} ${
          btn.id == 1 ? "group-hover:brightness-[25%]" : ""
        } font-medium ${btn.id == 1 ? "-mb-1" : ""}`}
      >
        {btn.label}
      </span>
    </button>
  );
}
