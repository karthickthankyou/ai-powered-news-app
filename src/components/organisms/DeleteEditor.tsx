'use client'
import { Button } from '../atoms/button'
import { trpcClient } from '@/trpc/clients/client'
import { useEffect, useState } from 'react'
import { SimpleDialog } from '../molecules/SimpleDialog'
import { Trash } from 'lucide-react'
import { RouterOutputs } from '@/trpc/clients/types'
import { useToast } from '../molecules/Toaster/use-toast'

export const DeleteEditor = ({
  editor,
}: {
  editor: NonNullable<RouterOutputs['editors']['myEditors'][0]>
}) => {
  const utils = trpcClient.useUtils()
  const { error, mutateAsync: deleteEditor } =
    trpcClient.editors.delete.useMutation({
      onSuccess: (data) => {
        utils.editors.myEditors.invalidate()
        toast({ title: `Editor ${data.name} updated.` })
        setOpenDialog(false)
      },
    })
  const [openDialog, setOpenDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({ title: 'Action failed.' })
    }
  }, [error, toast])

  return (
    <div className="font-sans">
      <Button
        size="none"
        variant={'ghost'}
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        <Trash />
      </Button>
      <SimpleDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Delete Editor"
      >
        <Button
          onClick={async () => {
            await deleteEditor({ id: editor.id })
          }}
          variant={'destructive'}
        >
          Delete Editor {editor.name}?
        </Button>
      </SimpleDialog>
    </div>
  )
}
