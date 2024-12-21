import React from "react";
import { ContactWrapper, FormWrapper, ImagesWrapper } from "./Contact.style";
import { BoxData } from "@/data/Contact";
import MyBox from "@/components/ui/Box/Box";
import Form from "@/components/ui/Form/Form";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const imagesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  return (
    <ContactWrapper
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FormWrapper variants={formVariants}>
        <Form />
      </FormWrapper>
      <ImagesWrapper variants={imagesVariants}>
        {BoxData.map((box, index) => (
          <MyBox
            key={index}
            width={box.width}
            height={box.height}
            color={box.color}
            borderRadiusTopLeft={box.borderRadiusTopLeft}
            borderRadiusTopRight={box.borderRadiusTopRight}
            borderRadiusBottomLeft={box.borderRadiusBottomLeft}
            borderRadiusBottomRight={box.borderRadiusBottomRight}
            imageUrl={box.imageUrl}
          />
        ))}
      </ImagesWrapper>
    </ContactWrapper>
  );
};

export default Contact;
