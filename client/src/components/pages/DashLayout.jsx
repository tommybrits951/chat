import { Outlet } from "react-router-dom"
import FriendsList from "../profiles/FriendsList"
import Nav from "../nav/Nav"
export default function DashLayout() {
  return (
    <>
    <Nav />
    <div>

    <Outlet />
    </div>
    <FriendsList />
    </>
)
}
