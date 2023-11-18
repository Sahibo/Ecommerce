import React from "react";

export default function AuthFormHeaderButton({ text, onClick }) {
  const handleButtonClick = () => {
    onClick(text);
  };

  return (
    <div className="form-header-button-container" onClick={handleButtonClick}>
      <span>{text}</span>
    </div>
  );
};
