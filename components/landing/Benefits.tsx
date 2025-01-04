'use client'

import React from 'react'
import Container from './Container'
import Card from '../projectcard'
import landingData from '@/data/landingData'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import SectionContainer from '@/components/SectionContainer'

type Props = {
  params: { locale: LocaleTypes }
}

function Benefits ({params: { locale } }: Props) {
  const landingArray = landingData[locale]
  const { t } = useTranslation(locale, 'hero')

  return (
    <>
      <div className="divide-y">        
        <Container className="mx-auto px-4 py-12">
          <div className="mb-10 mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-heading font-headings text-center dark:text-white
                          text-shadow text-shadow-gray-400/80 dark:text-shadow-black">
              {t('title')}
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-primary-800 dark:text-primary-100">
              {t('title_description')}
            </p>
          </div>      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {landingArray.map((item) => (          
                <Card
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  imgSrc={item.imgSrc}
                  href={item.href}
                />
              ))}
          </div>
          
        </Container>
      </div>
    </>
  )
}

export default Benefits
