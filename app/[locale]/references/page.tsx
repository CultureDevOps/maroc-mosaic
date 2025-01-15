import { Metadata } from "next"
import { createTranslation } from "../i18n/server"
import { LocaleTypes } from "../i18n/settings"
import { genPageMetadata } from "app/[locale]/seo"
import MapLayout from "@/layouts/MapLayout"
import { locationsData, Locations } from "@/data/locationsData";

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (await params).locale
  const { t } = await createTranslation(locale, "common")
  return genPageMetadata({
    title: t("references"),
    params: { locale: locale },
  })
}

export default async function MapPage({ params }: PageProps) {
  const locale = (await params).locale
  const locations: Locations[] = locationsData[locale]
  return (
    <MapLayout params={{ locale }} data={locations} />
  )
}
