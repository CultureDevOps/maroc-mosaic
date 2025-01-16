import { MailIcon } from "../icons"
import { ModalBody } from "@/components/formspree/CBody"

interface EmailFormProps {
  state: any
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  name: string
  email: string
  message: string
  address: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  t: (key: string) => string
}

const EmailForm: React.FC<EmailFormProps> = ({
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
}) => (
  <>
    <div className="text-heading-400 ml-2 mt-5 flex flex-row items-center text-3xl font-semibold">
      <span>
        <MailIcon className="mr-1 size-6" />
      </span>
      <div>{t("title")}</div>
    </div>
    <div className="mx-2 my-16">
      <ModalBody
        handleSubmit={handleSubmit}
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
    </div>
  </>
)

export default EmailForm
