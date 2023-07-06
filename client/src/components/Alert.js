import React from "react";

function Alert(props) {
  return (
    <div style={{ height: "50px" }}>
      {props.alertMsg && (
        <div
          className={`alert alert-${props.alertMsg.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alertMsg.msg}</strong>
        </div>
      )}
    </div>
  );
}

export default Alert;

// entering first commit here
