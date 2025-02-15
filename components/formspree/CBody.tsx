import { FormInputs } from "./FormInputs"

interface ModalBodyProps {
  state: any
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  name: string
  email: string
  message: string
  address: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  t: (key: string) => string
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  state,
  handleSubmit,
  name,
  email,
  message,
  address,
  handleNameChange,
  handleEmailChange,
  handleMessageChange,
  handleAddressChange,
  t,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} autoComplete="on">
        <FormInputs
          name={name}
          email={email}
          message={message}
          address={address}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleMessageChange={handleMessageChange}
          handleAddressChange={handleAddressChange}
          state={state}
          t={t}
        />
        <button
          type="submit"
          disabled={state.submitting || !name || !email || !message}
          data-te-ripple-init
          data-te-ripple-color="light"
          className="text-md border-1 w-full rounded-full bg-primary-600 dark:bg-primary-500 px-4 py-2 font-semibold
            text-white transition hover:bg-primary-700 dark:hover:bg-primary-600 hover:cursor-pointer
            text-shadow text-shadow-black shadow-sm shadow-gray-950"
        >
          {t("button")}
        </button>
      </form>
    </div>
  )
}
