import { Outlet } from "react-router"
import Navbar from "../navigation/Navbar"

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
