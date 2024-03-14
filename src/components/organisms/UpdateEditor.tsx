'use client'
import { Button } from '../atoms/button'
import { Input } from '../atoms/input'
import { Label } from '../atoms/label'
import { useFormUpdateEditor } from '@/forms/createEditor'
import { HtmlSelect } from '../atoms/select'
import { $Enums } from '@prisma/client'
import { TextArea } from '../atoms/textArea'
import { trpcClient } from '@/trpc/clients/client'
import { RouterOutputs } from '@/trpc/clients/types'
import { useToast } from '../molecules/Toaster/use-toast'
import { useEffect, useState } from 'react'
import { SimpleDialog } from '../molecules/SimpleDialog'
import { PenBox } from 'lucide-react'

export const UpdateEditor = ({
  editor,
}: {
  editor: NonNullable<RouterOutputs['editors']['myEditors'][0]>
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useFormUpdateEditor({ defaultValues: editor })

  const { toast } = useToast()
  const [openDialog, setOpenDialog] = useState(false)

  const utils = trpcClient.useUtils()
  const { mutateAsync: updateEditor } = trpcClient.editors.update.useMutation({
    onSuccess: (data) => {
      utils.editors.myEditors.invalidate()
      toast({ title: `Editor ${data.name} updated.` })
      reset(data)
      setOpenDialog(false)
    },
    onError(error, variables, context) {
      toast({ title: 'Action failed.' })
    },
  })

  return (
    <div>
      <Button
        size="none"
        variant={'ghost'}
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        <PenBox />
      </Button>
      <SimpleDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Update Editor"
      >
        <div className="flex flex-col gap-1  font-sans ">
          <form
            onSubmit={handleSubmit(async (data) => {
              await updateEditor({ ...data, id: editor.id })
            })}
          >
            <Label title={'Name'} error={errors.name?.message}>
              <Input placeholder="Name..." {...register('name')} />
            </Label>
            <Label title="Style" error={errors.style?.message}>
              <HtmlSelect placeholder="Style" {...register(`style`)}>
                {Object.values($Enums.Style).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
            <Label title="Verbosity" error={errors.verbosity?.message}>
              <HtmlSelect placeholder="Verbosity" {...register(`verbosity`)}>
                {Object.values($Enums.Verbosity).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
            <Label title="Language" error={errors.language?.message}>
              <HtmlSelect placeholder="language" {...register(`language`)}>
                {Object.values($Enums.Language).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
            <Label
              title="WordComplexity"
              error={errors.wordComplexity?.message}
            >
              <HtmlSelect
                placeholder="WordComplexity"
                {...register(`wordComplexity`)}
              >
                {Object.values($Enums.WordComplexity).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
            <Label title={'Additional notes'} error={errors.name?.message}>
              <TextArea
                placeholder="Additional notes..."
                {...register('additionalNotes')}
              />
            </Label>
            <Button type="submit">Update</Button>
          </form>
        </div>
      </SimpleDialog>
    </div>
  )
}
