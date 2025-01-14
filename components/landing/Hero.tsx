import { createTranslation } from "app/[locale]/i18n/server"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import Image from "next/image"

type Props = {
  params: { locale: LocaleTypes }
}

const heroBackgroundImg = "/static/images/assets/fontaine-02-enhanced-2.png"

export default async function Hero({ params: { locale } }: Props) {
  const { t } = await createTranslation(locale, "hero")
  return (
    <div className="relative" style={{ minHeight: "70vh" }}>
      {/* Image optimisée */}
      <Image
        src={heroBackgroundImg}
        alt="Hero background"
        fill
        quality={90}
        priority
        className="pointer-events-none z-[-1] object-cover" // Masque pour simuler un fond
      />
    </div>
  )
}
