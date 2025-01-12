import Image from "../mdxcomponents/Image"
import Link from "../mdxcomponents/Link"
import { useParams } from "next/navigation"
import { LocaleTypes } from "app/[locale]/i18n/settings"

import { motion } from "framer-motion"
import { useTranslation } from "app/[locale]/i18n/client"

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

interface CardProps {
  title: string
  description: string
  imgSrc: string
  href: string
}

const Card: React.FC<CardProps> = ({ title, description, imgSrc, href }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "projects")
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      className="w-full p-2"
    >
      <Link
        href={href.startsWith("http") ? href : `/${locale}${href}`}
        aria-label={`${t("linkto")}${title}`}
        className={`${imgSrc && "h-full"} group overflow-hidden rounded-md`}
      >
        <Image
          alt={title}
          title={title}
          src={imgSrc}
          className="rounded-lg object-cover"
          width={544}
          height={306}
        />
        <div className="p-6">
          <h2 className="mb-3 font-headings text-2xl font-bold leading-8 tracking-tight text-heading group-hover:text-secondary-600 dark:text-heading-dark dark:group-hover:text-secondary-400">
            {title}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-700 dark:text-gray-400">{description}</p>

          <div className="dark:dark-text-link text-base font-medium leading-6 text-link group-hover:text-secondary-600 dark:group-hover:text-secondary-400">
            {t("read")} &rarr;
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
export default Card
