import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type Props = {
  params: { locale: LocaleTypes }
}

const heroBackgroundImg = '/static/images/pages/fontaine-02-enhanced.png'

export default async function Hero({ params: { locale } }: Props) {
  const { t } = await createTranslation(locale, 'hero')
  return (
    <div
    className="relative bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${heroBackgroundImg})`,
      minHeight: '70vh',
    }} 
    >  
    </div>
  )
}
