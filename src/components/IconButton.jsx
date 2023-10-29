import React from "react";
import iconButtonData from "../data/iconButtonData.json";

export default function IconButton({ btnIndex, action }) {
  const btn = iconButtonData[btnIndex];
  const handleClick = (e) => {
    if (btn.id == 1) {
      document.getElementById("confirmation-modal").showModal();
    } else if (btn.id == 2) {
      action((prev) => {
        return { ...prev, isEditing: true };
      });

      console.log(document.getElementById("commentTextAreaID"));
    } else {
      action((prev) => {
        return { ...prev, isReplying: true };
      });
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        key={btn.id}
        className={`group btn btn-sm ${
          btn.id != 1 ? "dark:bg-d-very-light-gray dark:border-none" : ""
        }  flex items-center capitalize  ${
          btn.id == 1 && "btn-error btn-outline mr-2"
        } `}
      >
        <span className="sr-only">{btn.accessibleText}</span>
        <img
          className={`${btn.id == 1 ? "group-hover:brightness-[25%]" : ""}`}
          src={btn.address}
          alt=""
        />
        <span
          className={`text-${btn.textColor} ${
            btn.id == 1 ? "group-hover:brightness-[25%]" : ""
          } font-medium ${btn.id == 1 && "-mb-1"}`}
        >
          {btn.label}
        </span>
      </button>
    </>
  );
}
