"use client"
import { useState } from "react"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"
import { Locations } from "@/data/locationsData"
import dynamic from "next/dynamic"
import TailwindTable from "@/components/table/TailwindTable"
const Map = dynamic(() => import("@/components/maps/MapTiler"), {
  ssr: false, // Désactive le SSR pour ce composant
})

interface MapLayoutProps {
  params: { locale: LocaleTypes }
  data: Locations[]
}

export default function MapLayout({ params: { locale }, data }: MapLayoutProps) {
  const { t } = useTranslation(locale, "references")
  const [focusedLocation, setFocusedLocation] = useState<Locations | null>(null)

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-7xl xl:px-0">
      {/* Titre */}
      <div className="space-y-2 pb-8 pt-4 md:space-y-5">
        <h1
          className="text-heading-700 text-shadow font-headings text-3xl font-extrabold leading-9 tracking-tight
            antialiased text-shadow-gray-400/80 dark:text-white dark:text-shadow-black sm:text-4xl sm:leading-10
            md:text-6xl md:leading-14"
        >
          {t("references")}
        </h1>
      </div>

      {/* Carte */}
      <div className="mb-10">
        <Map data={data} focusedLocation={focusedLocation} locale={locale} />
      </div>

      {/* Tableau */}
      <div>
        <h2
          className="mb-4 text-center font-headings text-3xl font-semibold text-heading dark:text-heading-dark
            text-shadow text-shadow-gray-400/80 dark:text-shadow-black"
        >
          {t("table_section_title")}
        </h2>
        <TailwindTable
          data={data}
          locale={locale}
          onRowClick={(location) => setFocusedLocation(location)}
        />
      </div>
    </section>
  )
}
