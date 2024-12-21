import { FormValuesType } from "./Form";

export type BoxDataType = {
  width: string;
  height: string;
  color?: string;
  borderRadiusTopLeft?: string;
  borderRadiusTopRight?: string;
  borderRadiusBottomLeft?: string;
  borderRadiusBottomRight?: string;
  imageUrl?: string;
};

export type FormType = {
  title: string;
  subtitle: string;
  remove: string;
  submit: string;
  inputs: (
    | {
        type: "toggle";
        name: keyof FormValuesType;
        options: { label: string; value: string }[];
      }
    | {
        type: "text" | "textarea" | "file" | "checkbox";
        label: string;
        name: keyof FormValuesType;
        required?: boolean;
        regex?: string;
      }
  )[];
};
