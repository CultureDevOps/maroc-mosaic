import { LocaleTypes } from './i18n/settings'
import Landing from './landing/page'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params }: HomeProps) {
  const locale = (await params).locale
  return (
    <Landing params={{ locale }} />
  )
}
