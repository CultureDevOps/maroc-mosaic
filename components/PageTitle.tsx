import { ReactNode } from "react"

interface PageTitleProps {
  children: ReactNode
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h1
      className="text-3xl text-heading dark:text-heading-dark font-extrabold leading-9 tracking-tight sm:text-4xl
        sm:leading-10 md:text-5xl md:leading-14"
    >
      {children}
    </h1>
  )
}
