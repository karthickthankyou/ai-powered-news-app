import { schemaCreateEditor } from '@/forms/createEditor'
import { createTRPCRouter, protectedProcedure } from '..'
import { schemaNumberID } from '@/forms/schemas'
import { TRPCError } from '@trpc/server'

export const editorRoutes = createTRPCRouter({
  create: protectedProcedure()
    .input(schemaCreateEditor)
    .mutation(({ ctx, input }) => {
      return ctx.db.editor.create({ data: { ...input, userId: ctx.userId } })
    }),
  myEditors: protectedProcedure().query(({ ctx }) => {
    return ctx.db.editor.findMany({
      where: { userId: ctx.userId },
      include: { User: true },
    })
  }),
  delete: protectedProcedure()
    .input(schemaNumberID)
    .mutation(async ({ ctx, input }) => {
      const editor = await ctx.db.editor.findUnique({
        where: { userId: ctx.userId, id: input.id },
      })
      if (!editor) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Editor not found.',
        })
      }
      return ctx.db.editor.delete({
        where: { id: input.id, userId: ctx.userId },
      })
    }),
  update: protectedProcedure()
    .input(schemaCreateEditor)
    .input(schemaNumberID)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const editor = await ctx.db.editor.findUnique({
        where: { userId: ctx.userId, id },
      })
      if (!editor) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Editor not found.',
        })
      }

      return ctx.db.editor.update({
        data: { ...data, userId: ctx.userId },
        where: { id },
      })
    }),
})
