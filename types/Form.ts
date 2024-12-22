export type FormField<T> = {
  value: T;
  error: string;
};

export type FormValuesType = {
  type: FormField<string>;
  company: FormField<string>;
  name: FormField<string>;
  email: FormField<string>;
  phone: FormField<string>;
  comment: FormField<string>;
  files: FormField<File[]>;
  privacyPolicy: FormField<boolean>;
};
