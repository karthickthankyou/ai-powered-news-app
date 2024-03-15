import Image from 'next/image'
import { CloundinaryImage } from './CloudinaryImage'

export const ReporterInfo = ({
  name,
  image,
  publicId,
}: {
  name: string
  image?: string | null
  publicId?: string | null
}) => {
  return (
    <div className="flex gap-2 items-center mt-8">
      {publicId ? (
        <CloundinaryImage
          className="w-12 h-12 rounded-full"
          publicId={publicId || ''}
        />
      ) : (
        <Image
          className="w-12 h-12 rounded-full"
          src={image || '/user.png'}
          width={200}
          height={200}
          alt=""
        />
      )}
      <div>
        <div className="text-xs">Written by,</div>
        <div>{name}</div>
      </div>
    </div>
  )
}
