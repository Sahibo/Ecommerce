import React from "react";

export default function AuthFormHeaderButton({ text, onClick, isSelected }) {
  return (
    <div
      className={`form-header-button-container ${!isSelected ? "off" : ""}`}
      onClick={() => onClick(text)}
    >
      <span>{text}</span>
    </div>
  );
}