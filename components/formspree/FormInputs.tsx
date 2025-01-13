import { ValidationError } from "@formspree/react"
import { StringFieldDef } from "contentlayer2/source-files"

interface FormInputsProps {
  name: string
  email: string
  message: string
  address: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: any
  t: (key: string) => string
}

export const FormInputs: React.FC<FormInputsProps> = ({
  name,
  email,
  message,
  address,
  handleNameChange,
  handleEmailChange,
  handleMessageChange,
  handleAddressChange,
  state,
  t,
}) => {
  return (
    <>
      <input
        required
        autoComplete="name"
        id="fullName"
        type="text"
        name="wb_input_0"
        placeholder={t("name")}
        value={name}
        onChange={handleNameChange}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 
                  text-black shadow-sm outline-none transition duration-300 focus:border-blue-500 
                  focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-neutral-900 
                  disabled:opacity-70 dark:border-gray-700 dark:bg-gray-800 dark:text-white 
                  dark:focus:border-terracota-500 dark:focus:ring-terracota-300"
      />
      <input
        required
        autoComplete="email"
        id="email"
        type="email"
        name="wb_input_1"
        placeholder={t("mail")}
        value={email}
        onChange={handleEmailChange}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-black shadow-sm outline-none transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-300"
      />
      <input
        required
        autoComplete="street-address"
        id="adresse"
        type="text"
        name="wb_input_2"
        placeholder={t("Adresse")}
        value={address}
        onChange={handleAddressChange}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-black shadow-sm outline-none transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-300"
      />
      <textarea
        required
        id="message"
        name="wb_input_3"
        placeholder={t("message")}
        value={message}
        onChange={handleMessageChange}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-black shadow-sm outline-none transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500 dark:focus:ring-purple-300"
      />
    </>

  )
}
