"use client"

import { useContactModal } from "./store"
import { Toaster } from "react-hot-toast"
import { CModal } from "./CModal"
import { ModalBody } from "./CBody"
import { useContactForm } from "./useContactForm"
import { JSX } from "react"

export const ContactModal = (): JSX.Element => {
  const contactModal = useContactModal()
  const {
    state,
    handleSubmit,
    name,
    email,
    message,
    adress,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
    handleAdressChange,
    t,
  } = useContactForm()

  return (
    <>
      <CModal
        title={t("title")}
        isOpen={contactModal.isOpen}
        onClose={contactModal.onClose}
        body={
          <ModalBody
            state={state}
            handleSubmit={handleSubmit}
            name={name}
            email={email}
            message={message}
            adress={adress}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handleMessageChange={handleMessageChange}
            handleAdressChange={handleAdressChange}
            t={t}
          />
        }
      />
      <Toaster />
    </>
  )
}
