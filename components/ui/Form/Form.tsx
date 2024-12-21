"use client";

import { FormType } from "@/types/Contact";
import { useTranslation } from "react-i18next";
import { FormContainer, FormWrapper } from "./Form.style";
import Title from "../Title/Title";
import { InputText } from "./InputText/InputText";
import Checkbox from "../CheckBox/CheckBox";
import useForm from "@/hooks/useForm";
import React from "react";
import FilterToggle from "../FilterToggle/FilterToggle";
import FileSelector from "../FileSelector/FileSelector";

const Form = () => {
  const { handleChange, formValues, removeFile } = useForm();
  const { t } = useTranslation();
  const data = t("form", { returnObjects: true }) as FormType;
  return (
    <FormWrapper>
      <Title title={data.title} />
      <p className="subtitle">{data.subtitle}</p>
      <FormContainer>
        {data.inputs.map((input) => {
          if (formValues["type"] === "particular" && input.name === "company") {
            return null;
          } else if (input.type === "text") {
            return (
              <InputText
                key={input.name}
                label={input.label}
                required={input.required}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                name={input.name}
              />
            );
          } else if (input.type === "textarea") {
            return (
              <InputText
                key={input.name}
                label={input.label}
                required={input.required}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                name={input.name}
                as="textarea"
              />
            );
          } else if (input.type === "checkbox") {
            return (
              <Checkbox
                key={input.name}
                label={input.label}
                name={input.name}
                checked={formValues[input.name] as boolean}
                onChange={(e) => handleChange(e)}
                size="small"
              />
            );
          } else if (input.type === "toggle") {
            return (
              <FilterToggle
                key={input.name}
                options={input.options}
                selectedKey={formValues[input.name] as string}
                onChange={(value: string) =>
                  handleChange({
                    target: { name: input.name, value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
            );
          } else if (input.type === "file") {
            return (
              <FileSelector
                key={input.name}
                label={input.label}
                name={input.name}
                files={formValues[input.name] as File[]}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                removeFile={removeFile}
                remove={data.remove}
              />
            );
          }
        })}
        <button className="submit">{data.submit}</button>
      </FormContainer>
    </FormWrapper>
  );
};

export default Form;
