import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useParams } from "next/navigation"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"

export const useContactForm = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const [wbFormId, setWbFormId] = useState<string>("264a0f12") // Valeur par défaut
  const [wbFormUuid, setWbFormUuid] = useState<string>("946edc24") // Valeur par défaut

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [succeeded, setSucceeded] = useState<boolean>(false)
  const [errors, setErrors] = useState<string | null>(null)

  const sendForm = async () => {
    setSubmitting(true)
    setErrors(null)

    const formData = new FormData()
    formData.append("wb_form_id", wbFormId)
    formData.append("wb_form_uuid", wbFormUuid)
    formData.append("message", "")
    formData.append("wb_input_0", "Nom")
    formData.append("wb_input_0", name)
    formData.append("wb_input_1", "E-mail")
    formData.append("wb_input_1", email) // Label pour le champ 'Email'
    formData.append("wb_input_2", "Adresse")
    formData.append("wb_input_2", address) // Label pour l'adresse
    formData.append("wb_input_3", "Message")
    formData.append("wb_input_3", message) // Valeur du champ 'Email'

    try {
      const response = await fetch("https://denisgabriel.com/contact/", {
        method: "POST",
        body: formData, // FormData directement dans le body
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l’envoi du formulaire.")
      }

      setSucceeded(true)
      toast.success(t("thanks"), { position: "bottom-right" })
      // Réinitialisation après un délai
      setTimeout(() => {
        setName("")
        setEmail("")
        setAddress("")
        setMessage("")
        setSucceeded(false)
      }, 2000)
    } catch (error: any) {
      setErrors(error.message || "Une erreur est survenue.")
      toast.error(t("error"))
    } finally {
      setSubmitting(false)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    sendForm()
  }

  return {
    state: { submitting, succeeded, errors },
    handleSubmit,
    name,
    email,
    address,
    message,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
    handleAddressChange,
    t,
  }
}
