import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Layout from "./components/user/Layout";
import DashLayout from "./components/pages/DashLayout";

import Profile from "./components/profiles/Profile";
export const Chat = createContext();

function App() {
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState();
  const [userList, setUserList] = useState(null);

  function assignToken(token) {
    setToken(token);
  }
  function checkToken() {
    const {username, email, user_id} = jwtDecode(token)
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].username === username && userList[i].email === email && user_id === userList[i].user_id) {
        return true;
      }
    }
    return false
  }


  useEffect(() => {
   axios
      .get("http://localhost:9000/auth", {
        withCredentials: true,
        baseURL: "http://localhost:9000"
      })
      .then((res) => {
   setToken(res.data);
   setDecoded(jwtDecode(res.data));
      console.log(res.data)  
      })
      .catch((err) => {
        if (err.status === 401) {
          setToken("");
        }
      })
      
    }, [])
    useEffect(() => {
      axios
      .get("http://localhost:9000/users", {
        withCredentials: true,
        baseURL: "http://localhost:9000",
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
    }, [token]);//
    /* useEffect(() => {
     
     axios.get("http://localhost:9000/auth", {
       withCredentials: true,
       baseURL: "http:localhost:9000"
     })
     .then(res => {
       console.log(res.data)
       setToken(res.data)
       setDecoded(jwtDecode(res.data))
     })
   }, [])  */
    return (
    <div className="absolute h-full w-full bg-stone-700">
      <Chat.Provider
        value={{
          assignToken,
          token,
          userList,
          decoded,
        }}
      >
        
        <Routes>
   {checkToken === true ? <Route path="/" element={<DashLayout />}>

            
          </Route> 
          : 
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          }
        </Routes>
      </Chat.Provider>
    </div>
  );
}

export default App;
