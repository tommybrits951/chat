import React from 'react'
import { Link } from 'react-router'
export default function RegisterForm({ err, formData, change, clear, changePage }) {
    function changeHandler(e) {
        const { name, value } = e.target
        change(name, value)
    }
    function clearHandler(e) {
        clear(e)
    }
    function pageHandler(e) {
        e.preventDefault()
        changePage(e)
    }
    return (
        <section className='absolute w-full md:w-1/2 md:left-1/4 top-20 font-serif  rounded-xl p-5'>
            <h2 className='text-sky-900 font-sans text-3xl text-center font-bold mb-2'>Register New User</h2>
            <p className='text-red-600 font-bold text-center text-xl'>{err}</p>
            <form onSubmit={(e) => e.preventDefault()} encType='multipart/form-data' className='flex flex-col justify-center text-center'>
                <label className='text-white md:text-left text-lg'>First Name
                    <br />
                    <input placeholder='First Name' autoComplete='off' className='bg-white my-2 shadow-2xl rounded p-1 text-black w-full' type='text' name="firstName" value={formData.firstName} onChange={changeHandler} required />
                </label>
                <label className='text-white md:mx-1/4 md:text-left text-lg'>Last Name
                    <br />
                    <input placeholder='Last Name' autoComplete='off' className='bg-white my-2 shadow-2xl rounded p-1 text-black w-full' type='text' name="lastName" value={formData.lastName} onChange={changeHandler} required />
                </label>
                <label className='text-white md:mx-1/4 md:text-left text-lg'>Date of Birth
                    <br />
                    <input placeholder='Date Of Birth' autoComplete='off' className='bg-white my-2 shadow-2xl rounded p-1 text-black w-full' type='date' name="dob" value={formData.dob} onChange={changeHandler} required />
                </label>
                <label className='text-white md:mx-1/4 md:text-left text-lg'>Postal/Zip Code
                    <br />
                    <input placeholder='Postal/Zip Code' autoComplete='off' className='bg-white my-2 shadow-2xl rounded p-1 text-black w-full' type='number' name="postal" value={formData.postal} onChange={changeHandler} required />
                </label>
                <label className='text-white md:mx-1/4 md:text-left text-lg'>Email
                    <br />
                    <input placeholder='Email' autoComplete='off' className='bg-white my-2 shadow-2xl rounded p-1 text-black w-full' type='email' name="email" value={formData.email} onChange={changeHandler} required />
                </label>
                <label className='text-white md:mx-1/4 md:text-left text-lg'>Password
                    <br />
                    <input placeholder='Password' autoComplete='off' className='bg-white my-2 shadow-2xl rounded p-1 text-black w-full' type='password' name="password" value={formData.password} onChange={changeHandler} required />
                </label>
                <div className='flex md:col-start-1 md:col-end-3 md:justify-between justify-around mt-5'>
                    <Link to={"/"} className='shadow-2xl text-white border-0 p-2 hover:scale-95 cursor-pointer text-lg rounded outline-0 bg-gray-600'>Cancel</Link>
                    <button className='shadow-2xl text-white border-0 p-2 hover:scale-95 cursor-pointer text-lg rounded outline-0 bg-gray-600' onClick={clearHandler}>Clear</button>
                    <button className='shadow-2xl text-white border-0 p-2 hover:scale-95 cursor-pointer text-lg rounded outline-0 bg-lime-600' value={'Next'} onClick={pageHandler}>Next</button>
                </div>
            </form>
        </section>

    )
}
