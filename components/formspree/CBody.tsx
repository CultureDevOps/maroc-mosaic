import { FormInputs } from './FormInputs'

interface ModalBodyProps {
  state: any
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  name: string
  email: string
  message: string,
  adress: string,
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleAdressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  t: (key: string) => string
}

export const ModalBody: React.FC<ModalBodyProps> = ({
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
}) => {
  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} autoComplete="on">
        <FormInputs
          name={name}
          email={email}
          message={message}
          adress={adress}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleMessageChange={handleMessageChange}
          handleAdressChange={handleAdressChange}
          state={state}
          t={t}
        />
        <button
          type="submit"
          disabled={state.submitting || !name || !email || !message}
          data-te-ripple-init
          data-te-ripple-color="light"
          className="text-md w-full rounded-full border-2 bg-primary-500 px-4 py-2 font-semibold text-white transition hover:opacity-80"
        >
          {t('button')}
        </button>
      </form>
    </div>
  )
}
