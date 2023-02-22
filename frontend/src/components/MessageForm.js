import React from "react";
import "../styles/messageForm.css";

const MessageForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="messages-output"> </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-11">
            <input
              type="text"
              className="form-control"
              placeholder="Your message"
            />
          </div>
          <div className="col-md-1">
            <button
              style={{ width: "100%" }}
              className="btn btn-primary"
              type="submit"
            >
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageForm;
