"use client";

import React, { useId } from "react";
import { FiAlertCircle } from "react-icons/fi";
import {
  ErrorText,
  Field,
  FieldLabel,
  Input,
  TextArea,
} from "./InputText.style";

interface InputTextProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "required" | "type"
  > {
  label: string;
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  errors?: string | null;
  as?: "input" | "textarea";
  placeholder?: string;
  type?: string;
  /** Make the field span the full width of a two-column form grid. */
  span?: boolean;
}

/**
 * A plain labelled field.
 *
 * The previous implementation floated a label made of one <span> per
 * character, each with its own transition delay, and the label had no
 * htmlFor — so none of these inputs had an accessible name, and the error
 * message was absolutely positioned over the top-right of the field.
 */
export const InputText = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errors = null,
  as = "input",
  placeholder,
  type = "text",
  span,
  ...rest
}: InputTextProps) => {
  const id = useId();
  const errorId = `${id}-error`;
  const hasError = Boolean(errors);

  // `rest` carries input-only attributes (autoComplete, inputMode, …); the
  // textarea branch takes the same object, so it is widened once here rather
  // than duplicating the whole prop list per element type.
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    required,
    $error: hasError,
    "aria-invalid": hasError || undefined,
    "aria-describedby": hasError ? errorId : undefined,
    ...rest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  return (
    <Field $span={span ?? as === "textarea"}>
      <FieldLabel htmlFor={id} $error={hasError}>
        {label}
        {required && (
          <span data-required aria-hidden="true">
            *
          </span>
        )}
      </FieldLabel>

      {as === "textarea" ? (
        <TextArea {...shared} />
      ) : (
        <Input type={type} {...shared} />
      )}

      {hasError && (
        <ErrorText id={errorId}>
          <FiAlertCircle aria-hidden="true" size={14} />
          {errors}
        </ErrorText>
      )}
    </Field>
  );
};
