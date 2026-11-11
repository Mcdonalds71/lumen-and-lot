import type { BriefSheet } from "@/lib/brief";

import type { BriefCredit } from "./brief-document";

export const briefFileName = "lumen-and-lot-brief.pdf";

export async function downloadBrief(
  sheet: BriefSheet,
  date: string,
  credit: BriefCredit,
): Promise<void> {
  const [{ pdf }, { BriefDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./brief-document"),
  ]);
  const blob = await pdf(
    <BriefDocument sheet={sheet} date={date} credit={credit} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = briefFileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url));
}
