import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const initForm = {
  username: "",
  email: "",
  password: "",
};
export default function Register() {
  const [formData, setFormData] = useState(initForm);
  const [img, setImg] = useState(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate()

  function change(e) {
    setErr("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function imgChange(e) {
    console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }

  async function submit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("img", img);
    axios
      .post("http://localhost:9000/users", data)
      .then((res) => {
        console.log(res.data);
        navigate("/")
      })
      .catch((err) => setErr(err.data?.message));
  }


  const content = (
    <section className="absolute w-1/2 left-1/4 mt-10 rounded-xl">
      <h2 className="text-center text-4xl my-10 underline text-white font-bold font-mono">Register New User</h2>
      <p className="text-red-500 tex-lg text-center">{err}</p>
      <form onSubmit={submit} encType="multipart/form-data" className="w-full p-5 rounded-xl">
        <label className="text-xl text-white my-5" htmlFor="email">Email: </label>
        <input
          className="rounded w-full text-lg p-1"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={change}
          required
        />
        <br />
        <label className="text-xl text-white my-5" htmlFor="username">Username: </label>
        <input
          className="rounded w-full text-lg p-1"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={change}
          required
        />
        <br />
        <label className="text-xl text-white my-5" htmlFor="password">Password: </label>
        <input
          className="rounded w-full text-lg p-1"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={change}
          required
        />
        <br />
        <label className="text-xl text-white my-5" htmlFor="img">Profile Image: </label>
        <input className="rounded w-full text-lg p-1" type="file" name="img" id="img" onChange={imgChange} />
        <br />
        <button className="bg-cyan-500 text-white p-2 rounded-lg mt-5 w-full">Register</button>
      </form>
    </section>

  );
  return content;
}