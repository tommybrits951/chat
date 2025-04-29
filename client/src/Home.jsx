import { useContext, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import ChatContext from './context/ChatContext'
import Layout from './components/layouts/Layout'
import Login from './components/auth/Login'
import Users from './components/user/Users'
import Register from './components/user/Register'
export default function Home() {
    const { auth } = useContext(ChatContext)

    return (
        <>
            {auth === null
                ? <Routes>

                    <Route element={<Login />} path='/' />
                    <Route element={<Register />} path='/register' />

                </Routes>
                :
                <Routes>
                    <Route element={<Layout />}>
                        <Route element={<Users />} index />
                    </Route>
                </Routes>
            }
        </>
    )
}
