import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { schemaPayment } from './schemas'

export const schemaAddCredits = schemaPayment.omit({ userId: true })

export type FormTypeAddCredits = z.infer<typeof schemaAddCredits>

export const useFormAddCredits = () =>
  useForm<FormTypeAddCredits>({
    resolver: zodResolver(schemaAddCredits),
    defaultValues: { creditsCount: 20 },
  })
