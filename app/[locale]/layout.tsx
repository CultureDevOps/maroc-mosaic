import "css/tailwind.css"
import "pliny/search/algolia.css"

import { Open_Sans } from "next/font/google"
import { Scheherazade_New } from "next/font/google"
import { Amiri_Quran } from "next/font/google"
import { Analytics, AnalyticsConfig } from "pliny/analytics"
import { SearchProvider } from "@/components/search/SearchProvider"
import Header from "@/components/navigation/Header"
import Footer from "@/components/navigation/Footer"
import siteMetadata from "@/data/siteMetadata"
import { maintitle, maindescription } from "@/data/localeMetadata"
import { ThemeProvider } from "@/components/theme/ThemeContext"
import { Metadata } from "next"
import { dir } from "i18next"
import { LocaleTypes, locales } from "./i18n/settings"
import TwSizeIndicator from "@/components/helper/TwSizeIndicator"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const open_sans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const scheherazadeNew = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-scheherazade-new",
})

const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amiri-quran",
})

export async function generateMetadata({
  params,
}: {
  params: { locale: LocaleTypes }
}): Promise<Metadata> {
  const locale = (await params).locale
  // const generateOptimizedUrl = (src: string): string => {
  //   const basePath = process.env.NEXT_PUBLIC_SITE_URL || siteMetadata.siteUrl;;
  //   return src.includes('http') ? src : `${basePath}/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`
  // };
  // const imageUrl = generateOptimizedUrl(siteMetadata.socialBanner);
  const imageUrl = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URL}${siteMetadata.socialBanner}?format=auto&width=1200`
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: "./",
      siteName: maintitle[locale],
      images: [imageUrl],
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: "./",
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      description: maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: "summary_large_image",
      images: [imageUrl],
    },
    icons: {
      icon: "/static/favicons/favicon-32x32.png",
      apple: "/static/favicons/apple-touch-icon.png",
      shortcut: "/static/favicons/android-chrome-192x192.png",
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params
}) {
  const theme = siteMetadata.theme || "system"
  const locale = (await params).locale
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${open_sans.variable} ${scheherazadeNew.variable} ${amiriQuran.variable} scroll-smooth ${theme}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.siteMetadata = { theme: '${process.env.NEXT_PUBLIC_SITE_THEME}' };
                `,
          }}
        />
        <Script src="/static/js/theme-switcher.js" strategy="beforeInteractive" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className="bg-gradient-to-r from-primary-300 via-primary-200 via-20% to-gray-100 text-black antialiased
          dark:from-primary-800/90 dark:via-gold-950/60 dark:via-75% dark:to-primary-900 dark:text-white"
      >
        <ThemeProvider>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SearchProvider>
            <div id="background" className="h-screen w-full overflow-y-auto">
              <div className="sticky top-0 z-50 flex flex-col justify-between font-sans">
                <Header />
              </div>
              <div className="flex flex-col justify-between font-sans">
                <main className="mb-auto">{children}</main>
              </div>
              <div className="flex flex-col justify-between font-sans">
                <Footer />
              </div>
            </div>
          </SearchProvider>
          <TwSizeIndicator />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
