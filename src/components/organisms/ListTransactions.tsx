import { trpcServer } from '@/trpc/clients/server'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../atoms/table'
import { format } from 'date-fns'
import { cn } from '@/util/styles'
import { fontSansClassName } from '@/util/fonts'

export const ListTransactions = async () => {
  const myCreditTransactions =
    await trpcServer.creditBalance.myCreditTransactions.query()

  return (
    <div className={fontSansClassName}>
      <Table>
        <TableCaption>A list of your recent credit transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Input Tokens</TableHead>
            <TableHead>Output Tokens</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myCreditTransactions.map(
            ({ id, amount, createdAt, notes, inputTokens, outputTokens }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>

                <TableCell>
                  <div>{format(new Date(createdAt), 'PP')}</div>
                  <div className="text-xs">
                    {format(new Date(createdAt), 'p')}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">{notes}</TableCell>
                <TableCell className="max-w-xs">{inputTokens}</TableCell>
                <TableCell className="max-w-xs">{outputTokens}</TableCell>

                <TableCell
                  className={cn(
                    'text-2xl text-right',
                    amount > 0 ? 'text-green-700' : 'text-red-700',
                  )}
                >
                  {amount}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  )
}
