import { ItemType } from "@/types/Cart";

/**
 * Persisting the enquiry in Strapi.
 *
 * Until now every quote and every contact message existed only as an email:
 * unsearchable, unaggregatable and gone the day the mailbox is. This writes
 * the same enquiry to the `quote-request` collection, which is what makes
 * questions like "which genus gets quoted most" answerable at all.
 *
 * Writing needs an API token with create permission on that collection —
 * STRAPI_TOKEN is read-only, so a separate STRAPI_WRITE_TOKEN is used when it
 * exists (see .env.example and deploy/README.md).
 */

export type QuoteRequestInput = {
  kind: "quote" | "contact";
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  customerType?: string;
  comment?: string;
  pageLocale?: string;
  items: ItemType[];
};

/** The cart, minus what is noise in a record: images and pricing that is
 *  already in the catalogue. Keeps the stored JSON small and readable. */
function summariseItems(items: ItemType[]) {
  return items.map((item) => ({
    id: item.id,
    genus: item.genus,
    description: item.description,
    pot_size: item.pot_size,
    height: item.height,
    quantity: item.quantity,
    discounted: Boolean(item.discount),
  }));
}

export async function recordQuoteRequest(
  input: QuoteRequestInput
): Promise<void> {
  const baseUrl = process.env.STRAPI_BASE_URL;
  const token = process.env.STRAPI_WRITE_TOKEN || process.env.STRAPI_TOKEN;

  if (!baseUrl || !token) {
    console.warn("recordQuoteRequest: Strapi not configured, enquiry not stored");
    return;
  }

  const body = {
    data: {
      kind: input.kind,
      name: input.name,
      company: input.company || null,
      email: input.email || null,
      phone: input.phone || null,
      customer_type: input.customerType || null,
      comment: input.comment || null,
      page_locale: input.pageLocale || null,
      species_count: input.items.length,
      unit_count: input.items.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
      ),
      items: summariseItems(input.items),
      submitted_at: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(`${baseUrl}/api/quote-requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      // A 403 here means the token is missing `create` on quote-request.
      console.error("recordQuoteRequest: Strapi rejected the enquiry", {
        status: response.status,
        body: (await response.text()).slice(0, 500),
      });
    }
  } catch (error) {
    console.error("recordQuoteRequest: could not store the enquiry", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
