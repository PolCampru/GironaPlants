"use client";

import { FormEvent, use, useEffect, useState } from "react";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked, files } = event.target;
    const fieldName = name as keyof FormValuesType;
    const fieldValue = type === "checkbox" ? checked : value;

    if (fieldName === "files") {
      const newFiles = Array.from(files || []);
      const actualFiles = formValues[fieldName] as unknown as File[];
      const selectedFiles = [...actualFiles, ...newFiles];
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: { value: selectedFiles, error: "" },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: fieldValue,
      }));
    }

    const error = validateField(fieldName, fieldValue);
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const removeFile = (name: keyof FormValuesType, index: number) => {
    setFormValues((formValues) => {
      const newFiles = (formValues[name] as unknown as File[]).filter(
        (file, fileIndex) => fileIndex !== index
      );

      return {
        ...formValues,
        [name]: newFiles,
      };
    });
  };

  const resetForm = () => {
    setFormValues({ ...initialFormValues });
  };

  const validateField = (
    name: keyof FormValuesType,
    value: string | boolean | File[]
  ): string => {
    switch (name) {
      case "email":
        if (value === "") {
          return "El correo electrónico es obligatorio";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          return "Correo electrónico inválido";
        }
        return "";
      case "name":
        if (value === "") {
          return "Nombre y apellidos son obligatorios";
        }
        if ((value as string).trim().length < 2) {
          return "El nombre debe tener al menos 2 caracteres";
        }
        return "";
      case "privacyPolicy":
        if (value === false) {
          return "Debes aceptar la política de privacidad";
        }
        return "";
      case "phone":
        if (value === "") {
          return "El teléfono es obligatorio";
        }
        const phoneRegex = /^\d{9}$/;
        if (!phoneRegex.test(value as string)) {
          return "Teléfono inválido";
        }
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormValuesType, string>> = {};

    (Object.keys(formValues) as Array<keyof FormValuesType>).forEach((key) => {
      const error = validateField(
        key,
        formValues[key] as unknown as string | boolean | File[]
      );
      if (error) {
        errors[key] = error;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "files" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("files", file);
          });
        } else if (key === "privacyPolicy") {
          formData.append(key, value ? "true" : "false");
        } else {
          formData.append(key, String(value));
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
