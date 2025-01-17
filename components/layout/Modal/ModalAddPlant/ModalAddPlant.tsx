// ModalAddPlant.tsx
import useProducts from "@/hooks/useProducts";
import { ModalAddPlantWrapper } from "./ModalAddPlant.style";
import Title from "@/components/ui/Title/Title";
import { InputText } from "@/components/ui/Form/InputText/InputText";
import { PlantType } from "@/types/Products";
import { useState } from "react";

const ModalAddPlant = ({ closeModal }: { closeModal: () => void }) => {
  const { handleAddToCart, dataAddProduct } = useProducts();
  const [plant, setPlant] = useState<Partial<PlantType>>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    if (!dataAddProduct?.modal?.inputs) return;

    const newErrors: { [key: string]: string } = {};

    dataAddProduct.modal.inputs.forEach((input) => {
      if (input.required && !plant[input.name as keyof PlantType]) {
        newErrors[input.name] = input.requiredError || "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const newPlant = { ...plant } as PlantType;
    newPlant.id = Math.floor(Math.random() * 1000);

    handleAddToCart(newPlant as PlantType);
    closeModal();
  };

  return (
    <ModalAddPlantWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Title title={dataAddProduct.modal.title} />
      <p>{dataAddProduct.modal.subtitle}</p>

      {dataAddProduct.modal.inputs?.map((input) => (
        <InputText
          style={{ width: "100%" }}
          key={input.name}
          label={input.label}
          name={input.name}
          value={(plant[input.name as keyof PlantType] as string) || ""}
          errors={formErrors[input.name]}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<HTMLInputElement>)
          }
          required={input.required}
        />
      ))}

      <button onClick={handleSubmit}>{dataAddProduct.modal.button}</button>
    </ModalAddPlantWrapper>
  );
};

export default ModalAddPlant;
