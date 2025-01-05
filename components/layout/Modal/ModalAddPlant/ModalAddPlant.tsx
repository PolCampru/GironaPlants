import useProducts from "@/hooks/useProducts";
import { ModalAddPlantWrapper } from "./ModalAddPlant.style";
import Title from "@/components/ui/Title/Title";
import { InputText } from "@/components/ui/Form/InputText/InputText";
import { PlantType } from "@/types/Products";
import { useState } from "react";

const ModalAddPlant = () => {
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

    handleAddToCart(plant as PlantType);
  };

  return (
    <ModalAddPlantWrapper>
      <Title title={dataAddProduct.modal.title} />

      {dataAddProduct.modal.inputs?.map((input) => (
        <InputText
          key={input.name}
          label={input.label}
          name={input.name}
          value={(plant[input.name as keyof PlantType] as string) || ""}
          error={formErrors[input.name]}
          onChange={() => handleChange}
          required={input.required}
        />
      ))}

      <button onClick={handleSubmit}>{dataAddProduct.button}</button>
    </ModalAddPlantWrapper>
  );
};

export default ModalAddPlant;
