import { useContext } from 'react'
import ChatContext from '../../context/ChatProvider'
export default function Chats() {
    const { chats } = useContext(ChatContext)
    return (
        <div>Chats</div>
    )
}
