import { ValidationError } from '@formspree/react'
import { StringFieldDef } from 'contentlayer2/source-files'

interface FormInputsProps {
  name: string
  email: string
  message: string
  adress: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleAdressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: any
  t: (key: string) => string
}

export const FormInputs: React.FC<FormInputsProps> = ({
  name,
  email,
  message,
  adress,
  handleNameChange,
  handleEmailChange,
  handleMessageChange,
  handleAdressChange,
  state,
  t,
}) => {
  return (
    <>
      <input type="hidden" name="wb_form_id" value="264a0f12"></input>
      <input type="hidden" name="wb_form_uuid" value="946edc24"></input>
      <input
        required
        autoComplete="name"
        id="fullName"
        type="text"
        name="wb_input_0"
        placeholder={t('name')}
        value={name}
        onChange={handleNameChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />
      <input
        required
        autoComplete="email"
        id="email"
        type="email"
        name="wb_input_1"
        placeholder={t('mail')}
        value={email}
        onChange={handleEmailChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-base text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />
      <input
        required
        autoComplete="adresse"
        id="adresse"
        type="text"
        name="wb_input_2"
        placeholder={t('Adresse')}
        value={adress}
        onChange={handleAdressChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />      
      {/* <ValidationError prefix="Email" field="email" errors={state.errors} /> */}
      <textarea
        required
        id="message"
        name="wb_input_3"
        placeholder={t('message')}
        value={message}
        onChange={handleMessageChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-base text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />
      {/* <ValidationError prefix="Message" field="message" errors={state.errors} /> */}
    </>
  )
}
