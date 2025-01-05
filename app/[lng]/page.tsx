import Home from "@/components/specific/Home/Home";

export default async function HomePage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = await params;

  return (
    <main>
      <Home />
    </main>
  );
}
