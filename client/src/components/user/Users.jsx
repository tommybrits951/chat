import { useContext } from 'react'
import ChatContext from '../../context/ChatContext'
import UserTab from './UserTab'
export default function Users() {
    const { userList } = useContext(ChatContext)
    return (
        <ul className='bg-sky-700 w-1/2 justify-self-center h-5/6 mt-25 p-0 overflow-y-scroll scroll rounded-lg'>
            {userList.map((person, idx) => {
                return (
                    <li className='p-0 m-0' key={idx}>
                        <UserTab user={person} />
                    </li>
                )
            })}
        </ul>
    )
}
