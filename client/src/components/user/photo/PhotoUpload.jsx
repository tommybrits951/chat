import { useState } from 'react'
import axios from '../../../api/axios'
import Cropper from 'react-easy-crop'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'



export default function PhotoUpload({ formData, changePage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [img, setImg] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [url, setUrl] = useState(null)
  const navigate = useNavigate()




  async function selectImage(e) {
    const file = e.target.files[0]
    const imageUrl = await readFile(file)
    setUrl(imageUrl)
    setImg(file)
  }

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener("load", () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  function submitHandler(e) {
    e.preventDefault()
    const pkg = new FormData()
    Object.keys(croppedAreaPixels).map(key => {
      pkg.append(key, croppedAreaPixels[key])
    })
    Object.keys(formData).map(key => {
      pkg.append(key, formData[key])
    })
    pkg.append("img", img)
    axios.post("/users", pkg)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
      .finally(() => {
        navigate("/")
      })

  }

  function zoomIn(e) {
    const { value } = e.target
    setZoom(value)
  }

  function onCropComplete(croppedArea, croppedAreaPixels) {
    console.log(croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }




  const content = url === null ? <input type='file' accept='image/*' onChange={selectImage} /> : (
    <section className='absolute w-full flex justify-between pt-40 h-full'>
      <div className='grid grid-cols-1 grid-rows-3 pt-20'>
        <div className='absolute top-20 h-1/3 bg-white w-full'>

          <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            aspect={.8}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className='flex flex-col absolute bottom-1/3 w-1/2 left-1/4'>
          <p>(Click and drag on photo to change positioning....)</p>
          <label className='text-xl text-white text-center'>Zoom
            <br />
            <input type='range' className="w-full cursor-pointer" min={1} max={3} step={0.1} onChange={zoomIn} value={zoom} />
          </label>
          <br />
          <div className='flex justify-around'>
            <button className='rounded bg-red-900 text-white shadow-2xl cursor-pointer hover:scale-95 p-2' value={'Back'}>Back</button>
            <Link className='rounded bg-gray-600 text-white shadow-2xl cursor-pointer hover:scale-95 p-2' to={'/'}>Cancel</Link>
            <button className='rounded bg-sky-900 text-white shadow-2xl cursor-pointer hover:scale-95 p-2 ' onClick={submitHandler} >Submit</button>
          </div>
        </div>
      </div>
    </section>
  )
  return content
}
