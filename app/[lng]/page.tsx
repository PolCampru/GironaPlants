import axios from "axios";

export default async function Home({ params }: { params: { lng: string } }) {
  const { lng } = params;
  // const { data: pageData } = await axios.get(
  //   `${process.env.STRAPI_API_URL}/pages?locale=${lng}`
  // );
  return (
    <main style={{ paddingTop: "100px", height: "100vh" }}>
      Hello World! {lng}
    </main>
  );
}
