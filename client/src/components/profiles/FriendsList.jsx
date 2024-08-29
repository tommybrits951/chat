import { useState, useContext, useEffect } from "react";
import { Chat } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faEnvelope, faMessage} from "@fortawesome/free-solid-svg-icons"
export default function FriendsList() {
  const [friendsList, setFriendsList] = useState([])
  const [dropdown, setDropdown] = useState({
    open: false,
    num: 0
  })
  const {decoded} = useContext(Chat);

    const dropBtn = (no) => <button onClick={openDropdown} title={no}>&#11206;</button>
    const openBtn = (no) => <button onClick={openDropdown} title={no}>&#11205;</button>
  function openDropdown(e) {
    const {title} = e.target;
    if (dropdown.num !== title){

      setDropdown({
        open: true,
        num: title
      }) 
    } else {
      setDropdown({
        open: false,
        num: 0
      })
      console.log(dropdown)
    }
  }
  function getFriends() {
    
    if (decoded) {
      const {user_id} = decoded
      axios.get(`http://localhost:9000/friends/${user_id}`)
      .then(res => {
        console.log(res.data)
        setFriendsList(res.data)
      })
      .catch(err => {
        console.log(err)
        setErrors([...errors, err])
      })
    }
  }
  useEffect(() => {
    if (decoded) {
      getFriends()
      console.log(friendsList)
    }
  }, [decoded])
  return( <section className="absolute left-0 border-8 border-dashed rounded-lg p-3 border-cyan-200 top-20 w-1/5 h-5/6 bg-cyan-400">
    <ul className="relative w-full">
      {friendsList.length > 0 ? friendsList.map((frnd, idx) => {
        return <li key={idx} title={idx} className="relative w-full bg-cyan-500 text-white border-2 p-3 rounded-xl">
        <div className="flex justify-between">
          <p>
            {frnd.username}
            </p>
            {parseInt(dropdown.num) === Math.abs(idx + 1) ? openBtn(idx + 1) : dropBtn(idx + 1)}
        </div>
            <div className={`${parseInt(dropdown.num) !== parseInt(idx + 1) ? "hidden" : "h-12"} mt-5 flex justify-between`}>
              <Link to={`/pofile/:${frnd.user_id}`} className="hover:scale-110">
                <FontAwesomeIcon icon={faUser} className="text-xl mx-2"/>
                <p className="text-xs">Profile</p>
              </Link>
              <Link to={`/pofile/:${frnd.user_id}`} className="hover:scale-110 text-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl "/>
                <p className="text-xs">Messages</p>
              </Link>
              <Link to={`/pofile/:${frnd.user_id}`} className="hover:scale-110 text-center">
                <FontAwesomeIcon icon={faMessage} className="text-xl mx-1"/>
                <p className="text-xs">Chat</p>
              </Link>
            </div>
            </li>
      }) 
      : null}
    </ul>
  </section>)
}
