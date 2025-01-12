import 'css/prism.css'
import 'katex/dist/katex.css'
import { Metadata } from 'next'
import { components } from '@/components/mdxcomponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import PostGalleryLayout from '@/layouts/PostGalleryLayout'
import siteMetadata from '@/data/siteMetadata'
import { maintitle } from '@/data/localeMetadata'
import { notFound } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import SectionContainer from '@/components/SectionContainer'
import FullLayoutSectionContainer from '@/components/FullLayoutSectionContainer'

interface PageProps {
  params: Promise<{
    slug: string[]
    locale: LocaleTypes
  }>
}

const defaultLayout = 'PostGalleryLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
  PostGalleryLayout,
}

async function getPostFromParams({
  params,
}: {
  params: Promise<{ slug: string[]; locale: LocaleTypes }>
}): Promise<any> {
  const { slug, locale } = await params
  const dslug = decodeURI(slug.join('/'))
  const post = allBlogs.filter((p) => p.language === locale).find((p) => p.slug === dslug) as Blog

  if (!post) {
    return null
  }

  if (post?.series) {
    const seriesPosts = allBlogs
      .filter((p) => p.language === locale && p.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          language: p.language,
          isCurrent: p.slug === post.slug,
        }
      })
    if (seriesPosts.length > 0) {
      return { ...post, series: { ...post.series, posts: seriesPosts } }
    }
  }

  return post
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | undefined> {
  const { slug, locale } = await params
  const dslug = decodeURI(slug.join('/'))
  const post = allBlogs.find((p) => p.slug === dslug && p.language === locale) as Blog
  if (!post) {
    return
  }
  const author = allAuthors.filter((a) => a.language === locale).find((a) => a.default === true)
  const authorList = post.authors || author
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors
      .filter((a) => a.language === locale)
      .find((a) => a.slug.includes(author))
    return coreContent(authorResults as Authors)
  })
  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    const basePath = process.env.NEXT_PUBLIC_SITE_URL || siteMetadata.siteUrl
    return {
      // url: img.includes('http') ? img : `${basePath}/_next/image?url=${encodeURIComponent(img)}&w=1200&q=75`,
      url: img.includes('http')
        ? img
        : process.env.CLOUD_FRONT_URL + img + '?format=auto&width=1200',
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: maintitle[locale],
      locale: post.language,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ogImages,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))
  return paths
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params
  const dslug = decodeURI(slug.join('/'))
  // Filter out drafts in production + locale filtering
  const sortedCoreContents = allCoreContent(
    sortPosts(allBlogs.filter((p) => p.language === locale))
  )
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === dslug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = await getPostFromParams({ params })
  const author = allAuthors.filter((a) => a.language === locale).find((a) => a.default === true)
  const authorList = post.authors || author
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors
      .filter((a) => a.language === locale)
      .find((a) => a.slug.includes(author))
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <FullLayoutSectionContainer>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Layout
          content={mainContent}
          authorDetails={authorDetails}
          next={next}
          prev={prev}
          params={{ locale }}
        >
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        </Layout>
      </>
    </FullLayoutSectionContainer>
  )
}
