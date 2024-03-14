import { Link } from '../molecules/CustomLink'

export const UserMenu = () => {
  return (
    <div className="flex flex-col w-full max-w-xs gap-2">
      <Link href="/user">Dashboard</Link>
      <Link href="/user/credits">Credits</Link>
      <Link href="/user/editors">Editors</Link>
      <Link href="/user/editors/new" className="pl-4">
        Create Editor
      </Link>
    </div>
  )
}
