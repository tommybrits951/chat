
import './App.css'
import { useEffect, useContext } from 'react'
import Home from './Home'
import AuthContext from './context/AuthProvider'
import { ChatProvider } from "./context/ChatProvider"
import axios from 'axios'


function App() {

  const { setAuth, auth } = useContext(AuthContext)


  useEffect(() => {
    auth === null ? axios.get("http://localhost:9000/auth", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
      .then(res => {
        setAuth(res.data.accessToken)
      })
      .catch(err => console.log(err)) : null
  }, [])
  return (
    <main className='absolute w-full h-full bg-sky-200'>
      <ChatProvider>
        <Home />
      </ChatProvider>
    </main>
  )
}

export default App
