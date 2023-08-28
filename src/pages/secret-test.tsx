import Image from "next/image"
import { useState } from "react"

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)

  const uploadFile = async (e: any) => {
    const filename = encodeURIComponent(file!.name)
    const res = await fetch(`/api/get-upload-url?file=${filename}`)
    const data = await res.json()
    const { url, fields } = data
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(
      ([key, value]: [key: any, value: any]) => {
        formData.append(key, value)
      }
    )

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    })

    if (upload.ok) {
      console.log("Uploaded successfully!")
      const res = await fetch(`/api/uploaded?file=${filename}`)
      const data = await res.json()
      console.log(data)
    } else {
      console.error("Upload failed.")
    }
  }

  return (
    <>
      <p>Upload a pdf or docx (max 1MB).</p>
      <input
        onChange={(e) => setFile(e.target.files![0])}
        type="file"
        accept="application/pdf, application/msword"
      />

      <button onClick={uploadFile}>Upload</button>
    </>
  )
}
