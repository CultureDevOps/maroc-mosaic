import { Metadata } from 'next'
import Tag from '@/components/tag'
import tagData from 'app/[locale]/tag-data.json'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import SectionContainer from '@/components/SectionContainer'

type TagsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: TagsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'SEO')
  return genPageMetadata({
    title: 'Tags',
    description: t('tags'),
    params: { locale: locale },
  })
}

export default function Page({ params: { locale } }: TagsProps) {
  const tagCounts = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="pt-24">
      <SectionContainer>
        <div className="mb-6 flex-grow 
                      bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 
                      dark:bg-gradient-to-tr dark:from-gray-900/30 dark:via-primary-950/30 dark:to-gray-900/30 
                      backdrop-blur-sm rounded-lg p-8 shadow-lg 
                      border border-white/20 dark:border-gray-700/20
                      shadow-xl shadow-gray-400 dark:shadow-gray-950">
          <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
            <div className="space-x-2 pb-8 pt-6 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight 
            text-heading-700 dark:text-white sm:text-4xl sm:leading-10 
            md:border-r-2 md:px-6 md:text-6xl md:leading-14 font-headings antialiased
            text-shadow text-shadow-gray-400/80 dark:text-shadow-black">
                Tags
              </h1>
            </div>
            <div className="flex max-w-lg flex-wrap">
              {tagKeys.length === 0 && 'No tags found.'}
              {sortedTags.map((tag) => (
                <div key={tag} className="mb-2 mr-5 mt-2">
                  <Tag text={tag} />
                  <span className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                    {`(${tagCounts[tag]})`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
