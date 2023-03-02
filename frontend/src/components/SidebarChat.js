import { Avatar } from "@material-ui/core";
import React, { useRef } from "react";
import "../styles/sidebarchat.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const SidebarChat = () => {
  const conversationName = useRef();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const createConversation = () => {};

  return (
    <>
      <div className="title-header">
        <h4 style={{ marginLeft: "10px" }}>Conversations</h4>
        <IconButton>
          <AddCircleOutlineIcon
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        </IconButton>
      </div>
      <div className="sidebar-chat">
        <Avatar />
        <div className="sidebar-chat__info" onClick={createConversation}>
          <h5 ref={conversationName}>Contractors</h5>
        </div>
      </div>
      <br />

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a Conversation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body__container">
                <form
                  style={{ width: "90%" }}
                  className="modal-body__form"
                  action="/action_page.php"
                >
                  <input list="browsers" name="browser" />
                  <datalist id="browsers">
                    <option value="Internet Explorer" />
                  </datalist>
                </form>
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarChat;
