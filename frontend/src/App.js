import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const userId = Cookies.get("user_id");
  const dispatch = useDispatch();

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

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
