import './App.css'
import { useEffect, useContext, useState } from 'react'
import Home from './Home'
import ChatContext from './context/ChatContext'
import axios from './api/axios'
import useUser from './hooks/useUser'
import useMenu from './hooks/useMenu'
import useUserList from './hooks/useUserList'

import { io } from 'socket.io-client'
import useBoards from './hooks/useBoards'


function App() {
  const socket = io("http://localhost:9000")
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useUser({ auth })
  const [boards, setBoards] = useBoards()
  const [userList, setUserList] = useUserList({user, auth})
  const [regData, setRegData] = useState(null)
  const [menuOpen, openMenu] = useMenu()
  
  
  


  useEffect(() => {
    socket.connect()
    function onConnect() {
      setIsConnected(true)
    }
    function onDisconnect() {
      setIsConnected(false)
    }
function onFooEvent(value) {
setFooEvent(previous => [...previous, value])
}
socket.on('connect', onConnect)
socket.on("disconnect", onDisconnect)
socket.on("foo", onFooEvent)
return () => {
  socket.off('connect', onConnect)
  socket.off("disconnect", onDisconnect)
  socket.off("foo", onFooEvent)
  socket.disconnect()
}
  }, [])

    
  useEffect(() => {
    auth === null ? axios.get("/auth")
      .then(res => {
        setAuth(res.data.accessToken)
      })
      .catch(err => {
        null
      }) : null
  }, [])
  


  useEffect(() => {  
    user ? axios.get(`http://localhost:9000/message/${user._id}`, {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
      .then(res => {
        setChats(res.data)
      })
      .catch(err => {
        console.log(err)
      }) : null
  }, [user, auth])
  return (
    <main className='absolute w-full h-full bg-stone-300 p-0 overflow-hidden' onClick={openMenu}>
      <ChatContext.Provider value={{ auth, setAuth, boards, setBoards, regData, setRegData, user, setUser, chats, setChats, userList, setUserList, menuOpen, openMenu }}>
        <Home />
      </ChatContext.Provider>
    </main>
  )
}

export default App
