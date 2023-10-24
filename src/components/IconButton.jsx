import React from "react";
import iconButtonData from "../data/iconButtonData.json";
import ConfirmationModal from "./ConfirmationModal";

export default function IconButton({ btnIndex, action }) {
  const btn = iconButtonData[btnIndex];
  return (
    <>
      <button
        onClick={() => {
          if (btn.id == 1) {
            document.getElementById("confirmation-modal").showModal();
            action = true;
          } else if (btn.id == 2)
            action((prev) => {
              return { ...prev, isEditing: true };
            });
          else {
            action((prev) => {
              return { ...prev, isReplying: true };
            });

           
          }
        }}
        key={btn.id}
        className={`group btn btn-sm   flex items-center capitalize  ${
          btn.id == 1 &&
          "btn-error btn-outline mr-2 text-moderate-blue hover:text-white active:text-white"
        } `}
      >
        <span className="sr-only">{btn.accessibleText}</span>
        <img
          className={`${btn.id == 1 && "group-hover:brightness-[25%]"}`}
          src={btn.address}
          alt=""
        />
        <span
          className={`text-${btn.textColor} font-medium ${
            btn.id == 1 && "-mb-1"
          }`}
        >
          {btn.label}
        </span>
      </button>
      <ConfirmationModal />
    </>
  );
}
