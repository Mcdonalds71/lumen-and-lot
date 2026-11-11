import { rates } from "@/content/rates";
import { displayPrice, formatMoney, type Money } from "@/lib/currency";
import { currencyPreference } from "@/lib/preferences";

export function Price({ price }: { price: Money }) {
  return (
    <span className="tabular-nums">
      {currencyPreference.values.map((option) => {
        const { money, converted } = displayPrice(price, option, rates);
        return (
          <span
            key={option}
            {...{ [currencyPreference.optionAttribute]: option }}
          >
            {converted && (
              <>
                <span aria-hidden>≈ </span>
                <span className="sr-only">About </span>
              </>
            )}
            {formatMoney(money)}
          </span>
        );
      })}
    </span>
  );
}
