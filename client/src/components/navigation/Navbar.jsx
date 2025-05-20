import { useContext } from 'react'
import menu from "../../assets/menu-burger.png"
import ChatContext from '../../context/ChatContext'
import axios from '../../api/axios'
import { Link } from 'react-router'

import { useNavigate } from 'react-router'
export default function Navbar() {
    const { menuOpen, openMenu } = useContext(ChatContext)
    const navigate = useNavigate()
    async function logout() {
        axios.get("http://localhost:9000")
    }
    return (
        <header className='navbar shadow-2xl flex bg-sky-950'>
            <div className='relative'>

                <button name='menu' onClick={openMenu} className='h-8 m-2 hover:'>
                    <img src={menu} className='relative h-full' onClick={openMenu} name="menu" />
                </button>
                <div className={`absolute p-2 h-36 w-24 rounded shadow-2xl bg-sky-800 ${menuOpen ? "flex flex-col" : "hidden"}`}>
                    <Link to={"/"} className='text-white text-xl cursor-pointer hover:scale-95'>Home</Link>
                    
                </div>
            </div>
            <h2 className='mx-24 mt-1 text-2xl text-white font-bold'>Chat</h2>
        </header>
    )
}
