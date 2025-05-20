import { useContext, useEffect, useState } from 'react'
import ChatContext from '../../context/ChatContext'
import UserTab from './UserTab'
import searchIcon from "../../assets/search.png"
import axios from '../../api/axios'
export default function Users() {
    const { userList, user, setUser, auth } = useContext(ChatContext)
    const [list, setList] = useState([])
    
    const [formData, setFormData] = useState("")

    function change(e) {
        const { value } = e.target
        setFormData(value)
    }

    
    function search(e) {
        e.preventDefault()
        const value = formData
        setFormData("")
        console.log(value)
        let arr = []
        userList.map(itm => {
            if (itm.firstName.toLowerCase().includes(value.toLowerCase()) || itm.lastName.toLowerCase().includes(value.toLowerCase()) || itm.email.toLowerCase().includes(value.toLowerCase())) {
                console.log(itm.firstName)
                arr = [...arr, itm]
            }
        })
        setList(arr)
    }


    function addFriend(id) {
        axios.post(`/users/add`, {person: id}, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        .then(res => {
            console.log(res.data)
            setUser(res.data)
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {
        userList ? setList(userList) : null

    }, [userList])
    

    return (
        <div className='mt-16 text-center'>
            <form className='flex justify-center' onSubmit={search}>
                <input className='bg-white p-1' type='text' name='search' onChange={change} placeholder='Search users by email or name...' />
                <button className='relative h-10 hover:scale-95 cursor-pointer p-0.5'>
                <img className='relative h-full bg-gray-500 text-white p-1' src={searchIcon} />
                </button>
            </form>
            <ul className='absolute h-9/12 border-2 rounded-lg top-2/12 overflow-x-hidden overflow-y-scroll w-full md:w-1/2 md:left-1/4 '>
                {user ? list.map((person, idx) => {
                    return person._id !== user._id ? (
                        <li className='p-0 m-0' key={idx}>
                            <UserTab person={person} addFriend={addFriend} />
                        </li>
                    ) : null
                }) : null}
            </ul>
        </div >
    )
}
