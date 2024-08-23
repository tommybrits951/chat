import axios from 'axios'
import {jwtDecode} from "jwt-decode"
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Layout from "./components/user/Layout";
import Home from './components/pages/Home';
import Profile from './components/user/Profile';
export const Chat = createContext();

function App() {
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState()
  const [usernames, setUsernames] = useState(null)


  
  function assignToken(token) {
    setToken(token);
  }

  useEffect(() => {
    axios.get("http://localhost:9000/auth", {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setToken(res.data)
      setDecoded(jwtDecode(res.data))
    })
    .catch(err => {
      if (err.status === 401) {
        setToken("")
      }
    })
  }, [token])


  useEffect(() => {
    axios.get("http://localhost:9000/users", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      setUsernames(res.data)
    })
    .catch(err => console.log(err))
      
  }, [token])

  useEffect(() => {
    
  }, [token])
  return (
    <div className="absolute h-full w-full bg-stone-700">
      <Chat.Provider
        value={{
          assignToken,
          token,
          decoded
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="/:subject" element={<Profile />} />
          </Route>
        </Routes>
      </Chat.Provider>
    </div>
  );
}

export default App;
