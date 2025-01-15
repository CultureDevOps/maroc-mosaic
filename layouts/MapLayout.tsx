"use client"
import { ReactNode } from "react"
import type { Authors } from "contentlayer/generated"
import SocialIcon from "@/components/social-icons"
import Image from "@/components/mdxcomponents/Image"

import { LocaleTypes } from "app/[locale]/i18n/settings"
import { createTranslation } from "app/[locale]/i18n/server"
import siteMetadata from "@/data/siteMetadata"

import { useContactModal } from "@/components/formspree/store"
import { useTranslation } from "app/[locale]/i18n/client"
import { Locations } from "@/data/locationsData"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/maps/MapComponent"), {
  ssr: false, // Désactive le SSR pour ce composant
})

interface MapLayoutProps {
  params: { locale: LocaleTypes }
  data: Locations[]
}

export default function MapLayout({ params: { locale }, data }: MapLayoutProps) {
  const { t } = useTranslation(locale, "common")

  return (
    <section className="mx-auto mt-5 max-w-5xl px-4 sm:px-6 xl:max-w-full xl:px-20">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-heading-700 text-shadow font-headings text-3xl 
          font-extrabold leading-9 tracking-tight antialiased text-shadow-gray-400/80 
          dark:text-white dark:text-shadow-black sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t("references")}
        </h1>
      </div>
      <Map data={data} />
    </section>
  )
}
