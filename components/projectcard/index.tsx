import Image from '../mdxcomponents/Image'
import Link from '../mdxcomponents/Link'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

const Card: React.FC<CardProps> = ({ title, description, imgSrc, href }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'projects')
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'linear' }}
      className="w-full p-2"
    >
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md`}
      >
        {imgSrc &&
          (href ? (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              aria-label={`${t('linkto')}${title}`}
            >
              <Image
                alt={title}
                title={title}
                src={imgSrc}
                className="object-cover rounded-lg"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              title={title}
              src={imgSrc}
              className="object-cover rounded-lg"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl text-heading dark:text-heading-dark font-headings font-bold leading-8 tracking-tight
                        hover:text-secondary-600 dark:hover:text-secondary-400">
            {href ? (
              <Link
                href={href.startsWith('http') ? href : `/${locale}${href}`}
                aria-label={`${t('linkto')}${title}`}                
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-700 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              className="text-base font-medium leading-6 text-link dark:dark-text-link hover:text-secondary-600 dark:hover:text-secondary-400"
              aria-label={`${t('linkto')}${title}`}
            >
              {href.startsWith('http') ? `${t('visit')}` : `${t('read')}`} &rarr;
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
export default Card
