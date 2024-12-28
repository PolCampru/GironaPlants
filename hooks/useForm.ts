"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import { initialFormValues } from "@/data/Form";
import { FormValuesType } from "@/types/Form";
import { FormType } from "@/types/Contact";

const useForm = () => {
  const { t } = useTranslation();
  const data = t("form", { returnObjects: true }) as FormType;

  const [formValues, setFormValues] =
    useState<FormValuesType>(initialFormValues);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormValuesType, string>>
  >({});

  const getInputConfig = (fieldName: keyof FormValuesType) => {
    return data.inputs.find((input) => input.name === fieldName);
  };

  const validateField = (
    fieldName: keyof FormValuesType,
    value: string | boolean | File[]
  ): string => {
    const config = getInputConfig(fieldName);

    const getErrorMessage = (errorKey: "requiredError" | "formatError") => {
      if (!config || config.type === "toggle") return "";
      return (config as any)[errorKey] ?? "";
    };

    switch (fieldName) {
      case "company": {
        if (value === "" && formValues.type.value === "company") {
          return getErrorMessage("requiredError") || "Company is required.";
        }
        return "";
      }

      case "name": {
        if (value === "") {
          return getErrorMessage("requiredError") || "Name is required.";
        }
        if ((value as string).trim().length < 2) {
          return getErrorMessage("formatError") || "Name is too short.";
        }
        return "";
      }

      case "email": {
        if (value === "") {
          return getErrorMessage("requiredError") || "Email is required.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          return getErrorMessage("formatError") || "Invalid email format.";
        }
        return "";
      }

      case "phone": {
        if (value === "") {
          return getErrorMessage("requiredError") || "Phone is required.";
        }
        const phoneRegex = /^\d{9}$/;
        if (!phoneRegex.test(value as string)) {
          return getErrorMessage("formatError") || "Invalid phone number.";
        }
        return "";
      }

      case "privacyPolicy": {
        if (value === false) {
          return "You must accept the privacy policy.";
        }
        return "";
      }

      default:
        return "";
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: Partial<Record<keyof FormValuesType, string>> = {};

    (Object.keys(formValues) as (keyof FormValuesType)[]).forEach((key) => {
      const value = formValues[key].value;
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    setFormErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormValues(initialFormValues);
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
          Swal.showLoading(null);
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
        throw new Error("Error sending form data");
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

  return {
    formValues,
    formErrors,
    data,
    handleChange,
    removeFile,
    resetForm,
    handleSubmit,
  };
};

export default useForm;
