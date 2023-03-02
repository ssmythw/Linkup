import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "../styles/chat.css";
import { useState } from "react";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const conversationState = useSelector((state) => state.conversation);
  const conversation = conversationState.conversation;

  //get all the messages for the current conversation

  useEffect(() => {
    fetch("http://localhost:8080/messages/sync", {
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
      .then((messages) => messages.json())
      .then((data) => {
        setMessages(data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("8897d49bca636ec4a9cd", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <MessageForm messages={messages} />
      </div>
    </div>
  );
};

export default Chat;
