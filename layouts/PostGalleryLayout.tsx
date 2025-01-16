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
  const { filePath, path, slug, date, title, tags, language, series, toc } = content
  const basePath = path.split("/")[0]
  const { t } = await createTranslation(locale, "home")
  // const tableOfContents: Toc = toc as unknown as Toc
  return (
    <>
      {/* <div className="mb-6
                      bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 
                      dark:bg-gradient-to-tr dark:from-gray-900/30 dark:via-primary-950/30 dark:to-gray-900/30 
                      backdrop-blur-sm rounded-lg p-8 shadow-lg 
                      border border-white/20 dark:border-gray-700/20 h-fit
                      shadow-xl shadow-gray-400 dark:shadow-gray-950"> */}
      <FancyboxWrapper>
        <article>
          <div className="xl:divide-y xl:divide-gray-300 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <div className="text-shadow font-headings text-shadow-gray-400/80 dark:text-shadow-black">
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-300 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-3 xl:gap-x-6 xl:divide-y-0">
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
              {/* <footer>
                  <div className="divide-gray-300 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                    {(next || prev) && (
                      <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                        {prev && prev.slug && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                              {t('preva')}
                            </p>
                            <div className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                              <Link href={`/${locale}/blog/${prev.slug}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && next.slug && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                              {t('nexta')}
                            </p>
                            <div className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                              <Link href={`/${locale}/blog/${next.slug}`}>{next.title}</Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${locale}/${basePath}`}
                      className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                      aria-label="Back to the blog"
                    >
                      &larr;{t('back')}
                    </Link>
                  </div>
                </footer> */}
            </div>
          </div>
        </article>
      </FancyboxWrapper>
      {/* </div> */}
    </>
  )
}
