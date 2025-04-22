"use client";

import React from "react";
import {
  ContactWrapper,
  ContainerButton,
  ContainerText,
} from "./Contact.style";
import { ContactHomeProps } from "@/types/Home";
import Link from "next/link";
import Image from "next/image";

const Contact = ({ data }: { data: ContactHomeProps }) => {
  return (
    <ContactWrapper
      style={{
        backgroundImage: `url('/path/to/your/image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ContainerText>
        <h2>{data.contact_title}</h2>
        <h3>{data.contact_subtitle}</h3>
      </ContainerText>
      <ContainerButton>
        <div className="background" />
        <Link href={`/${data.locale}/contact`} className="link">
          <p>{data.contact_button}</p>
          <Image
            src="/images/products/arrowIcon.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </Link>
      </ContainerButton>
    </ContactWrapper>
  );
};

export default Contact;
