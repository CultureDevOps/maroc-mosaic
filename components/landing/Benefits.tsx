"use client"

import React, { useMemo, useState } from "react"
import Container from "./Container"
import Card from "@/components/projectcard"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"
import { CoreContent } from "pliny/utils/contentlayer"
import { Blog } from "contentlayer/generated"
import { POSTS_PER_PAGE } from "@/data/postsPerPage"
import { sortByDate } from "@/components/util/sortByDate"
import Pagination from "@/layouts/Pagination"
import PdfViewer from "@/components/pdf/PdfViewer"

type Props = {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
}

function Benefits({ params: { locale }, posts }: Props) {
  const { t } = useTranslation(locale, "hero")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const featuredPosts = posts.filter((post) => post.featured)
  const sortedPosts = sortByDate(featuredPosts)
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const displayPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return sortedPosts.slice(startIndex, endIndex)
  }, [sortedPosts, currentPage, postsPerPage])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="divide-y">
        <Container className="mx-auto px-4 py-12">
          <div className="mx-auto mb-10">
            <h1
              className="text-shadow text-center font-logo text-3xl font-bold text-heading text-shadow-gray-400/80
                dark:text-heading-dark dark:text-shadow-black lg:text-4xl"
            >
              {t("title")} فسيفساء المغرب
            </h1>
            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-primary-100 lg:text-xl">
              {t("title_description")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => (
              <Card
                key={post.title}
                title={post.title}
                description={
                  post.summary!.length > 149
                    ? `${post.summary!.substring(0, 149)}...`
                    : post.summary
                }
                imgSrc={post.banner}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
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
          <div className="mx-auto mb-12">
            <h2
              className="text-shadow text-3xl font-headings font-bold text-center text-heading dark:text-heading-dark mb-8
                text-shadow-gray-400/80 dark:text-shadow-black"
            >
              {t("catalog")}
            </h2>

            <div className="flex justify-center mb-6">
              <PdfViewer pdfUrl="/static/pdf/catalogue_MAROC_MOSAIC_compressed.pdf" />
            </div>

            <div className="flex justify-center">
              <a
                href="/static/pdf/catalogue_MAROC_MOSAIC.pdf"
                download
                className="inline-block bg-secondary-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-secondary-700
                  transition-all duration-200"
              >
                {t("dl_catalog")}
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Benefits
