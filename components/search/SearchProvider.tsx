"use client"

import { ReactNode } from "react"
import { KBarSearchProvider } from "./kbar"
import { useParams, useRouter } from "next/navigation"
import siteMetadata from "@/data/siteMetadata"
import { Authors, allAuthors } from "contentlayer/generated"
import { CoreContent } from "pliny/utils/contentlayer"
import { Blog } from "contentlayer/generated"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"
import { fallbackLng } from "app/[locale]/i18n/locales"
import { HomeIcon, AboutIcon } from "./icons"

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")
  const router = useRouter()
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]
  const section_about = t("about")
  const navigationSection = t("navigate")
  const section_home = t("home")

  const authorSearchItems = authors.map((author) => {
    const { name, slug } = author
    return {
      id: slug,
      name: name,
      keywords: "",
      shortcut: [],
      section: section_about,
      perform: () => router.push(`/${locale}/about/${slug}`),
      icon: (
        <i>
          <AboutIcon />
        </i>
      ),
    }
  })

  const showAuthorsSearch = siteMetadata.multiauthors
  const authorsActions = [
    ...(showAuthorsSearch ? authorSearchItems : []),
    ...(showAuthorsSearch
      ? []
      : [
          {
            id: "about",
            name: section_about,
            keywords: "",
            shortcut: ["a"],
            section: navigationSection,
            perform: () => router.push(`/${locale}/about/contact`),
            icon: (
              <i>
                <AboutIcon />
              </i>
            ),
          },
        ]),
  ]
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: "search.json",
        defaultActions: [
          {
            id: "home",
            name: section_home,
            keywords: "",
            shortcut: ["h"],
            section: navigationSection,
            perform: () => router.push(`/${locale}`),
            icon: (
              <i>
                <HomeIcon />
              </i>
            ),
          },
          ...authorsActions,
        ],
        onSearchDocumentsLoad(json) {
          return json
            .filter((post: CoreContent<Blog>) => post.language === locale)
            .map((post: CoreContent<Blog>) => ({
              id: post.path,
              name: post.title,
              keywords: post?.summary || "",
              section: t("content"),
              subtitle: post.tags.join(", "),
              perform: () => router.push(`/${locale}/blog/${post.slug}`),
            }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
