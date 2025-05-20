import axios from 'axios'
import { useParams } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import ChatContext from "../../context/ChatContext"
export default function Profile() {
    const [profile, setProfile] = useState(null)
    const { _id } = useParams()
    const { user, auth } = useContext(ChatContext)
    useEffect(() => {
        axios.get(`http://localhost:9000/users/${_id}`, {
            withCredentials: true,
            baseURL: "http://localhost:9000",
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
            .then(res => {
                console.log(res.data)
                setProfile(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const content = (
        <section>

        </section>
    )

}
