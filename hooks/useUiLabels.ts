"use client";

import { getUiLabels, type UiLabels } from "@/data/uiLabels";
import useLocale from "./useLocale";

/** Locale-correct accessible names for icon-only controls. */
export default function useUiLabels(): UiLabels {
  return getUiLabels(useLocale());
}
