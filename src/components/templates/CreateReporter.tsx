'use client'
import { useFormCreateUser } from '@/forms/createUser'
import { Label } from '@radix-ui/react-label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { Title3 } from '../atoms/typography'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/Toaster/use-toast'
import { useEffect } from 'react'
import { revalidatePath } from '@/util/actions/revalidatePath'

export const CreateReporter = () => {
  const { register, handleSubmit, reset } = useFormCreateUser()

  const { toast } = useToast()

  const {
    data,
    isLoading,
    error,
    mutateAsync: createReporter,
  } = trpcClient.reporters.create.useMutation()

  useEffect(() => {
    if (data) {
      reset()
      toast({ title: 'Reporter created.' })
      revalidatePath('/admin/manageReporters')
    }
  }, [data, reset, toast])

  useEffect(() => {
    if (error) {
      toast({ title: error.data?.code })
    }
  }, [error, toast])
  return (
    <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
      <Title3 className="mb-2">Create Reporter</Title3>

      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          await createReporter(data)
        })}
      >
        <Label>
          <Input placeholder="UID" {...register('id')} />
        </Label>
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  )
}
