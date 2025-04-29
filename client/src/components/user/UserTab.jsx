import { Link } from 'react-router-dom'
import userIcon from "../../assets/user.png"
export default function UserTab({ user }) {

    return (
        <div className="border-2">

            {user
                ?
                <div className="p-3 grid grid-cols-2 grid-rows-2 w-1/2 m-0">
                    <div className="text-left">
                        <div className="h-12 w-12 rounded-xl bg-white">

                            <img className="" src={`http://localhost:9000/image/${user.profilePic}`} />
                        </div>
                        <h4 className="text-white text-lg">{user.firstName}<br />{user.lastName}</h4>
                    </div>
                    <div className="text-left">
                        <p className="text-black text-left">Email: <span className="text-white">{user.email}</span></p>
                        <p className="text-black">Postal: <span className="text-white">{user.postal}</span></p>
                    </div>
                    <div>

                        <Link to={`/user/${user._id}`}>
                            <img src={userIcon} />
                        </Link>
                    </div>
                </div>
                :
                <p>Loading</p>
            }
        </div>
    )
}
