import { useState, useEffect } from 'react'
import axios from 'axios'
export default function useUser({ auth }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth ? axios.get("http://localhost:9000/auth/user", {
            withCredentials: true,
            baseURL: "http://localhost:9000",
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
            : null
    }, [auth])
    useEffect(() => {
        auth ? axios.get("http://localhost:9000/auth/user", {
            withCredentials: true,
            baseURL: "http://localhost:9000",
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
            : null
    }, [])
    return [user, setUser]
}
