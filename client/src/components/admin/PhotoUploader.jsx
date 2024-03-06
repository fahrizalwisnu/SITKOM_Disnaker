import axios from 'axios'
import { useEffect, useState } from 'react'

function PhotoUploader({ foto, setFoto, id }) {
  // const [photo, setFoto] = useState('')
  const [addedPhoto, setAddedPhoto] = useState('')

  useEffect(() => {

  }, []);

  async function addPhotoByLink(e) {
    e.preventDefault()

    const { data } = await axios.post('/api/upload-photo-training-by-link', {
      url: foto
    })
    // setFoto('')
    setAddedPhoto(data.data)
  }

  async function uploadPhoto(e) {
    const { files } = e.target
    const data = new FormData()
    data.append('photos', files[0])
    axios
      .post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/formdata'
        }
      })
      .then((response) => {
        const { data } = response
        setFoto(data.data)
        setAddedPhoto(data.data)
      })
  }

  function removePhoto(e) {
    e.preventDefault()

    setAddedPhoto('')
    setFoto('')
  }

  return (
    <>
      <div className="mb-3">
        <h2 className="text-xl mt-4">Foto</h2>
        <div className="mt-2 mb-3 h-40 w-40">
          {foto || addedPhoto ? (
            <div className="flex relative border rounded-lg p-1">
              <img
                src={`http://localhost:8082/uploads/${foto ? foto : addedPhoto}`}
                className="rounded-2xl w-full object-contain object-center aspect-square"
              />
              <button
                onClick={removePhoto}
                className="absolute bottom-1 right-1 py-2 px-3 bg-black text-white bg-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <label className="h-32 cursor-pointer border justify-center flex gap-1 border-gray-300 rounded-2xl text-gray-600 items-center">
              <input
                onChange={uploadPhoto}
                type="file"
                // multiple
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
          )}
        </div>
      </div>
    </>
  )
}

export default PhotoUploader
