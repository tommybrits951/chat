import { Chat } from "../../App";
import { useContext } from "react";
import Login from "../user/Login";

export default function Home() {
    const {token} = useContext(Chat)

    
    const content = token === null ? <Login /> : <h2>Welcome</h2>
    return content
}