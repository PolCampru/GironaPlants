import { FormValuesType } from "@/types/Form";

export const initialFormValues: FormValuesType = {
  type: {
    value: "company",
    error: "",
  },
  company: {
    value: "",
    error: "",
  },
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  phone: {
    value: "",
    error: "",
  },
  comment: {
    value: "",
    error: "",
  },
  files: {
    value: [],
    error: "",
  },
  privacyPolicy: {
    value: false,
    error: "",
  },
};
