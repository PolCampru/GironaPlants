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

  const { t } = useTranslation();
  const data = t("form", { returnObjects: true }) as FormType;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);

    const { name, type, value, checked, files } = event.target;

    console.log(name);
    console.log(type === "checkbox" ? checked : value);

    if (name === "files") {
      const newFiles = Array.from(files || []);
      const actualFiles = formValues[name] as File[];
      const selectedFiles = [...actualFiles, ...newFiles];
      setFormValues((formValues) => ({
        ...formValues,
        [name]: selectedFiles,
      }));
    } else {
      setFormValues({
        ...formValues,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const removeFile = (name: keyof FormValuesType, index: number) => {
    setFormValues((formValues) => {
      const newFiles = (formValues[name] as File[]).filter(
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      Swal.fire({
        title: "Enviando tu mensaje...",
        text: "Por favor espera un momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      Swal.fire({
        icon: "success",
        title: "¡Enviado!",
        text: "Tu mensaje se ha enviado correctamente.",
      });

      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al enviar el formulario. Intenta de nuevo.",
      });
    }
  };

  console.log(formValues);

  return {
    formValues,
    handleChange,
    resetForm,
    removeFile,
    handleSubmit,
    data,
  };
};

export default useForm;
