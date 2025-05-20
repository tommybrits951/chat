import { useState, useContext } from 'react'
import RegisterForm from './RegisterForm'
import { Link, useNavigate } from 'react-router'
import ChatContext from '../../context/ChatContext'
import axios from '../../api/axios'
import PhotoUpload from './photo/PhotoUpload'
const initForm = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    postal: ""
}

export default function Register() {
    const [formData, setFormData] = useState(initForm)
    const [err, setErr] = useState("")

    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    // Page change

    function changePage(e) {
        const { value } = e.target
        Object.keys(formData).map(key => {
            if (formData[key] === "") {
                setErr("All fields required!")
            }
        })
        if (value === "Next" && parseInt(page) === 1) {
            setPage(2)
        } else if (value === "Back" && parseInt(page) === 2) {
            setPage(1)
        }
    }
    //  Form functions
    function change(name, value) {

        setFormData({ ...formData, [name]: value })
    }
    function clear(e) {
        e.preventDefault()
        setFormData(initForm)
    }




    const content = parseInt(page) === 1 ? (
        <RegisterForm change={change} changePage={changePage} err={err} clear={clear} formData={formData} />
    ) : (
        <PhotoUpload
            changePage={changePage}
            formData={formData}
        />
    )
    return content
}
