import './App.css'
import { useEffect, useContext, useState } from 'react'
import Home from './Home'
import ChatContext from './context/ChatContext'
import axios from 'axios'
import useUser from './hooks/useUser'


function App() {
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useUser({ auth })
  const [chats, setChats] = useState([])
  const [userList, setUserList] = useState([])

  useEffect(() => {
    auth === null ? axios.get("http://localhost:9000/auth", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
      .then(res => {
        setAuth(res.data.accessToken)
      })
      .catch(err => {
        null
      }) : null
  }, [])
  useEffect(() => {
    console.log(user)
  }, [])
  useEffect(() => {
    auth ? axios.get("http://localhost:9000/users", {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
      .then(res => {
        console.log(res.data)
        setUserList(res.data)
      })
      .catch(err => console.log(err))
      : null
  }, [auth])
  useEffect(() => {
    auth ? axios.get(`http://localhost:9000/message`, {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
      .then(res => {
        console.log(res.data)
        setChats(res.data)
      })
      .catch(err => {
        console.log(err)
      }) : null
  }, [auth])
  return (
    <main className='absolute w-full h-full bg-sky-200'>
      <ChatContext.Provider value={{ auth, setAuth, user, setUser, chats, setChats, userList, setUserList }}>
        <Home />
      </ChatContext.Provider>
    </main>
  )
}

export default App
