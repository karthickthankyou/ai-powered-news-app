import { SelectEditors } from '@/components/organisms/SelectEditors'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}

      <div className="fixed right-0 top-1/2 -translate-y-1/2">
        <SelectEditors />
      </div>
    </div>
  )
}
