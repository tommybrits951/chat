import { useEffect, useState } from 'react'
import axios from "../api/axios"
import useAuth from './useAuth'
export default function useChats() {
    const [chats, setChats] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        axios.get(`/message/`, {
            headers: {
                Authorization: `Bearer ${auth?.accessToken}`
            }
        })
            .then(res => {
                console.log(res.data)
                setChats(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return [chats, setChats]
}
