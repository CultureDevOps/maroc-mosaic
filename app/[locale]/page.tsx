import FullLayoutSectionContainer from "@/components/FullLayoutSectionContainer"
import Benefits from "@/components/landing/Benefits"
import Hero from "@/components/landing/Hero"
import { allBlogs } from "contentlayer/generated"
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer"
import { LocaleTypes } from "./i18n/settings"

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}
export default async function Page({ params }: PageProps) {
  const locale = (await params).locale
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)
  return (
    <>
      <Hero params={{ locale }} />
      <FullLayoutSectionContainer>
        <Benefits params={{ locale }} posts={filteredPosts} />
      </FullLayoutSectionContainer>
    </>
  )
}
