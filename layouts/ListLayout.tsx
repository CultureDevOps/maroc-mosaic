"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTagStore } from "@/components/util/useTagStore"
import { formatDate } from "pliny/utils/formatDate"
import { CoreContent } from "pliny/utils/contentlayer"
import type { Blog } from "contentlayer/generated"
import Link from "@/components/mdxcomponents/Link"
import { sortByDate } from "@/components/util/sortByDate"
import Pagination from "./Pagination"
import tagData from "app/[locale]/tag-data.json"
import { POSTS_PER_PAGE } from "@/data/postsPerPage"
import { useTranslation } from "app/[locale]/i18n/client"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import Image from "@/components/mdxcomponents/Image"

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({ params: { locale }, posts, title }: ListLayoutProps) {
  const { t } = useTranslation(locale, "home")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const sortedPosts = sortByDate(posts)
  const selectedTag = useTagStore((state) => state.selectedTag)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isHydrated, setIsHydrated] = useState(false)

  const filteredPosts = useMemo(() => {
    if (selectedTag) {
      return sortedPosts.filter((post) => post.tags.includes(selectedTag))
    }
    return sortedPosts
  }, [selectedTag, sortedPosts])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayPosts = filteredPosts.slice(startIndex, endIndex)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === useTagStore.getState().selectedTag ? "" : tag)
    setCurrentPage(1)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Ajoute un effet décalé
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -25, y: 0 }, // Initialement masqué
    show: { opacity: 1, x: 0, y: 0 }, // Devient visible
    exit: { opacity: 0, x: 25 }, // Pour les éléments retirés
  }

  const tagCountMap = tagData[locale]

  const filteredTags = Object.keys(tagCountMap).map((postTag) => {
    return (
      <li key={postTag} className="my-3">
        <button
          onClick={() => handleTagClick(postTag)}
          aria-labelledby={`${t("poststagged")} ${postTag}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleTagClick(postTag)
            }
          }}
        >
          <h3
            className={`inline px-3 py-2 text-sm font-medium uppercase ${
              useTagStore.getState().selectedTag === postTag
                ? "text-heading-800 dark:text-heading-300"
                : "hover:text-heading-800 dark:hover:text-heading-300 text-gray-600 dark:text-gray-300"
            }`}
          >
            {" "}
            {postTag} ({tagCountMap[postTag]})
          </h3>
        </button>
      </li>
    )
  })

  return (
    <>
      <div className="flex space-x-6 lg:space-x-8">
        <div
          className="dark:via-primary-950/30 hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded-2xl border border-white/20 bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 pt-5 shadow-xl shadow-gray-400 backdrop-blur-sm dark:border-gray-700/20 dark:bg-gradient-to-tr dark:from-gray-900/30 dark:to-gray-900/30 dark:shadow-gray-950 sm:flex"
          // style={{ position: 'fixed', top: '5rem', left: '1rem', maxHeight: 'calc(100vh - 5rem)' }}
        >
          <div className="px-6 py-4">
            <button
              onClick={() => setSelectedTag("")}
              className={`${
                useTagStore.getState().selectedTag === ""
                  ? "text-primary-600 dark:text-primary-300" /* Couleur de texte plus douce */
                  : "text-gray-900 dark:text-gray-200"
              } text-shadow font-headings font-bold uppercase antialiased transition-colors duration-300 text-shadow-gray-400/80 dark:text-shadow-black`}
            >
              {t("all")}
            </button>
            <ul className="mt-4 space-y-2">{filteredTags}</ul>
          </div>
        </div>
        <ul className="w-full grow">
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, language } = post
            if (language === locale) {
              return (
                <li
                  key={slug}
                  className="dark:via-primary-950/30 w-full bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 backdrop-blur-sm dark:bg-gradient-to-tr dark:from-gray-900/30 dark:to-gray-900/30"
                >
                  <div className="group mb-6 w-full rounded-2xl border border-white/20 p-5 shadow-xl shadow-gray-400 hover:border hover:border-white/20 hover:bg-gradient-to-tr hover:from-white/20 hover:via-primary-300/30 hover:to-white/20 hover:shadow-xl hover:shadow-gray-400 dark:border-gray-700/20 dark:shadow-gray-950 dark:hover:border-gray-600/40 dark:hover:bg-gradient-to-tr dark:hover:from-gray-900/20 dark:hover:via-primary-800/30 dark:hover:via-primary-900/30 dark:hover:to-gray-800/20 dark:hover:shadow-gray-950">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <Link
                        href={`/${locale}/blog/${slug}`}
                        className="text-gray-900 dark:text-gray-100"
                        aria-labelledby={title}
                      >
                        {post.banner && (
                          <div
                            className="relative h-auto w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                            style={{ aspectRatio: "2 / 1" }}
                          >
                            {/* Version desktop par défaut */}
                            <Image
                              width={2912}
                              height={1632}
                              src={post.banner}
                              alt={`${post.title} banner`}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              quality={90}
                              placeholder="blur"
                              blurDataURL={post.banner}
                              className="rounded-lg object-cover"
                              priority
                            />
                          </div>
                        )}
                        <dl>
                          <dt className="sr-only">{t("pub")}</dt>
                          <dd className="text-base font-medium leading-6 text-gray-700 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, language)}</time>
                          </dd>
                        </dl>

                        <div className="space-y-3">
                          <h2 className="text-shadow font-headings text-2xl font-bold leading-8 tracking-tight text-primary-700 antialiased text-shadow-gray-400/80 group-hover:text-secondary-600 dark:text-primary-300 dark:text-shadow-black dark:group-hover:text-secondary-400">
                            {title}
                          </h2>
                        </div>
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                        <ul
                          className="flex cursor-default flex-wrap group-hover:cursor-default"
                          onClick={(e) => e.preventDefault()} // Si l'action est nécessaire
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                            }
                          }}
                        >
                          {tags.map((t) => (
                            <li key={t} className="my-3">
                              <button
                                onClick={(e) => {
                                  // e.preventDefault(); // Empêche la propagation vers le Link
                                  handleTagClick(t)
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleTagClick(t)
                                  }
                                }}
                                className={`${
                                  useTagStore.getState().selectedTag === t
                                    ? "text-heading-700 dark:text-heading-400"
                                    : "text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-500"
                                } mr-3 cursor-pointer py-0.5 text-sm font-medium uppercase`}
                                aria-label={`View posts tagged ${t}`}
                              >
                                {`${t}`}
                              </button>
                            </li>
                          ))}
                        </ul>
                        <div className="prose max-w-none text-gray-700 dark:text-gray-400">
                          {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                        </div>
                      </Link>
                    </article>
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </div>
      {/* </motion.ul> */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            params={{ locale: locale }}
          />
        </div>
      )}
    </>
  )
}
