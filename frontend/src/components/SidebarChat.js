import { Avatar } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "../styles/sidebarchat.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { setConversation } from "../features/conversationSlice";
import { setUserConversations } from "../features/userSlice";
import CloseIcon from "@material-ui/icons/Close";

const SidebarChat = ({ search }) => {
  const [modalInput, setModalInput] = useState("");
  const [conversations, setConversations] = useState([]);

  const dispatch = useDispatch();

  const id = Cookies.get("user_id");

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

  useEffect(() => {
    fetch(`http://localhost:8080/users/conversations/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((convos) => {
        dispatch(setUserConversations(convos));
        setConversations(convos);
      });
  }, []);

  const switchConversation = (convo) => {
    dispatch(setConversation(convo));
  };

  const deleteConversation = (convo) => {
    fetch("http://localhost:8080/users/delete/conversation", {
      method: "DELETE",
      body: JSON.stringify({
        id,
        conversation: convo,
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConversations(data.conversations);
      });
  };

  const addConversation = () => {
    if (modalInput === "" || modalInput.length < 3) {
      toast.error(
        "Conversation field cannnot be blank and must be at least 3 characters long.",
        toastOptions
      );
    } else {
      fetch("http://localhost:8080/users/create/conversation", {
        method: "POST",
        body: JSON.stringify({
          id,
          conversation: modalInput,
        }),
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setConversations(data.conversations);
        });
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
        {conversations
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.toLowerCase().includes(search);
          })
          .map((convo, i) => (
            <div
              className="conversation-container"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px",
              }}
              onClick={() => switchConversation(convo)}
              key={i}
            >
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
                key={i + 1}
              >
                #
              </div>
              <div key={i + 3} className="sidebar-chat__info">
                <h5>{convo}</h5>
              </div>
              <IconButton
                style={{ color: "white", marginLeft: "auto" }}
                onClick={() => deleteConversation(convo)}
              >
                <CloseIcon style={{ fontSize: "14px" }}></CloseIcon>
              </IconButton>
            </div>
          ))}
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
                </form>
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
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addConversation}
              >
                Add
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
