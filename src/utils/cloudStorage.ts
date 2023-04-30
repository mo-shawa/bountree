export const getGCSUploadData = async (file: File): Promise<GCSUploadData> => {
	if (!file) return

	const filename = encodeURIComponent(file.name)
	const res = await fetch(`/api/get-upload-url?file=${filename}`)
	const data = await res.json()
	const { url, fields, fileName } = data

	const gcsFormData = new FormData()

	Object.entries({ ...fields, file }).forEach(
		([key, value]: [key: any, value: any]) => {
			gcsFormData.append(key, value)
		}
	)

	return { url, gcsFormData, fileName }
}

type GCSUploadData =
	| {
			url: string
			gcsFormData: FormData
			fileName: string
	  }
	| undefined
