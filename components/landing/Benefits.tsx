'use client'

import React, { useMemo, useState } from 'react'
import Container from './Container'
import Card from '../projectcard'
import landingData from '@/data/landingData'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import SectionContainer from '@/components/SectionContainer'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { sortByDate } from '../util/sortByDate'
import Pagination from '@/layouts/Pagination'
import siteMetadata from '@/data/siteMetadata'

type Props = {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
}

function Benefits ({params: { locale },posts }: Props) {
  const landingArray = landingData[locale]
  const { t } = useTranslation(locale, 'hero')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const featuredPosts = posts.filter((post) => post.featured);
  const sortedPosts = sortByDate(featuredPosts)
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const displayPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  }, [sortedPosts, currentPage, postsPerPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="divide-y">        
        <Container className="mx-auto px-4 py-12">
          <div className="mb-10 mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-heading dark:text-heading-dark font-logo text-center
                          text-shadow text-shadow-gray-400/80 dark:text-shadow-black">
              {t('title')} فسيفساء المغرب
            </h1>
            <p className="mt-4 text-lg lg:text-xl font-medium text-gray-700 dark:text-primary-100">
              {t('title_description')}
            </p>
          </div>      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {displayPosts.map((post) => (          
                <Card
                  key={post.title}
                  title={post.title}
                  description={post.summary!.length > 149 
                    ? `${post.summary!.substring(0, 149)}...` 
                    : post.summary}
                  imgSrc={post.banner}
                  href={`/${locale}/blog/${post.slug}`}
                />
              ))}         
          </div>
          {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                  params={{ locale: locale }}
                />
                </div>
              )}       

        </Container>
      </div>
    </>
  )
}

export default Benefits
