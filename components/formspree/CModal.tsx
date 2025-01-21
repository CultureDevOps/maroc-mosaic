import { useRef, useCallback } from "react"
import { useOuterClick } from "../util/useOuterClick"
import { motion } from "framer-motion"
import { MailIcon } from "../search/icons"

interface cModalProps {
  isOpen?: boolean
  onClose: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  disabled?: boolean
}

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export const CModal: React.FC<cModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null)

  useOuterClick(modalContentRef, onClose)

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    onClose()
  }, [disabled, onClose])

  if (!isOpen) {
    return null
  }

  const animationProps = {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
    transition: { duration: 0.5 }, // Durée de l'animation
  }

  return (
    <motion.div
      variants={variants}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/60 p-4 backdrop-blur-sm
        dark:bg-black/60"
      {...animationProps}
    >
      <div className="relative mx-auto my-3 size-full sm:h-auto sm:w-2/5 sm:max-w-xl">
        <div
          ref={modalContentRef}
          className="relative flex size-full flex-col rounded-2xl border border-white/30 dark:border-gray-800
            outline-none focus:outline-none lg:h-auto bg-gradient-to-b from-white/70 via-primary-200/40
            to-white/30 shadow-2xl backdrop-blur-lg dark:bg-gradient-to-b dark:from-gray-900/70
            dark:via-primary-950/50 dark:to-gray-900/40 dark:shadow-gray-900/70"
        >
          <div className="flex items-center justify-between p-6">
            <div className="text-heading dark:text-heading-dark ml-2 flex flex-row items-center text-3xl font-semibold">
              <span>
                <MailIcon className="mr-2 size-6" />
              </span>
              <div>{title}</div>
            </div>
            <button
              aria-label="contact"
              onClick={handleClose}
              className="ml-auto border-0 p-1 transition hover:opacity-70"
            >
              <p className="text-lg font-bold" style={{ fontSize: "1.5rem" }}>
                &times;
              </p>
            </button>
          </div>
          <div className="relative flex-auto p-6 border-t border-gray-100 dark:border-gray-800">
            {body}
          </div>
          <div className="flex flex-col gap-2 p-6">{footer}</div>
        </div>
      </div>
    </motion.div>
  )
}
