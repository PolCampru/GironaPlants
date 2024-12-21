import { useState } from "react";
import { initialFormValues } from "@/data/Form";
import { FormValuesType } from "@/types/Form";

const useForm = () => {
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...initialFormValues,
  });

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

  console.log(formValues);

  return {
    formValues,
    handleChange,
    resetForm,
    removeFile,
  };
};

export default useForm;
