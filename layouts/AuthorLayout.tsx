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

interface AuthorLayoutProps {
  children: ReactNode
  content: Omit<Authors, "_id" | "_raw" | "body">
  params: { locale: LocaleTypes }
}

export default function AuthorLayout({ children, content, params: { locale } }: AuthorLayoutProps) {
  const { name, avatar, occupation, company, email, instagram, facebook } = content
  // const { locale } = await params
  const { t } = useTranslation(locale, "about")
  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }
  function ContactClick(): void {
    handleContactClick()
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1
            className="text-heading-700 text-shadow font-headings text-3xl font-extrabold leading-9 tracking-tight
              antialiased text-shadow-gray-400/80 dark:text-white dark:text-shadow-black sm:text-4xl sm:leading-10
              md:text-6xl md:leading-14"
          >
            {t("about")}
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                title="avatar"
                width={192}
                height={192}
                className="size-48 rounded-full"
                quality={80}
              />
            )}
            <h2
              className="text-shadow pb-2 pt-4 font-headings text-2xl font-bold leading-8 tracking-tight
                text-shadow-gray-400/80 dark:text-shadow-black"
            >
              {name}
            </h2>
            <div className="text-gray-600 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-600 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              {siteMetadata.formspree === false ? (
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
              ) : (
                <button className="flex items-center focus:outline-none" onClick={ContactClick}>
                  <SocialIcon kind="mail" size={6} />
                </button>
              )}
              <SocialIcon kind="instagram" href={instagram} size={6} />
              <SocialIcon kind="facebook" href={facebook} size={6} />
            </div>
          </div>
          <div className="prose max-w-none py-8 dark:prose-invert xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
