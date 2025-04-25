import { createContext } from "react";
import useChats from "../hooks/useChats";

const ChatContext = createContext({})

export function ChatProvider({ children }) {
    const [chats] = useChats()
    const 
    return (
        <ChatContext.Provider value={{ chats }} >
            {children}
        </ChatContext.Provider>
    )
}
export default ChatContext