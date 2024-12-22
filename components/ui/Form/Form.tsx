"use client";

import { FormContainer, FormWrapper } from "./Form.style";
import Title from "../Title/Title";
import { InputText } from "./InputText/InputText";
import Checkbox from "../CheckBox/CheckBox";
import useForm from "@/hooks/useForm";
import React from "react";
import FilterToggle from "../FilterToggle/FilterToggle";
import FileSelector from "../FileSelector/FileSelector";

const Form = () => {
  const {
    handleChange,
    formValues,
    removeFile,
    handleSubmit,
    data,
    formErrors,
  } = useForm();
  return (
    <FormWrapper>
      <Title title={data.title} />
      <p className="subtitle">{data.subtitle}</p>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {data &&
          data.inputs &&
          data.inputs.map((input) => {
            if (
              (formValues["type"] as unknown) === "particular" &&
              input.name === "company"
            ) {
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
                  errors={formErrors[input.name]}
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
                  errors={formErrors[input.name]}
                  name={input.name}
                  as="textarea"
                />
              );
            } else if (input.type === "checkbox") {
              console.log(formValues[input.name] as unknown as boolean);
              return (
                <Checkbox
                  key={input.name}
                  label={input.label}
                  name={input.name}
                  error={formErrors[input.name] !== ""}
                  checked={formValues[input.name] as unknown as boolean}
                  onChange={(e) => handleChange(e)}
                  size="small"
                />
              );
            } else if (input.type === "toggle") {
              return (
                <FilterToggle
                  key={input.name}
                  options={input.options}
                  selectedKey={formValues[input.name] as unknown as string}
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
                  files={formValues[input.name].value as File[]}
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
