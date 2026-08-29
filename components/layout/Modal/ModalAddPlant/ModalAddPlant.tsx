// ModalAddPlant.tsx
import useProducts from "@/hooks/useProducts";
import { ModalAddPlantWrapper, ModalFields } from "./ModalAddPlant.style";
import Button from "@/components/ui/Button/Button";
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
    newPlant.id = Date.now();

    handleAddToCart(newPlant as PlantType, "custom");
    closeModal();
  };

  // t() returns the bare key until the addProducts namespace loads, so
  // `dataAddProduct.modal` can be undefined. This modal is mounted by the
  // Navbar, which sits outside the ErrorBoundary — dereferencing it took the
  // whole client tree down.
  if (!dataAddProduct?.modal) return null;

  return (
    <ModalAddPlantWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <h2>{dataAddProduct.modal.title}</h2>
      <p>{dataAddProduct.modal.subtitle}</p>

      <ModalFields>
        {dataAddProduct.modal.inputs?.map((input) => (
        <InputText
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
      </ModalFields>

      <Button type="button" onClick={handleSubmit} fullWidth>
        {dataAddProduct.modal.button}
      </Button>
    </ModalAddPlantWrapper>
  );
};

export default ModalAddPlant;
