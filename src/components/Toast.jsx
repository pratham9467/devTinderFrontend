import React from "react";

const Toast = ({message}) => {
  return (
    <div>
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
