"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
import CookieConsentManager from "./CookieConsentManager"

// Contexte pour le consentement des cookies
const CookieConsentContext = createContext({
  consent: null as boolean | null, // Type explicite
  setConsent: (consent: boolean) => {},
})

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsentState] = useState<boolean | null>(null)

  useEffect(() => {
    const storedConsent = Cookies.get("cookie_consent")
    if (storedConsent) {
      setConsentState(storedConsent === "true")
    }
  }, [])

  const setConsent = (consent: boolean) => {
    setConsentState(consent)
    Cookies.set("cookie_consent", consent.toString(), { expires: 365 })

    // Déclenche un événement personnalisé pour notifier d'autres composants
    window.dispatchEvent(new Event("cookieConsentChange"))
  }

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent }}>
      <CookieConsentManager />
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => useContext(CookieConsentContext)
