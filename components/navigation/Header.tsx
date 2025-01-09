'use client'

import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '../mdxcomponents/Link'
import MobileNav from './MobileNav'
import ThemeSwitch from '../theme/ThemeSwitch'
import LangSwitch from '../langswitch'
import SearchButton from '../search/SearchButton'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import SectionContainer from '../SectionContainer'
import PostsMenu from './PostsMenu'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()

  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false);

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mise à jour de l'état `selectedPath` uniquement côté client
  useEffect(() => {
    if (pathname) {
      setSelectedPath(pathname)
    }
  }, [pathname])
  const [navShow, setNavShow] = useState<boolean>(false)

  const onToggleNav = () => {
    setNavShow((prev) => {
      if (prev) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return !prev
    })
  }


  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <div className="bg-primary-800
                      border-b border-primary-900
                      shadow-xl shadow-gray-950 transition-shadow duration-300">
        <SectionContainer>
          <div className="flex justify-between items-center py-2">
            <Link
              href={`/${locale}/`}
              aria-label={siteMetadata.headerTitle}
              className="flex items-center w-full space-x-3 flex-grow mr-4"
            >
              <div className="block sm:hidden xl:block flex-shrink-0">
                <Image
                  alt="logo"
                  src={siteMetadata.siteLogo ?? ''}
                  width={40}
                  height={40}
                  priority={true}
                  sizes="(min-width: 768px) 60px, 40px"
                  className="object-contain"
                  quality={80}
                />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="text-xl lg:text-2xl md:text-md font-logo antialiased whitespace-nowrap 
                                  hidden md:block max-w-xs lg:max-w-sm text-white
                                  text-shadow text-shadow-black pb-3">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}

            </Link>
            <div className="flex items-center space-x-4 leading-5 sm:space-x-6 font-headings antialiased">
              {headerNavLinks
                .filter((link) => !!link.href) // Vérifie que `link.href` est défini
                .map((link) => {
                  const isSelected =
                    (selectedPath === `/${locale}` || selectedPath === '/') && link.href === '/landing'
                      ? true
                      : selectedPath?.includes(link.href as string)
                  return (
                    <Link
                      key={link.title}
                      href={`/${locale}${link.href}`}
                      className="flex transform-gpu items-center 
                                space-x-1 transition-transform duration-300
                                whitespace-nowrap text-md font-medium"
                      aria-label={link.title}
                    >
                      <div
                        className={`hidden font-medium ${isSelected
                          ? 'text-secondary-500'
                          : 'text-white hover:text-secondary-500'
                          } relative rounded-md px-2 py-2 font-medium transition-colors sm:block`}
                      >
                        <span className="relative z-10 font-bold text-shadow text-shadow-black">
                          {t(`${link.title.toLowerCase()}`)}
                        </span>
                        {isSelected && (
                          <motion.div
                            layoutId="tab"
                            transition={{
                              type: 'spring',
                              duration: 0.4,
                              damping: 25,
                              stiffness: 300,
                            }}
                            className="absolute inset-0 z-0 rounded-md shadow-md border border-white/10
                                      shadow-lg shadow-gray-950"
                          ></motion.div>
                        )}
                      </div>
                    </Link>

                  )
                })}
              <PostsMenu /> {/* Intégration du menu déroulant */}
              {/* <AuthorsMenu className="hidden sm:block" /> */}
              {/* <div className="hidden md:flex items-center space-x-4"> */}
              <SearchButton />
              {/* Espace réservé si React n'est pas encore monté */}
              {!mounted ? (
                <div className="w-6 h-6 rounded-full"></div> // Placeholder
              ) : (
                <ThemeSwitch />
              )}
              <LangSwitch />
              {/* </div> */}
              {/* Mobile menu toggle button */}
              <button
                className="sm:hidden z-50 text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
                aria-label={t('showmenu')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />

                </svg>
              </button>
            </div>
          </div>
        </SectionContainer>
      </div>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
    </header>
  )
}

export default Header
