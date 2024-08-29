import { Link } from "react-router-dom"
import {faHome} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
export default function Nav() {
  return (
    <header className="fixed top-0 left-0 w-full bg-stone-800 h-12 z-10 flex text-white p-2 justify-around">
      <Link to="/" className="hover:scale-110">
      <FontAwesomeIcon icon={faHome} />
      </Link>
    </header>
  )
}
