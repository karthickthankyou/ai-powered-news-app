'use client'

import { FormTypeCreateUser } from '@/forms/createUser'
import { trpcClient } from '@/trpc/clients/client'
import { Button } from '../atoms/button'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { useToast } from '../molecules/Toaster/use-toast'

export const DeleteAdminButton = ({ id }: FormTypeCreateUser) => {
  const { toast } = useToast()

  const {
    data,
    isLoading,
    mutateAsync: deleteAdmin,
  } = trpcClient.admins.delete.useMutation({
    onSuccess() {
      toast({ title: 'Admin deleted.' })
      revalidatePath('/admin/manageAdmins')
    },
  })

  return (
    <Button
      loading={isLoading}
      onClick={async () => {
        await deleteAdmin({ id })
      }}
      variant={'link'}
      size={'none'}
    >
      Delete
    </Button>
  )
}
