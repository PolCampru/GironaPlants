import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/CheckBox/CheckBox";
import axios from "axios";
import Home from "@/components/specific/Home/Home";

export default async function HomePage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = params;
  // const { data: pageData } = await axios.get(
  //   `${process.env.STRAPI_API_URL}/pages?locale=${lng}`
  // );
  const handleChange = () => {
    console.log("Checkbox changed");
  };
  return (
    <main style={{ paddingTop: "100px", height: "100vh" }}>
      <Home></Home>
    </main>
  );
}
