import { Icon, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/message-form.css";
import EmojiPicker from "emoji-picker-react";
import PeopleIcon from "@material-ui/icons/People";

const MessageForm = ({ messages, setMessages, socket }) => {
  const [input, setInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const state = useSelector((state) => state);
  const conversation = state.conversation;
  const user = state.user;

  const onEmojiClick = (emojiClickData, mouseEvent) => {
    setInput(input + emojiClickData.emoji);
    setShowPicker(false);
  };

  String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  useEffect(() => {
    const body = document.getElementById("chat__body");
    body.scrollTop = body.scrollHeight;
  }, [messages, conversation]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    fetch("http://localhost:8080/messages/create", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        message: input,
        conversation: conversation.conversation,
        timestamp:
          new Date().toLocaleTimeString() +
          " " +
          new Date().toLocaleDateString(),
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((message) => {
        socket.emit("send-message", message);
        setMessages([...messages, message]);
        setInput("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="chat">
        <div className="chat__header">
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
          <div className="chat__header-info">
            <h3>{state.conversation.conversation.capitalizeFirstLetter()}</h3>
          </div>
        </div>
        <div className="chat__body" id="chat__body">
          {messages?.map((message, i) => {
            return (
              <p
                key={i}
                className={`chat__message ${
                  message.username === user.username ? "message__sent" : ""
                }`}
              >
                <span key={i + 1} className="chat__name">
                  {message.username}
                </span>
                {message.message}
                <span key={i + 2} className="chat__timestamp">
                  {message.timestamp}
                </span>
              </p>
            );
          })}
        </div>
        <div className="chat__footer">
          {showPicker && (
            <div style={{ transform: "translateY(-200px)" }}>
              <EmojiPicker
                emojiStyle="native"
                onEmojiClick={onEmojiClick}
              ></EmojiPicker>
            </div>
          )}

          <IconButton onClick={() => setShowPicker((val) => !val)}>
            <InsertEmoticonIcon
              style={{ marginLeft: "10px", marginRight: "10px" }}
            />{" "}
          </IconButton>

          <form onSubmit={sendMessage}>
            <input
              id="messageInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button
              id="sendMessage"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                backgroundColor: "white",
                border: "none",
              }}
              type="submit"
            >
              Send a message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageForm;
