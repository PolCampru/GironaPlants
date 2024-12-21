"use client";
import { WaveGroup } from "./InputText.style";

interface InputTextProps {
  label: string;
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  errors?: string | null;
  as?: "input" | "textarea";
  [key: string]: any;
}

export const InputText = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errors = null,
  as = "input",
  ...rest
}: InputTextProps) => {
  const hasError = Boolean(errors);

  const Component = as;

  return (
    <WaveGroup className={`wave-group ${hasError ? "has-error" : ""}`}>
      <Component
        required={required}
        className="input"
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        {...rest}
      />
      <span className="bar"></span>
      <label className="label">
        {label.split("").map((char, index) => (
          <span
            key={index}
            className="label-char"
            style={{ "--index": index } as React.CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {required && (
          <span
            className="label-char"
            style={{ color: "orange", marginLeft: "0.2rem" }}
          >
            *
          </span>
        )}
      </label>
      {hasError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {errors}
        </div>
      )}
    </WaveGroup>
  );
};
