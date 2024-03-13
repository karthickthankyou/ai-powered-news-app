'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { schemaCreateArticle } from './schemas'

export type FormTypeCreateArticle = z.infer<typeof schemaCreateArticle>

export const useFormCreateArticle = () =>
  useForm<FormTypeCreateArticle>({
    resolver: zodResolver(schemaCreateArticle),
    defaultValues: { published: true, tags: [] },
  })
