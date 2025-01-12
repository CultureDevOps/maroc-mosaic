import { Metadata } from "next"
import { createTranslation } from "../i18n/server"
import { LocaleTypes } from "../i18n/settings"
import FullLayoutSectionContainer from "@/components/FullLayoutSectionContainer"
import { genPageMetadata } from "app/[locale]/seo"
import dynamic from "next/dynamic"
import Map from "@/components/maps/Map"

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (await params).locale
  const { t } = await createTranslation(locale, "hero")
  return genPageMetadata({
    title: t("title"),
    params: { locale: locale },
  })
}

export default async function MapPage({ params }: PageProps) {
  return (
    <section className="mt-7 mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-full xl:px-20">
      <Map />
    </section>
  )
}
