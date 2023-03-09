import React, { useEffect, useRef, useState } from "react";
import "../styles/sidebarchat.css";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { setConversation } from "../features/conversationSlice";
import { setUserConversations } from "../features/userSlice";
import CloseIcon from "@material-ui/icons/Close";
import ForumIcon from "@material-ui/icons/Forum";
import GroupIcon from "@material-ui/icons/Group";

const SidebarChat = ({ search }) => {
  const [modalInput, setModalInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [globalUsers, setGlobalUsers] = useState([]);
  const [globalConversations, setGlobalConversations] = useState([]);
  const [listType, setListType] = useState(false);

  const dispatch = useDispatch();

  console.log(friends);

  const id = Cookies.get("user_id");

  const state = useSelector((state) => state);
  const userState = state.user;

  String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  const switchListType = () => {
    setListType(!listType);
  };

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

  useEffect(() => {
    fetch(`http://localhost:8080/users/friends/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        const friends = user.friends;
        setFriends(friends);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/conversations", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((allConversations) => {
        setGlobalConversations(allConversations);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/users", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((users) => {
        setGlobalUsers(users);
      });
  }, []);

  const switchConversation = (convo) => {
    dispatch(setConversation(convo));
  };

  const setInputConversation = (convo) => {
    setModalInput(convo);
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

  const addConversation = (convo) => {
    fetch("http://localhost:8080/users/create/conversation", {
      method: "POST",
      body: JSON.stringify({
        id,
        conversation: modalInput.capitalizeFirstLetter(),
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
        setModalInput("");
      });
  };

  const addFriend = (recipient) => {
    fetch("http://localhost:8080/users/friend/add", {
      method: "POST",
      body: JSON.stringify({
        id,
        recipient: recipient,
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <>
      <div className="coversation-header">
        <IconButton onClick={switchListType}>
          <ForumIcon />
        </IconButton>
        <IconButton onClick={switchListType}>
          <GroupIcon />
        </IconButton>
      </div>
      <div className="channels">
        <div className={listType ? "hide-channels" : "show-channels"}>
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
                    <h5>{convo.capitalizeFirstLetter()}</h5>
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
                      autoComplete="off"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="modal-body__form"
                    >
                      <input
                        value={modalInput}
                        onChange={(e) => setModalInput(e.target.value)}
                        name="conversations"
                      />
                    </form>
                  </div>
                  <div className="convoTabContainer">
                    {globalConversations
                      .filter((item) => {
                        return modalInput.toLowerCase() === ""
                          ? ""
                          : item.name.toLowerCase().includes(modalInput);
                      })
                      .map((conversation, i) => {
                        return (
                          <span
                            key={i}
                            onClick={() =>
                              setInputConversation(conversation.name)
                            }
                            className="convoTab"
                          >
                            # {conversation.name}
                          </span>
                        );
                      })}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setModalInput("")}
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
        </div>
      </div>
      <div className={listType ? "show-friends" : "hide-friends"}>
        <div className="title-header">
          <h4 style={{ marginLeft: "10px" }}>Friends</h4>
          <IconButton>
            <AddCircleOutlineIcon
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            />
          </IconButton>
        </div>
        <div className="sidebar-chat">
          {friends
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.toLowerCase().includes(search);
            })
            .map((user, i) => {
              return (
                <>
                  <Avatar src={user.image} />
                </>
              );
            })}
        </div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add a Friend
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
                    autoComplete="off"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="modal-body__form"
                  >
                    <input
                      value={modalInput}
                      onChange={(e) => setModalInput(e.target.value)}
                      name="conversations"
                    />
                  </form>
                </div>
                <div className="friendTabContainer">
                  {globalUsers
                    .filter((item) => {
                      return modalInput.toLowerCase() === ""
                        ? ""
                        : item.username.toLowerCase().includes(modalInput);
                    })
                    .map((user, i) => {
                      return (
                        <div
                          onClick={() => addFriend(user)}
                          data-bs-dismiss="modal"
                          className="friend"
                          style={{
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                            padding: "10px",
                          }}
                        >
                          <Avatar src={user.image} />
                          <span>{user.username}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setModalInput("")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default SidebarChat;
