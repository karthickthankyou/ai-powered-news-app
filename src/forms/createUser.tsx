import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaCreateUser = z.object({
  id: z.string().min(1, { message: 'User id is required' }),
})

export type FormTypeCreateUser = z.infer<typeof schemaCreateUser>

export const useFormCreateUser = () =>
  useForm<FormTypeCreateUser>({
    resolver: zodResolver(schemaCreateUser),
  })
