import React from "react";
import { ContactWrapper, FormWrapper, ImagesWrapper } from "./Contact.style";
import { BoxData } from "@/data/Contact";
import MyBox from "@/components/ui/Box/Box";
import Form from "@/components/ui/Form/Form";
import { containerVariants } from "@/animations/AboutUs";
import { formVariants, imagesVariants } from "@/animations/Contact";

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
