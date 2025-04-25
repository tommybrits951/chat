import { useContext, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import AuthContext from './context/AuthProvider'
import Chats from "./components/layouts/Chats"
import Login from './components/auth/Login'
import Register from './components/user/Register'
export default function Home() {
    const { auth } = useContext(AuthContext)

    return (
        <>
            {auth !== null
                ? <Routes>
                    <Route element={<Chats />} path='/' />
                    <Route element={<Register />} path='/register' />
                </Routes>
                :
                <Routes>
                    <Route element={<Login />} path='/' />
                </Routes>
            }
        </>
    )
}
