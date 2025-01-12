import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import FullLayoutSectionContainer from '@/components/FullLayoutSectionContainer'
import { genPageMetadata } from 'app/[locale]/seo'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

interface LandingProps {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params }: LandingProps): Promise<Metadata> {
  const locale = (await params).locale
  const { t } = await createTranslation(locale, 'hero')
  return genPageMetadata({
    title: t('title'),
    params: { locale },
  })
}

export default async function Landing({ params: { locale } }: LandingProps) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)  
  return (
    <>
      <Hero params={{ locale }} />
      <FullLayoutSectionContainer>      
        <Benefits params={{ locale }} posts={filteredPosts}/>
      </FullLayoutSectionContainer>
    </>
  )
}
