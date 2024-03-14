'use client'
import { CldUploadButton, CldImage } from 'next-cloudinary'

export const UploadImage = ({
  setValue,
  imagePublicId,
}: {
  setValue: (publicId: string) => void
  imagePublicId?: string | null
}) => {
  if (imagePublicId) {
    return (
      <CldImage
        className="rounded-lg shadow-lg border-2 border-white"
        width={500}
        height={500}
        src={imagePublicId}
        alt=""
      />
    )
  }
  return (
    <CldUploadButton
      uploadPreset="ai-news"
      onSuccess={({ event, info }) => {
        if (typeof info === 'object' && 'public_id' in info) {
          const { public_id } = info
          setValue(public_id)
        } else {
          console.error('Invalid info object:', info)
        }
      }}
    />
  )
}
