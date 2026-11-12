import Link from "next/link";

import { Area } from "@/components/preferences/area";
import { Price } from "@/components/preferences/price";
import type { Residence } from "@/content/schemas/residence";
import { cx } from "@/lib/cx";

import { residenceColumns } from "./residence-columns";
import { ResidenceStatus } from "./residence-status";

export function ResidenceRow({ residence }: { residence: Residence }) {
  return (
    <tr className="border-b border-rule align-baseline">
      <th
        scope="row"
        className={cx("py-5 font-normal", residenceColumns.residence.className)}
      >
        <Link
          href={`/residences/${residence.slug}`}
          className="link-reveal font-display text-title"
        >
          {residence.name}
        </Link>
        <span className="mt-1 block text-small text-muted">
          {residence.locality}, {residence.market.name}
        </span>
      </th>
      <td
        className={cx("py-5 tabular-nums", residenceColumns.bedrooms.className)}
      >
        {residence.bedrooms}
      </td>
      <td className={cx("py-5", residenceColumns.area.className)}>
        <Area squareMeters={residence.areaM2} />
      </td>
      <td className={cx("py-5", residenceColumns.price.className)}>
        <Price price={residence.price} />
      </td>
      <td className={cx("py-5", residenceColumns.status.className)}>
        <ResidenceStatus status={residence.status} />
      </td>
    </tr>
  );
}
