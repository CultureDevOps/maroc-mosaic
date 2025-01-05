import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'

type Props = {
  params: { locale: LocaleTypes }
}

const heroBackgroundImg = '/static/images/pages/fontaine-02-enhanced.png'

export default async function Hero({ params: { locale } }: Props) {
  const { t } = await createTranslation(locale, 'hero')
  return (
    <div className="relative" style={{ minHeight: '70vh' }}>
      {/* Image optimisée */}
      <Image
        src={heroBackgroundImg}
        alt="Hero background"
        fill
        quality={90}
        priority
        className="object-cover pointer-events-none z-[-1]" // Masque pour simuler un fond
      />
    </div>
  )
}
