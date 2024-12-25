"use client";

import { FormEvent, useState } from "react";
import { initialFormValues } from "@/data/Form";
import { FormValuesType } from "@/types/Form";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { FormType } from "@/types/Contact";

const useForm = () => {
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...initialFormValues,
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormValuesType, string>>
  >({});

  const { t } = useTranslation();
  const data = t("form", { returnObjects: true }) as FormType;

  const validateField = (
    name: keyof FormValuesType,
    value: string | boolean | File[]
  ): string => {
    switch (name) {
      case "company":
        if (value === "" && formValues.type.value === "company") {
          const input = data.inputs.find((input) => input.name === name);
          console.log(input);
          if (input && input.type !== "toggle" && "requiredError" in input) {
            return input.requiredError || "Company required";
          }
        }
        return "";
      case "email":
        if (value === "") {
          const input = data.inputs.find((input) => input.name === name);
          if (input && input.type !== "toggle" && "requiredError" in input) {
            return input.requiredError || "Email required";
          }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          const input = data.inputs.find((input) => input.name === name);
          if (input && input.type !== "toggle" && "formatError" in input) {
            return input.formatError || "Email format error";
          }
        }
        return "";
      case "name":
        if (value === "") {
          const input = data.inputs.find((input) => input.name === name);
          if (input && input.type !== "toggle" && "requiredError" in input)
            return input.requiredError || "Name required";
        }
        if ((value as string).trim().length < 2) {
          const input = data.inputs.find((input) => input.name === name);
          if (input && input.type !== "toggle" && "formatError" in input)
            return input.formatError || "Name format error";
        }
        return "";
      case "privacyPolicy":
        if (value === false) {
          return "Debes aceptar la política de privacidad";
        }
        return "";
      case "phone":
        if (value === "") {
          const input = data.inputs.find((input) => input.name === name);
          if (input && input.type !== "toggle" && "requiredError" in input) {
            return input.requiredError || "Phone required";
          }
        }
        const phoneRegex = /^\d{9}$/;
        if (!phoneRegex.test(value as string)) {
          const input = data.inputs.find((input) => input.name === name);
          if (input && input.type !== "toggle" && "formatError" in input) {
            return input.formatError || "Phone format error";
          }
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked, files } = event.target;
    const fieldName = name as keyof FormValuesType;

    let newValue: string | boolean | File[] = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "file") {
      const newFiles = Array.from(files || []);
      const existingFiles = (formValues[fieldName].value as File[]) || [];
      newValue = [...existingFiles, ...newFiles];
    }

    setFormValues((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value: newValue,
      },
    }));

    const error = validateField(fieldName, newValue);
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const removeFile = (fieldName: keyof FormValuesType, fileIndex: number) => {
    setFormValues((prev) => {
      const existingFiles = (prev[fieldName].value as File[]) || [];
      const newFiles = existingFiles.filter((_, index) => index !== fileIndex);

      return {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value: newFiles,
        },
      };
    });
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormValuesType, string>> = {};

    (Object.keys(formValues) as Array<keyof FormValuesType>).forEach((key) => {
      const fieldValue = formValues[key].value;
      const error = validateField(key, fieldValue);
      if (error) {
        errors[key] = error;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormValues({ ...initialFormValues });
    setFormErrors({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      Swal.fire({
        title: data.messages.inProgress.title,
        text: data.messages.inProgress.text,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const formData = new FormData();

      Object.entries(formValues).forEach(([key, field]) => {
        if (key === "files" && Array.isArray(field.value)) {
          (field.value as File[]).forEach((file) => {
            formData.append("files", file);
          });
        } else if (key === "privacyPolicy") {
          formData.append(key, field.value ? "true" : "false");
        } else {
          formData.append(key, String(field.value));
        }
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      Swal.fire({
        icon: "success",
        title: data.messages.success.title,
        text: data.messages.success.text,
      });

      resetForm();
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: data.messages.error.title,
        text: data.messages.error.text,
      });
    }
  };

  console.log(formValues);

  return {
    formValues,
    data,
    formErrors,
    handleChange,
    resetForm,
    removeFile,
    handleSubmit,
  };
};

export default useForm;
