"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  FieldGrid,
  FormCard,
  FormContainer,
  FormHead,
  FormTitle,
  Label,
  SubmitRow,
} from "./Form.style";
import { InputText } from "./InputText/InputText";
import Checkbox from "../CheckBox/CheckBox";
import Button from "../Button/Button";
import useForm from "@/hooks/useForm";
import type { PageHeading } from "@/data/pageHeadings";
import type { FormType } from "@/types/Contact";
import FilterToggle from "../FilterToggle/FilterToggle";
import FileSelector from "../FileSelector/FileSelector";

/** Lets the browser and password managers fill these correctly. */
const AUTOCOMPLETE: Partial<Record<string, string>> = {
  company: "organization",
  name: "name",
  email: "email",
  phone: "tel",
};

const Form = ({
  heading,
  content,
  headingLevel = "h2",
}: {
  heading: PageHeading;
  content: FormType;
  /** h1 on /contact, where the form is the page; h2 on /budget. */
  headingLevel?: "h1" | "h2";
}) => {
  const {
    handleChange,
    formValues,
    removeFile,
    handleSubmit,
    data,
    formErrors,
  } = useForm(content);

  const inputs = data?.inputs ?? [];
  const isParticular = (formValues["type"]?.value as unknown) === "particular";

  // Short text fields sit in the two-column grid; everything else spans it.
  const gridInputs = inputs.filter(
    (input) => input.type === "text" && !(isParticular && input.name === "company")
  );
  const restInputs = inputs.filter((input) => input.type !== "text");

  const renderInput = (input: (typeof inputs)[number]) => {
    switch (input.type) {
      case "text":
        return (
          <InputText
            key={input.name}
            label={input.label}
            required={input.required}
            type={
              input.name === "email"
                ? "email"
                : input.name === "phone"
                  ? "tel"
                  : "text"
            }
            autoComplete={AUTOCOMPLETE[input.name] ?? "off"}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            errors={formErrors[input.name]}
            name={input.name}
          />
        );
      case "textarea":
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
            placeholder={input.placeholder}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            key={input.name}
            label={input.label}
            name={input.name}
            error={formErrors[input.name] as unknown as boolean}
            checked={formValues[input.name].value as unknown as boolean}
            onChange={(e) => handleChange(e)}
            size="small"
          />
        );
      case "toggle":
        return (
          <FilterToggle
            key={input.name}
            options={input.options ?? []}
            label={input.label}
            selectedKey={formValues[input.name].value as unknown as string}
            onChange={(value: string) =>
              handleChange({
                target: { name: input.name, value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
        );
      case "file":
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
            hint={input.hint}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormCard>
      {/* Server-rendered, so the form's heading is in the HTML. */}
      <FormHead>
        <Label>{heading.label}</Label>
        <FormTitle as={headingLevel}>{heading.title}</FormTitle>
        <p>{heading.lead}</p>
      </FormHead>

      <FormContainer
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {restInputs.filter((i) => i.type === "toggle").map(renderInput)}

        <FieldGrid>{gridInputs.map(renderInput)}</FieldGrid>

        {restInputs.filter((i) => i.type !== "toggle").map(renderInput)}

        <SubmitRow>
          {/* Was a bare <button className="submit"> with no type, inside a
              form — it defaulted to submit but shared none of the site's
              button styling. */}
          <Button type="submit">
            {data.submit}
            <FiArrowRight aria-hidden="true" />
          </Button>
          {data.responseNote && <p>{data.responseNote}</p>}
        </SubmitRow>
      </FormContainer>
    </FormCard>
  );
};

export default Form;
