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
  findAll: protectedProcedure().query(({ ctx }) => {
    return ctx.db.editor.findMany({
      include: { User: true },
    })
  }),
  myEditors: protectedProcedure().query(({ ctx }) => {
    return ctx.db.editor.findMany({
      where: { userId: ctx.userId },
      include: { User: true },
    })
  }),
  getFavorite: protectedProcedure()
    .input(schemaNumberID)
    .query(({ ctx, input }) => {
      return ctx.db.editor.findFirst({
        where: { id: input.id, FavoritedBy: { some: { id: ctx.userId } } },
      })
    }),
  favorite: protectedProcedure()
    .input(schemaNumberID)
    .mutation(async ({ ctx, input }) => {
      const favorite = await ctx.db.editor.findFirst({
        where: { id: input.id, FavoritedBy: { some: { id: ctx.userId } } },
      })
      if (favorite) {
        return ctx.db.user.update({
          data: {
            FavoriteEditors: { disconnect: { id: input.id } },
          },
          where: { id: ctx.userId },
        })
      }

      return ctx.db.user.update({
        data: {
          FavoriteEditors: { connect: { id: input.id } },
        },
        where: { id: ctx.userId },
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
  favoriteEditors: protectedProcedure().query(({ ctx }) => {
    return ctx.db.editor.findMany({
      where: { FavoritedBy: { some: { id: ctx.userId } } },
      include: { User: true },
    })
  }),
})
