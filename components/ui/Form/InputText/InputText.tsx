"use client";
import { WaveGroup } from "./InputText.style";

interface InputTextProps {
  label: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errors?: string | null;
  [key: string]: any;
}

export const InputText = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errors = null,
  ...rest
}: InputTextProps) => {
  const hasError = Boolean(errors);

  return (
    <WaveGroup className={`wave-group ${hasError ? "has-error" : ""}`}>
      <input
        required={required}
        type="text"
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
            {char}
          </span>
        ))}
      </label>
      {hasError && (
        <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {errors}
        </div>
      )}
    </WaveGroup>
  );
};
