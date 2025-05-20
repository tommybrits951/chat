import { useContext, useState, useEffect } from 'react'
import ChatContext from '../../context/ChatContext'
import { Link, useNavigate } from 'react-router'
import profileIcon from "../../assets/file-user.png"
import chatIcon from "../../assets/edit-message.png"
import addIcon from "../../assets/follow.png"
import axios from '../../api/axios'


export default function UserTab({ person, addFriend }) {
    const { auth, user, setUser } = useContext(ChatContext)
    
    async function requestFriend() {
        addFriend(person._id)    
    }
    
    
    return (
        <div className="bg-white rounded grid grid-cols-12 grid-rows-12 border-b-2 h-30 w-full m-0">

            <div className="col-start-1 h-20 w-20 m-2 col-end-4 row-start-1 row-end-12 rounded-xl bg-white overflow-hidden">
                
                <img className="w-full" src={person.profilePic} />
            </div>


            <div className="text-center col-start-4 col-end-12 row-start-1 row-end-4 mt-2">
                <span className='text-xl whitespace-nowrap'>{person.firstName} {person.lastName}</span>
            </div>


            <div className='relative flex justify-between col-start-7 col-end-12 row-start-9 row-end-13 mb-4 '>
            
                
            
                    <Link to={`/chat/${person._id}`} className='cursor-pointer hover:scale-95'>
                        <img src={chatIcon} className='h-full' />
                    </Link>
            
                    <Link to={`/user/${person._id}`} className='cursor-pointer hover:scale-95'>
                        <img src={profileIcon} className='h-full' />
                    </Link>
            
                    {!user.contacts.includes(person._id) ?
                    
                    <button className='hover:scale-95 cursor-pointer' onClick={requestFriend}>

                        <img src={addIcon} className='h-full' />
                    </button>
                    : <p>Friend</p>
                    }
                
            
            </div>
        </div>
    )
}
