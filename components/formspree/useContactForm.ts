import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

export const useContactForm = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const [wbFormId, setWbFormId] = useState<string>('264a0f12') // Valeur par défaut
  const [wbFormUuid, setWbFormUuid] = useState<string>('946edc24') // Valeur par défaut

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [succeeded, setSucceeded] = useState<boolean>(false)
  const [errors, setErrors] = useState<string | null>(null)

  const sendForm = async () => {
    setSubmitting(true)
    setErrors(null)
    try {
      const response = await fetch('https://denisgabriel.com/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, wb_form_id: wbFormId, wb_form_uuid: wbFormUuid }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi du formulaire.')
      }

      setSucceeded(true)
      toast.success(t('thanks'), { position: 'bottom-right' })
      // Réinitialisation après un délai
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        setSucceeded(false)
      }, 2000)
    } catch (error: any) {
      setErrors(error.message || 'Une erreur est survenue.')
      toast.error(t('error'))
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
    message,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
    t,
  }
}
