"use client";
import { PhoneAndEmailType } from "@/types/Contact";
import React from "react";
import { useTranslation } from "react-i18next";
import { PhoneAndEmailWrapper } from "./PhoneAndEmail.style";
import Loader from "@/components/ui/Loader/Loader";

const PhoneAndEmail = () => {
  const { t } = useTranslation(["contact"]);
  const data = t("contact", { returnObjects: true }) as PhoneAndEmailType;
  if (!data.phone) return <Loader />;
  return (
    <PhoneAndEmailWrapper>
      <div
        className="container-contact"
        onClick={() => window.open(`tel:${data.phone.text}`)}
      >
        <div className="container-img-title">
          <img src="/images/phone.svg" alt={data.phone.title} />
          <h2>{data.phone.title}</h2>
        </div>
        <p>{data.phone.text}</p>
      </div>
      <div
        className="container-contact"
        onClick={() => window.open(`mailto:${data.email.text}`)}
      >
        <div className="container-img-title">
          <img src="/images/mail.svg" alt={data.email.title} />
          <h2>{data.email.title}</h2>
        </div>
        <p>{data.email.text}</p>
      </div>
    </PhoneAndEmailWrapper>
  );
};

export default PhoneAndEmail;
