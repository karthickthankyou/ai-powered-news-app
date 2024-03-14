import { $Enums } from '@prisma/client'
import { DefaultValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateEditor = z.object({
  name: z.string().min(1, { message: 'Editor name is required' }),
  style: z.nativeEnum($Enums.Style),
  language: z.nativeEnum($Enums.Language),
  verbosity: z.nativeEnum($Enums.Verbosity),
  wordComplexity: z.nativeEnum($Enums.WordComplexity),
  imagePublicId: z.string().optional().nullable(),
  additionalNotes: z.string().nullable(),
})

export type FormTypeCreateEditor = z.infer<typeof schemaCreateEditor>

export const useFormCreateEditor = () =>
  useForm<FormTypeCreateEditor>({
    resolver: zodResolver(schemaCreateEditor),
  })

export const useFormUpdateEditor = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<FormTypeCreateEditor>
}) =>
  useForm<FormTypeCreateEditor>({
    resolver: zodResolver(schemaCreateEditor),
    defaultValues,
  })
