import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Chat } from "../../App";
const initForm = {
    email: "",
    password: ""
}
export default function Login() {
    const [formData, setFormData] = useState(initForm)
    const [err, setErr] = useState("")
    function change(e) {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const {assignToken} = useContext(Chat)
    const navigate = useNavigate()

    async function submit(e) {
        e.preventDefault()
        axios.post("http://localhost:9000/auth", formData, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => {
            setErr("")
            assignToken(res.data)
            setFormData(initForm)
            navigate("/")
        })
        .catch(err => {
            console.log(err.message)
            setErr(err?.data?.message)
    })
    }
    return (
    <section className="pt-10 text-center">
      <h2 className="text-white text-4xl underline mb-10">Login User</h2>
      <p className="text-red-500 text-lg">{err}</p>
      <form onSubmit={submit} className="w-1/2 left-1/4 relative">
        <label className="text-white text-xl" htmlFor="email">Email: </label>
        <br />
        <input
            className="p-1 rounded w-full my-5" 
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={change}
            required
        />
        <br />
        <label className="text-white text-xl" htmlFor="password">Password: </label>
        <br />
        <input
            className="p-1 rounded w-full my-5" 
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={change}
            required
        />
        <br />
        <button className="text-white text-lg bg-cyan-500 p-2 rounded-lg shadow-2xl hover:scale-95">Submit</button>
      </form>
    </section>
  )
}
