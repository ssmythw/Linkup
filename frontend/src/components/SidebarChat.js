import { Avatar } from "@material-ui/core";
import React, { useRef, useState } from "react";
import "../styles/sidebarchat.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ClearIcon from "@material-ui/icons/Clear";

const SidebarChat = () => {
  const [modalInput, setModalInput] = useState("");
  const [conversations, setConversations] = useState([]);

  const state = useSelector((state) => state);
  const user = state.user;

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const deleteConversation = (convo) => {
    setConversations(conversations.filter((item) => item !== convo));
  };

  const addConversation = () => {
    if (modalInput === "" || modalInput.length < 3) {
      toast.error(
        "Conversation field cannnot be blank and must be at least 3 characters long.",
        toastOptions
      );
    } else {
      setConversations([...conversations, modalInput]);
      // fetch("http://localhost:8080/conversations/create", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     user,
      //     modalInput,
      //   }),
      //   mode: "cors",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
    }
  };

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
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "10px",
            backgroundColor: "lightgrey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          #
        </div>
        <div className="sidebar-chat__info">
          <h5>Contractors</h5>
        </div>
      </div>
      <br />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="modal-body__form"
                  action="/action_page.php"
                >
                  <input
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    list="conversations"
                    name="conversations"
                  />
                  <datalist id="conversations">
                    <option value="Internet Explorer" />
                  </datalist>
                  <IconButton onClick={addConversation}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </form>
              </div>
            </div>
            <div className="conversation-container">
              {conversations.map((convo, i) => {
                return (
                  <>
                    <span
                      key={i}
                      style={{
                        color: "white",
                        backgroundColor: "lightgrey",
                        borderRadius: "5px",
                        width: "fit-content",
                        padding: "5px",
                        marginRight: "10px",
                        display: "inline-block",
                      }}
                    >
                      # {convo}
                      <ClearIcon
                        onClick={() => deleteConversation(convo)}
                        key={i + 1}
                        style={{ color: "white" }}
                      />
                    </span>
                  </>
                );
              })}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default SidebarChat;
