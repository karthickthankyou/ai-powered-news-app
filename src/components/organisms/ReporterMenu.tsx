import { Link } from '../molecules/CustomLink'

export const ReporterMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/reporter">Dashboard</Link>
      <Link href="/reporter/myArticles">My articles</Link>
      <Link className="pl-4" href="/reporter/myArticles/new">
        Create article
      </Link>
    </div>
  )
}
