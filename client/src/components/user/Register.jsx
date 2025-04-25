import { useState, useContext } from 'react'
import axios from '../../api/axios'
const initForm = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: ""
}

export default function Register() {
    const [formData, setFormData] = useState(initForm)
    const [img, setImg] = useState()

    function change(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    function clear(e) {
        e.preventDefault()
        setFormData(initForm)
        setImg("")
    }
    function submit(e) {
        e.preventDefault()
        let pkg = new FormData()
        Object.keys(formData).map(key => {
            pkg.append(`${key}`, formData[key])
        })
        pkg.append("img", img)
        console.log(pkg)
        axios.post(`/users`, pkg)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    function changeImg(e) {
        console.log(e.target.files[0])
        setImg(e.target.files[0])
    }
    return (
        <section className='absolute w-1/2 left-1/4 top-32 bg-slate-700 font-serif  rounded-xl p-5'>
            <h2 className='text-white text-3xl text-center font-bold'>New User</h2>
            <form onSubmit={submit} encType='multipart/form-data' className='flex flex-col text-center'>
                <label className='text-white text-lg'>First Name
                    <br />
                    <input placeholder='First Name' autoComplete='off' className='bg-white rounded p-1 text-black w-3/4' type='text' name="firstName" value={formData.firstName} onChange={change} required />
                </label>
                <label className='text-white text-lg'>Last Name
                    <br />
                    <input placeholder='Last Name' autoComplete='off' className='bg-white rounded p-1 text-black w-3/4' type='text' name="lastName" value={formData.lastName} onChange={change} required />
                </label>
                <label className='text-white text-lg'>Date of Birth
                    <br />
                    <input placeholder='Date Of Birth' autoComplete='off' className='bg-white rounded p-1 text-black w-3/4' type='date' name="dob" value={formData.dob} onChange={change} required />
                </label>
                <label className='text-white text-lg'>Date of Birth
                    <br />
                    <input placeholder='Postal/Zip Code' autoComplete='off' className='bg-white rounded p-1 text-black w-3/4' type='number' name="postal" value={formData.postal} onChange={change} required />
                </label>
                <label className='text-white text-lg'>Email
                    <br />
                    <input placeholder='Email' autoComplete='off' className='bg-white rounded p-1 text-black w-3/4' type='email' name="email" value={formData.email} onChange={change} required />
                </label>
                <label className='text-white text-lg'>Password
                    <br />
                    <input placeholder='Password' autoComplete='off' className='bg-white rounded p-1 text-black w-3/4' type='password' name="password" value={formData.password} onChange={change} required />
                </label>
                <label className='text-white text-lg'>Profile Pic
                    <br />
                    <input placeholder='Profile Image' autoComplete='off' accept='image/*' className='bg-white rounded p-1 text-black w-2/4' type='file' name="img" onChange={changeImg} />
                </label>
                <div className='flex justify-around mt-5'>
                    <button className='text-white border-0 p-2 hover:scale-95 cursor-pointer text-lg rounded outline-0 bg-gray-600' onClick={clear}>Clear</button>
                    <button className='text-white border-0 p-2 hover:scale-95 cursor-pointer text-lg rounded outline-0 bg-lime-600'>Submit</button>
                </div>
            </form>
        </section>
    )
}
