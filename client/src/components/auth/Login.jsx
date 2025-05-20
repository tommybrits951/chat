import { useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import ChatContext from '../../context/ChatContext'
const initForm = {
  email: "",
  password: ""
}

export default function Login() {
  const [formData, setFormData] = useState(initForm)
  const [err, setErr] = useState("")
  const { setAuth } = useContext(ChatContext)
  

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
      
  }
  return (
    <section className='absolute w-full md:w-1/2  md:left-1/4 top-20  '>
      <h2 className='text-center text-3xl text-sky-900 font-bold font-sans m-3'>Login</h2>
      <p className='text-red-600 text-center text-lg'>{err}</p>
      <form encType='multipart/form-data' onSubmit={submit} className='rounded-xl md:bg-sky-400 p-2 text-center pt-5'>
        <label className='text-white font-bold'>
          Email
          <br />
          <input className='bg-white rounded p-1 my-2 shadow-2xl' type='email' name='email' value={formData.email} onChange={change} autoComplete='off' placeholder='Email' required />
        </label>
        <br />
        <label className='text-white font-bold'>
          Password
          <br />
          <input className='bg-white rounded p-1 my-2 shadow-2xl' type='password' name='password' value={formData.password} onChange={change} autoComplete='off' placeholder='Password' required />
        </label>
        <div className='text-center p-5'>
          <button className='rounded shadow-2xl p-2 text-lg text-white bg-sky-800 cursor-pointer hover:scale-95'>Submit</button>
        </div>
      </form>
      <div className='flex justify-center'>
        <Link className=' text-white underline text-center' to={'register'}>Create New Profile</Link>
      </div>
    </section>
  )
}
