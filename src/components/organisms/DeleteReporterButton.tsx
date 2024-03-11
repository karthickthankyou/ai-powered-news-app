'use client'

import { FormTypeCreateUser } from '@/forms/createUser'
import { trpcClient } from '@/trpc/clients/client'
import { Button } from '../atoms/button'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { useToast } from '../molecules/Toaster/use-toast'

export const DeleteReporterButton = ({ id }: FormTypeCreateUser) => {
  const { toast } = useToast()

  const {
    data,
    isLoading,
    mutateAsync: deleteReporter,
  } = trpcClient.reporters.delete.useMutation({
    onSuccess() {
      toast({ title: 'Reporter deleted.' })
      revalidatePath('/admin/manageReporters')
    },
  })

  return (
    <Button
      loading={isLoading}
      onClick={async () => {
        await deleteReporter({ id })
      }}
      variant={'link'}
      size={'none'}
    >
      Delete
    </Button>
  )
}
