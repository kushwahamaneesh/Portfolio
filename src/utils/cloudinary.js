import { compressImageToBlob } from './siteHelpers.js'

function getCloudinaryConfig() {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? ''
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? ''
  const folder = import.meta.env.VITE_CLOUDINARY_FOLDER ?? ''

  return {
    cloudName: cloudName.trim(),
    uploadPreset: uploadPreset.trim(),
    folder: folder.trim(),
  }
}

export function isCloudinaryConfigured() {
  const { cloudName, uploadPreset } = getCloudinaryConfig()
  return Boolean(cloudName && uploadPreset)
}

export async function uploadEventImageToCloudinary(file) {
  const { cloudName, uploadPreset, folder } = getCloudinaryConfig()

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary is not configured')
  }

  const blob = await compressImageToBlob(file)
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const formData = new FormData()
  formData.append('file', blob, file.name || 'event.jpg')
  formData.append('upload_preset', uploadPreset)

  if (folder) {
    formData.append('folder', folder)
  }

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Cloudinary upload failed')
  }

  const data = await response.json()

  if (!data?.secure_url || typeof data.secure_url !== 'string') {
    throw new Error('Cloudinary did not return a secure_url')
  }

  return data.secure_url
}

