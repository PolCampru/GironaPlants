"use client";

import React from "react";
import Image from "next/image";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { formatNumber, formatPrice } from "@/lib/format";
import { strapiMediaUrl } from "@/lib/strapi";
import useLocale from "@/hooks/useLocale";
import useUiLabels from "@/hooks/useUiLabels";
import { ItemType } from "@/types/Cart";
import { fill, type QuoteCopy } from "@/data/budgetContent";
import {
  BudgetItemWrapper,
  Chips,
  CloseButton,
  Info,
  MinimumWarning,
  QuantityCell,
  Thumb,
} from "./BudgetItem.style";
import Quantity from "./Quantity/Quantity";

interface BudgetItemProps {
  item: ItemType;
  copy: QuoteCopy;
  /** Drawer density: smaller thumbnail, tighter type. */
  compact?: boolean;
  deleteItem: (item: ItemType) => void;
  handleChangeQuantity: (id: number, quantity: number) => void;
}

/** One −/+ press moves by the minimum order, so a 50-unit line steps in 50s
 *  and a single-unit line steps in 1s. Exact figures are still typed. */
const stepFor = (minQuantity: number) => Math.max(1, minQuantity || 1);

const BudgetItem = ({
  item,
  copy,
  compact = false,
  deleteItem,
  handleChangeQuantity,
}: BudgetItemProps) => {
  const locale = useLocale();
  const labels = useUiLabels();

  const minQuantity = item.min_quantity || 0;
  const belowMinimum = minQuantity > 0 && item.quantity < minQuantity;
  // strapiMediaUrl returns "" for a media object with no url, and next/image
  // throws on an empty src — which would take the whole page down rather than
  // show a broken thumbnail. Cart items are rehydrated from localStorage, so a
  // partial image entry is a realistic input.
  const photoSrc = item.image?.[0] ? strapiMediaUrl(item.image[0]) : "";
  const minLabel = formatNumber(minQuantity, locale);
  const hasOffer = !!item.newPrice && !!item.oldPrice;

  return (
    <BudgetItemWrapper $compact={compact}>
      <Thumb $compact={compact}>
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt=""
            width={compact ? 56 : 88}
            height={compact ? 56 : 88}
          />
        ) : (
          <span data-initial aria-hidden="true">
            {item.genus?.charAt(0) ?? "?"}
          </span>
        )}
      </Thumb>

      <Info $compact={compact}>
        <div>
          <h3>{item.genus}</h3>
          {item.description && <p className="description">{item.description}</p>}
        </div>

        <Chips>
          {item.pot_size && <span data-chip>{item.pot_size}</span>}
          {item.height && <span data-chip>{item.height}</span>}
          {/* The drawer is a review surface and its rows are narrow: the
              resting minimum is dropped there, but a violated one still
              shows below. */}
          {minQuantity > 0 && !belowMinimum && !compact && (
            <span data-min>{fill(copy.minimumShort, { n: minLabel })}</span>
          )}
          {hasOffer && (
            <span data-offer>
              {item.discount ? `-${item.discount}%` : null}
              <span className="new-price">
                {formatPrice(item.newPrice, locale)}
              </span>
              <span className="old-price">
                {formatPrice(item.oldPrice, locale)}
              </span>
            </span>
          )}
        </Chips>

        {/* Was an absolutely positioned line kept at opacity 0 on every row. */}
        {belowMinimum && (
          <MinimumWarning>
            <FiAlertCircle aria-hidden="true" size={15} />
            {fill(copy.minimum, { n: minLabel })}
            <button
              type="button"
              onClick={() => handleChangeQuantity(item.id, minQuantity)}
            >
              {fill(copy.setToMin, { n: minLabel })}
            </button>
          </MinimumWarning>
        )}
      </Info>

      <QuantityCell>
        <Quantity
          value={item.quantity}
          minQuantity={minQuantity}
          step={stepFor(minQuantity)}
          invalid={belowMinimum}
          compact={compact}
          fewerLabel={copy.fewer}
          moreLabel={copy.more}
          inputLabel={fill(copy.quantityOf, { name: item.genus })}
          onChange={(newValue: number) =>
            handleChangeQuantity(item.id, newValue)
          }
        />
      </QuantityCell>

      <CloseButton
        type="button"
        onClick={() => deleteItem(item)}
        aria-label={`${labels.removeFromQuote}: ${item.genus}`}
      >
        <FiX aria-hidden="true" size={18} strokeWidth={2.2} />
      </CloseButton>
    </BudgetItemWrapper>
  );
};

export default BudgetItem;
