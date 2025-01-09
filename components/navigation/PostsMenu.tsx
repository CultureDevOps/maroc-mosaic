'use client'

import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { Blog, allBlogs } from 'contentlayer/generated'
import { Fragment, useRef, useState, useMemo } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { useOuterClick } from '../util/useOuterClick'
import { useParams, usePathname } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { motion } from 'framer-motion'
import { sortByDate } from '@/components/util/sortByDate'

// type BlogMenuProps = {
//   className: string
// }

const BlogMenu = (/*{ className }: BlogMenuProps*/) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const sections = pathname!.split('/')
  const lastSection = sections[sections.length - 1]
  const filterSections = pathname !== `/${locale}` && pathname !== '/'

  const posts = useMemo(() => {
    const filteredPosts = allBlogs.filter((a) => a.language === locale);
    const sortedPosts = sortByDate(filteredPosts);
    return sortedPosts;
  }, [locale]) as Blog[];

  const mainBlog = useMemo(
    () => allBlogs.filter((a) => a.language === locale),
    [locale]
  ) as Blog[]

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

  const renderBlogLink = (post: Blog) => {
    const { slug, date, title, banner, tags, language } = post;
    return (
      <Radio key={slug} value={slug}>
        <MenuItem>
          {({ focus }) => (
            <div
            className={`${
              focus
                  ? 'bg-primary-400/50 dark:bg-primary-500/50'
                  : 'hover:bg-primary-400/50 dark:hover:bg-gray-600/50'
              } group flex w-full items-start gap-4 p-1 rounded-md text-sm 
              hover:backdrop-blur-sm
              text-white hover:text-secondary-500
              text-shadow text-shadow-black
              font-headings antialiased
              `}
            >
              <div className="">
                <Image
                  src={post.banner || ""} // Ajoutez une propriété "image" dans vos données "post"
                  alt={title}
                  width={100}
                  height={83}
                  priority={true}
                  loading="eager"
                  className="rounded-md"
                />    
              </div>          
              <Link href={`/${locale}/blog/${slug}`} onClick={closeMenu} className="break-words text-md font-medium">
                {title}
              </Link>
            </div>
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
                className={`hidden font-medium ${
                  isSelected
                    ? 'text-secondary-500'
                    : 'text-white hover:text-secondary-500'
                } relative rounded-md px-2 py-2 font-medium transition-colors sm:block`}
              >
                <span className="relative z-10 font-bold text-shadow text-shadow-black">{t('menu')}</span>
                {isSelected && (
                  <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-md shadow-md border border-white/10
                                      shadow-lg shadow-gray-950"
                  ></motion.span>
                )}
              </div>
            </MenuButton>
          </div>
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-[-10px]"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-[10px]"
          >
            <MenuItems
              className="absolute right-0 z-50 mt-2 origin-top-right divide-y divide-gray-100 rounded-md 
                        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-sm
                        flex flex-col gap-1 p-2"
              as="div"
            >
              <RadioGroup>
                <div className="p-1 rounded-md 
                              grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-1
                              w-full min-w-[300px] sm:max-w-[300px] md:max-w-[600px] lg:max-w-[900px] xl:max-w-[1200px]
                              overflow-auto
                              bg-gradient-to-br from-gray-200/95 via-primary-200/95 to-gray-200/95
                              dark:bg-gradient-to-br dark:from-gray-900/95 dark:via-primary-900/95 dark:to-gray-900/95                                
                              shadow-xl shadow-gray-400 dark:shadow-gray-950">
                  {posts.map(
                    (post) => post.language === locale && renderBlogLink(post)
                  )}
                </div>
              </RadioGroup>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </>
  )
}

export default BlogMenu
