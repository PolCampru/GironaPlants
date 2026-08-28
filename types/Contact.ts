import { FormValuesType } from "./Form";

/** One field in the quote form, configured in the locale form.json files. */
export type FormInput = {
  type: "toggle" | "text" | "textarea" | "file" | "checkbox";
  name: keyof FormValuesType;
  label: string;
  required?: boolean;
  requiredError?: string;
  formatError?: string;
  placeholder?: string;
  /** Small helper line under a file field's label. */
  hint?: string;
  options?: { label: string; value: string }[];
};

export type FormType = {
  /** Only used where the form is embedded without a server-rendered head. */
  label?: string;
  title?: string;
  subtitle?: string;
  remove: string;
  submit: string;
  /** Reassurance next to the submit button, e.g. "Reply within 24-48 h". */
  responseNote?: string;
  messages: {
    inProgress: { title: string; text: string };
    success: { title: string; text: string };
    error: { title: string; text: string };
  };
  inputs: FormInput[];
};

export type ContactAsideType = {
  title: string;
  phone: { title: string; text: string };
  email: { title: string; text: string };
  hours: { title: string; text: string };
  location: { title: string; text: string };
  languagesTitle: string;
  languages: string[];
  catalogue: { title: string; text: string; button: string };
};

export type PhoneAndEmailType = {
  phone: { title: string; text: string };
  email: { title: string; text: string };
};

export type ContactPageProps = {
  params: Promise<{ lng: string }>;
};
