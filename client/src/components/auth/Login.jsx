import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ChatContext from '../../context/ChatContext'
const initForm = {
  email: "",
  password: ""
}

export default function Login() {
  const [formData, setFormData] = useState(initForm)
  const [err, setErr] = useState("")
  const { auth, setAuth } = useContext(ChatContext)
  const navigate = useNavigate()

  function change(e) {
    setErr("")
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  function submit(e) {
    e.preventDefault()
    const pkg = new FormData()
    Object.keys(formData).map(key => {
      pkg.append(key, formData[key])
    })
    axios.post("http://localhost:9000/auth", pkg, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
      .then(res => {
        setAuth(res.data.accessToken)
      })
      .catch(err => {
        console.log(err)
        setErr(err?.response?.data?.message)
      })
      .finally(() => {
        console.log(auth)
      })
  }
  return (
    <section className='absolute w-1/2 left-1/4 top-20 shadow-2xl rounded bg-sky-400'>
      <h2 className='text-center text-3xl underline font-mono m-3'>Login</h2>
      <p className='text-red-600 text-center text-lg'>{err}</p>
      <form encType='multipart/form-data' onSubmit={submit} className='rounded bg-sky-300 p-2 text-center pt-5'>

        <input className='bg-white p-1 my-2' type='email' name='email' value={formData.email} onChange={change} autoComplete='off' placeholder='Email' required />
        <br />
        <input className='bg-white p-1 my-2' type='password' name='password' value={formData.password} onChange={change} autoComplete='off' placeholder='Password' required />
        <div className='text-center p-5'>
          <button className='rounded shadow-2xl p-2 text-lg text-white bg-sky-800 cursor-pointer hover:scale-95'>Submit</button>
        </div>
      </form>
    </section>
  )
}
