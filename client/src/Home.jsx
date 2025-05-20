import { useContext, useEffect } from 'react'

import { Route, Routes, Link, useNavigate } from 'react-router'
import ChatContext from './context/ChatContext'
import Layout from './components/layouts/Layout'
import Login from './components/auth/Login'
import Users from './components/user/Users'
import Register from './components/user/Register'

import PhotoUpload from './components/user/photo/PhotoUpload'
export default function Home() {
    const { auth, regData } = useContext(ChatContext)
    const navigate = useNavigate()


    return (
        <>
            {auth === null
                ? <Routes>
                    <Route element={<Login />} path='/' />
                    <Route element={<Register />} path='register' />
                    <Route element={<PhotoUpload />} path='photo' />
                </Routes>
                :
                <Routes>
                    <Route element={<Layout />}>
                        <Route element={<Users />} index/>
                    </Route>
                </Routes>
            }
        </>
    )
}
