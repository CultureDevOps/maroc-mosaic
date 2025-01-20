"use client"

import Image from "next/image"
import { useParams, usePathname } from "next/navigation"
import siteMetadata from "@/data/siteMetadata"
import headerNavLinks from "@/data/headerNavLinks"
import Link from "../mdxcomponents/Link"
import MobileNav from "./MobileNav"
import ThemeSwitch from "../theme/ThemeSwitch"
import LangSwitch from "../langswitch"
import SearchButton from "../search/SearchButton"
import { useTranslation } from "app/[locale]/i18n/client"
import type { LocaleTypes } from "app/[locale]/i18n/settings"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import SectionContainer from "../SectionContainer"
import PostsMenu from "./PostsMenu"
import AuthorsMenu from "./AuthorsMenu"

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")
  const pathname = usePathname()

  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  const [mounted, setMounted] = useState(false)

  const spanRef = useRef<HTMLSpanElement>(null)

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
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return !prev
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header>
      <div className="border-b border-primary-900 bg-primary-800 shadow-xl shadow-gray-950 transition-shadow duration-300">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div className="flex items-center justify-between py-2">
            <Link
              href={`/${locale}/`}
              aria-label={siteMetadata.headerTitle}
              className="mr-4 flex w-full grow items-center space-x-2"
            >
              <div className="block shrink-0 sm:hidden xl:block">
                <Image
                  alt="logo"
                  src={siteMetadata.siteLogo ?? ""}
                  width={40}
                  height={40}
                  priority={true}
                  sizes="(min-width: 768px) 60px, 40px"
                  className="object-contain"
                  quality={80}
                />
              </div>
              {typeof siteMetadata.headerTitle === "string" ? (
                <div
                  className="md:text-md text-shadow hidden max-w-xs whitespace-nowrap pb-3 font-logo text-xl text-white
                    antialiased text-shadow-black md:block lg:max-w-sm lg:text-2xl"
                >
                  {siteMetadata.headerTitle}{" "}
                  <span className="hidden xl:inline-block">{siteMetadata.headerSubTitle}</span>
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </Link>
            <div className="flex items-center space-x-2 whitespace-nowrap font-headings leading-5 antialiased sm:space-x-4">
              {headerNavLinks
                .filter((link) => !!link.href) // Vérifie que `link.href` est défini
                .map((link) => {
                  const isHome = selectedPath === `/${locale}` || selectedPath === "/"
                  const isExactMatch = selectedPath === `/${locale}${link.href}` // Vérifie une correspondance exacte
                  const isSelected = isExactMatch || (isHome && link.href === "/") // Assure que seule la bonne page est marquée

                  return (
                    <Link
                      key={`${locale}-${link.title}`} // Clé unique pour le re-render après un changement de langue
                      href={`/${locale}${link.href}`}
                      className="text-md flex transform-gpu items-center font-medium transition-transform duration-300"
                      aria-label={link.title}
                    >
                      <div
                        className={`hidden font-medium ${isSelected ? "text-secondary-500" : "text-white hover:text-secondary-500"}
                        relative rounded-md p-2 font-medium transition-colors sm:block`}
                      >
                        <span className="text-shadow relative z-10 font-bold text-shadow-black">
                          {t(`${link.title.toLowerCase()}`)}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.div
                          layoutId="tab" // Animation liée à un ID unique
                          transition={{
                            type: "spring",
                            duration: 0.4,
                            damping: 25,
                            stiffness: 300,
                          }}
                          className="absolute inset-0 z-0 rounded-md border border-white/10 shadow-lg shadow-gray-950"
                        ></motion.div>
                      )}
                    </Link>
                  )
                })}
              <PostsMenu /> {/* Intégration du menu déroulant */}
              <AuthorsMenu className="hidden sm:block" />
              {/* <div className="hidden md:flex items-center space-x-4"> */}
              <SearchButton />
              {/* Espace réservé si React n'est pas encore monté */}
              {!mounted ? (
                <div className="size-6 rounded-full"></div> // Placeholder
              ) : (
                <ThemeSwitch />
              )}
              <LangSwitch />
              {/* </div> */}
              {/* Mobile menu toggle button */}
              <button
                className="z-50 text-gray-900 dark:text-gray-100 sm:hidden"
                onClick={onToggleNav}
                aria-label={t("showmenu")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="size-8"
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
        </section>
      </div>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
    </header>
  )
}

export default Header
