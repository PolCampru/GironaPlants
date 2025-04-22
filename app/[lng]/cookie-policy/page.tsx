import CookiePolicyContent from "@/components/layout/Cookies/CookiePolicyContent";

interface CookiePolicyPageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function CookiePolicyPage({
  params,
}: CookiePolicyPageProps) {
  const { lng } = await params;

  return (
    <section>
      <CookiePolicyContent lng={lng} />
    </section>
  );
}
