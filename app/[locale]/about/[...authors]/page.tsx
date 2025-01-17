import { Metadata } from "next"
import { Authors, allAuthors } from "contentlayer/generated"
import { MDXLayoutRenderer } from "pliny/mdx-components"
import AuthorLayout from "@/layouts/AuthorLayout"
import { coreContent } from "pliny/utils/contentlayer"
import { genPageMetadata } from "app/[locale]/seo"
import { createTranslation } from "app/[locale]/i18n/server"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { notFound } from "next/navigation"
import SectionContainer from "@/components/SectionContainer"
import { components } from "@/components/mdxcomponents"

interface PageProps {
  params: Promise<{
    authors: string[]
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | undefined> {
  const { authors, locale } = await params
  const authorSlug = decodeURI(authors.join("/"))
  const author = allAuthors.find((a) => a.slug === authorSlug && a.language === locale) as Authors
  if (!author) {
    return
  }
  const { t } = await createTranslation(locale, "about")

  return genPageMetadata({
    title: `${t("about")} ${author.name}`,
    params: { locale },
  })
}

export default async function Page({ params }: PageProps) {
  const { authors, locale } = await params
  const authorSlug = decodeURI(authors.join("/"))
  const author = allAuthors.find((a) => a.slug === authorSlug && a.language === locale) as Authors
  const authorIndex = allAuthors.findIndex((p) => p.slug === authorSlug)
  if (authorIndex === -1) {
    return notFound()
  }
  const mainContent = coreContent(author)

  return (
    <div className="pt-24">
      <SectionContainer>
        <div
          className="dark:via-primary-950/30 mb-6 grow rounded-lg border border-white/20 bg-gradient-to-tr from-white/40
            via-primary-200/30 to-white/30 p-8 shadow-xl shadow-gray-400 backdrop-blur-sm
            dark:border-gray-700/20 dark:bg-gradient-to-tr dark:from-gray-900/30 dark:to-gray-900/30
            dark:shadow-gray-950"
        >
          <AuthorLayout params={{ locale }} content={mainContent}>
            <MDXLayoutRenderer code={author.body.code} components={components} />
          </AuthorLayout>
        </div>
      </SectionContainer>
    </div>
  )
}
