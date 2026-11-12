import { Label } from "@/components/ui/label";
import { formatLongDate, formatReadingTime } from "@/lib/time";

type ArticleMetaProps = {
  publishedOn: string;
  readingMinutes: number;
  className?: string;
};

export function ArticleMeta({
  publishedOn,
  readingMinutes,
  className,
}: ArticleMetaProps) {
  return (
    <Label as="p" className={className}>
      <time dateTime={publishedOn}>{formatLongDate(publishedOn)}</time> ·{" "}
      {formatReadingTime(readingMinutes)}
    </Label>
  );
}
