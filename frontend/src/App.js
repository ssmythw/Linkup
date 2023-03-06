import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import VideoChat from "./pages/VideoChat";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/chat" element={<Chat socket={socket} />} />
          <Route exact path="/video-chat" element={<VideoChat />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" component={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
