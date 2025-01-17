"use client"

import Image from "next/image"
import Link from "next/link"
import { Blog, allBlogs } from "contentlayer/generated"
import { Fragment, useRef, useState, useMemo, useEffect } from "react"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from "@headlessui/react"
import { useOuterClick } from "../util/useOuterClick"
import { useParams, usePathname } from "next/navigation"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"
import { motion } from "framer-motion"
import { sortByDate } from "@/components/util/sortByDate"

const BlogMenu = (/*{ className }: BlogMenuProps*/) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")
  const pathname = usePathname()
  const sections = pathname!.split("/")
  const lastSection = sections[sections.length - 1]
  const filterSections = pathname !== `/${locale}` && pathname !== "/"

  const posts = useMemo(() => {
    const filteredPosts = allBlogs.filter((a) => a.language === locale && a.featured)
    const sortedPosts = sortByDate(filteredPosts)
    return sortedPosts
  }, [locale]) as Blog[]

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  const isSelected = posts.some((post) => post.slug.includes(lastSection)) && filterSections

  useEffect(() => {
    const backgroundElement = document.getElementById("background")
    if (backgroundElement) {
      backgroundElement.style.overflow = isOpen ? "hidden" : "auto"
    }
  }, [isOpen])

  const renderBlogLink = (post: Blog) => {
    const { slug, title } = post
    return (
      <Radio key={slug} value={slug}>
        <MenuItem>
          {({ focus }) => (
            <Link
              href={`/${locale}/blog/${slug}`}
              onClick={closeMenu}
              className={`${
              focus
                  ? "bg-primary-400/50 dark:bg-primary-500/50"
                  : "hover:bg-primary-400/50 dark:hover:bg-gray-600/50"
              } group flex w-full items-start gap-1 rounded-md p-4 hover:backdrop-blur-sm`}
            >
              <div className="h-[56px] min-w-[100px]">
                <Image
                  src={post.banner || ""}
                  alt={title}
                  width={100}
                  height={56}
                  priority={true}
                  loading="eager"
                  className="rounded-md"
                />
              </div>
              <div
                className="text-md text-shadow break-words font-headings font-bold text-primary-700 antialiased
                  text-shadow-gray-400/80 group-hover:text-secondary-500 dark:text-white dark:text-shadow-black"
              >
                {title}
              </div>
            </Link>
          )}
        </MenuItem>
      </Radio>
    )
  }

  return (
    <>
      <div ref={menubarRef} /*className={className}*/>
        <Menu as="div" className="relative inline-block text-left font-medium leading-5">
          <div>
            <MenuButton
              className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
              onClick={toggleMenu}
            >
              <div
                className={`hidden font-medium ${isSelected ? "text-secondary-500" : "text-white hover:text-secondary-500"}
                  relative rounded-md p-2 font-medium transition-colors sm:block`}
              >
                <span className="text-shadow relative z-10 font-bold text-shadow-black">
                  {t("menu")}
                </span>
                {isSelected && (
                  <motion.span
                    layoutId="tab"
                    transition={{ type: "spring", duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-md border border-white/10 shadow-lg shadow-gray-950"
                  ></motion.span>
                )}
              </div>
            </MenuButton>
          </div>
          <Transition
            show={isOpen}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-[-10px]"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-[10px]"
          >
            <div>
              <MenuItems
                className="absolute left-1/2 z-50 mt-2 flex max-w-screen-md origin-top-right -translate-x-1/2 flex-col gap-1
                  divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 backdrop-blur-sm
                  focus:outline-none"
                as="div"
                modal={false}
              >
                <RadioGroup>
                  <div
                    className="grid w-full min-w-[300px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-1 overflow-auto
                      rounded-md bg-gradient-to-br from-gray-200/80 via-primary-200/80 to-gray-200/80 p-1 shadow-xl
                      shadow-gray-400 dark:bg-gradient-to-br dark:from-gray-900/80 dark:via-primary-900/80
                      dark:to-gray-900/80 dark:shadow-gray-950 sm:max-w-[300px] md:max-w-[900px] lg:max-w-[900px]
                      xl:max-w-[1200px]"
                  >
                    {posts.map((post) => post.language === locale && renderBlogLink(post))}
                  </div>
                </RadioGroup>
              </MenuItems>
            </div>
          </Transition>
        </Menu>
      </div>
    </>
  )
}

export default BlogMenu
