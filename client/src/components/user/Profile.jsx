import {useContext, useEffect,} from 'react'
import { Chat } from '../../App'
import axios from 'axios'

export default function Profile() {
    const {decoded} = useContext(Chat)


    function getUser() {
        if (decoded !== null) {
axios.get(`http://localhost:9000/users/${decoded.email}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
        } 
    }
    useEffect(() => {
        
        getUser()        
    }, [])

    return (
    <div>
      
    </div>
  )
}
