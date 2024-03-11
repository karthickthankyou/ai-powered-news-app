import { Link } from '../molecules/CustomLink'

export const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/manageAdmins">Admins</Link>
      <Link href="/admin/manageReporters">Reporters</Link>
      <Link href="/admin/manageArticles">Articles</Link>
      <Link href="/admin/manageUsers">Users</Link>
      <Link href="/admin/manageEditors">Editors</Link>
    </div>
  )
}
