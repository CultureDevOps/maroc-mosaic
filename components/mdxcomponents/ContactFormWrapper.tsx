"use client"
import React from "react";
import { ModalBody } from "@/components/formspree/CBody";
import { useContactForm } from "@/components/formspree/useContactForm";

const ContactFormWrapper = () => {
  const {
    state,
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
  } = useContactForm();

  return (
    <div className="my-6 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">{t("contact")}</h2>
      <ModalBody
        state={state}
        handleSubmit={handleSubmit}
        name={name}
        email={email}
        address={address}
        message={message}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleMessageChange={handleMessageChange}
        handleAddressChange={handleAddressChange}
        t={t}
      />
    </div>
  );
};

export default ContactFormWrapper