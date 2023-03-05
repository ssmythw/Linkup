import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "../styles/chat.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../features/userSlice";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  const state = useSelector((state) => state);
  const conversation = state.conversation.conversation;
  const user = state.user;
  const userId = Cookies.get("user_id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket !== null) {
      socket.on("receive-message", (message) => {
        if (user.conversations.includes(message.conversation)) {
          setMessages([...messages, message]);
        }
      });
    }
  }, []);

  useEffect(() => {
    //check if user exists in db
    //if user exists then populate the user state with that user
    fetch(`http://localhost:8080/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          setUser({
            username: data.username,
            email: data.email,
            image: data.image,
          })
        );
      });
  });

  useEffect(() => {
    // get all the messages for the current conversation
    fetch("http://localhost:8080/messages", {
      method: "POST",
      body: JSON.stringify({
        conversation,
      }),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
      });
  }, [conversation]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <MessageForm
          messages={messages}
          setMessages={setMessages}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Chat;
