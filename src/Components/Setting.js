import React from "react";

export default function Setting() {
  return (
<>
    <h1>Settings</h1>
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        />
      <label className="form-check-label" for="flexSwitchCheckDefault">
        Enable Dark Mode
      </label>
        </div>
</>

  );
}
