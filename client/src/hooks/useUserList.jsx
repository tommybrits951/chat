import {useState, useEffect} from 'react'
import axios from '../api/axios'
export default function useUserList({user, auth}) {
    const [userList, setUserList] = useState(null)

    useEffect(() => {
        user ? axios.get('/users', {
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
    }, [user])
    return [userList, setUserList]
}
