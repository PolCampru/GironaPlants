import { FormValuesType } from "./Form";

export type FormType = {
  title: string;
  subtitle: string;
  remove: string;
  submit: string;
  messages: {
    inProgress: {
      title: string;
      text: string;
    };
    success: {
      title: string;
      text: string;
    };
    error: {
      title: string;
      text: string;
    };
  };
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
        requiredError?: string;
        formatError?: string;
      }
  )[];
};

export type PhoneAndEmailType = {
  phone: {
    title: string;
    text: string;
  };
  email: {
    title: string;
    text: string;
  };
};
