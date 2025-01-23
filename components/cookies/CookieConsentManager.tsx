"use client"

import React, { useEffect, useState } from "react"
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider"
import { useTranslation } from "app/[locale]/i18n/client"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useParams } from "next/navigation"

const CookieConsentManager = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")
  const { consent, setConsent } = useCookieConsent()
  const [isConsentChecked, setIsConsentChecked] = useState(false)

  useEffect(() => {
    setIsConsentChecked(true) // Vérifie le consentement après l'hydratation
  }, [consent])

  if (!isConsentChecked) {
    return null // Empêche le rendu avant que le consentement ne soit vérifié
  }

  return (
    consent === null && (
      <div
        className="fixed bottom-0 inset-x-0 flex items-center justify-center border-b border-primary-900 bg-primary-800
          shadow-xl shadow-gray-950 text-white p-2 z-50"
      >
        <p className="text-sm mr-2">{t("cookie_consent")}</p>
        <button
          onClick={() => setConsent(true)}
          className="bg-green-700 px-3 py-1 text-sm rounded mx-2"
        >
          {t("cookie_consent_accept")}
        </button>
        <button onClick={() => setConsent(false)} className="bg-red-700 px-3 py-1 text-sm rounded">
          {t("cookie_consent_decline")}
        </button>
      </div>
    )
  )
}

export default CookieConsentManager
