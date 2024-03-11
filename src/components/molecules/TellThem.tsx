import { CopyToClipboard } from './CopyToClipboard'
import { AlertBox } from './AlertBox'
import { Role } from '@/util/types'

export interface ITellThemProps {
  uid: string
  role: Role
}

export const TellThem = ({ uid, role }: ITellThemProps) => {
  return (
    <AlertBox>
      <div className="bg-gray-100 py-12 flex items-center justify-center">
        <div className="max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Looks like you&apos;re missing the {role} badge
          </h2>
          <p className="mb-6">
            Request assistance from our admins and provide your ID.
          </p>

          <CopyToClipboard text={uid} />
        </div>
      </div>
    </AlertBox>
  )
}
