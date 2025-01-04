import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import { devOps, cloud, services, experience } from '@/data/benefits'
import FullLayoutSectionContainer from '@/components/FullLayoutSectionContainer'
import { genPageMetadata } from 'app/[locale]/seo'

interface LandingProps {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: LandingProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'projects')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function Landing({ params: { locale } }: LandingProps) {
  const { t } = await createTranslation(locale, 'home')
  return (
    <>
      <Hero params={{ locale: locale }} />
      <FullLayoutSectionContainer>      
        <Benefits params={{ locale: locale }}/>
      </FullLayoutSectionContainer>
    </>
  )
}
