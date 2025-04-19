import React from "react";

export default function ErrorMessage({ errMessage }) {
  return (
    <p className="error">
      <span>⛔️</span> {errMessage}
    </p>
  );
}
