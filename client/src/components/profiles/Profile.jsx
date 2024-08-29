import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
export default function Profile() {
    const {user_id} = useParams()
    const [user, setUser] = useState(null)
    function getUser(id) {
        axios.get(`http://localhost:9000/users/${id}`)
        .then(res => {
            console.log(res.data)
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getUser(user_id)
        console.log(user)
    }, [])
    return (
    <section>
        {user !== null ? 
        <div>
            <img src={`http://localhost:9000/images/${user.pic}`} className="absolute left-1/4 ms-5 top-12 rounded-lg h-1/4" />
            <h2 className="absolute mt-32 ms-2 left-1/2 text-4xl text-white">username: {user.username}</h2>
        </div>
        : null}
    </section>
  );
}
