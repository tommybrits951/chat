import {useState, useContext, useEffect} from 'react'
import ChatContext from '../../context/ChatContext'
import { useParams } from 'react-router'
import axios from "../../api/axios"
export default function Board() {
    const [posts, setPosts] = useState()
    const [err, setErr] = useState("")
    const {_id} = useParams()
    const {auth} = useContext(ChatContext)

    useEffect(() => {
        axios.get(`/post/${_id}`, {headers: {
            Authorization: `Bearer ${auth}`
        }})
        .then(res => {
            console.log(res.data)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

  return (
    <div>Board</div>
  )
}
