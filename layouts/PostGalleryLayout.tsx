import { ReactNode } from "react"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Blog, Authors } from "contentlayer/generated"
import Comments from "@/components/comments/Comments"
import Link from "@/components/mdxcomponents/Link"
import PageTitle from "@/components/PageTitle"
import Image from "@/components/mdxcomponents/Image"
import Tag from "@/components/tag"
import siteMetadata from "@/data/siteMetadata"
import ScrollTopAndComment from "@/components/scroll"
import { createTranslation } from "app/[locale]/i18n/server"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { PostSeriesBox } from "@/components/seriescard"
import Share from "@/components/share"
import FancyboxWrapper from "@/components/mdxcomponents/FancyboxWrapper"
import SocialIcon from "@/components/social-icons"

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps) {
  const { filePath, path, slug, title } = content
  const { t } = await createTranslation(locale, "home")
  return (
    <>
      <FancyboxWrapper>
        <article>
          <div className="xl:divide-y xl:divide-gray-300 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <div
                  className="text-heading dark:text-heading-dark text-shadow font-headings text-shadow-gray-400/80
                    dark:text-shadow-black"
                >
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div
              className="grid-rows-[auto_1fr] divide-y divide-gray-300 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-3
                xl:gap-x-6 xl:divide-y-0"
            >
              <div className="divide-y divide-gray-300 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
                <Share title={title} slug={slug} />
                <div className="py-6">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                    <Link
                      href={discussUrl(path)}
                      rel="nofollow"
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {t("twitter")}
                    </Link>
                    <span>{` • `}</span>
                    <Link
                      href={editUrl(filePath)}
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {t("github")}
                    </Link>
                  </div>
                  <div className="pt-6 text-center" id="comment">
                    {siteMetadata.comments && siteMetadata.iscomments === true && (
                      <Comments slug={slug} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </FancyboxWrapper>
    </>
  )
}
