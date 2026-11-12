import { describe, expect, it } from "vitest";

import remarkReadingTime, {
  countWords,
  type MdastNode,
  readingMinutes,
} from "@/lib/remark-reading-time.mjs";

function paragraph(text: string): MdastNode {
  return { type: "paragraph", children: [{ type: "text", value: text }] };
}

describe("countWords", () => {
  it("counts the words in text and inline code, at any depth", () => {
    const tree: MdastNode = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "Two words" }] },
        paragraph("A short   paragraph\nover two lines."),
        {
          type: "mdxJsxFlowElement",
          children: [
            {
              type: "paragraph",
              children: [
                { type: "text", value: "Run " },
                { type: "inlineCode", value: "npm run images" },
              ],
            },
          ],
        },
      ],
    };
    expect(countWords(tree)).toBe(2 + 6 + 4);
  });

  it("skips imports, exports and other code", () => {
    const tree: MdastNode = {
      type: "root",
      children: [
        { type: "mdxjsEsm", value: 'import { media } from "./media";' },
        { type: "code", value: "const notCounted = true;" },
        paragraph("Only these four words."),
      ],
    };
    expect(countWords(tree)).toBe(4);
  });
});

describe("readingMinutes", () => {
  it.each([
    [0, 1],
    [100, 1],
    [460, 2],
    [920, 4],
    [1150, 5],
  ])("reads %i words in %i minutes", (words, minutes) => {
    expect(readingMinutes(words)).toBe(minutes);
  });
});

describe("remarkReadingTime", () => {
  it("exports the reading time from the article", () => {
    const tree: MdastNode = {
      type: "root",
      children: [paragraph("word ".repeat(700))],
    };
    remarkReadingTime()(tree);

    const exported = tree.children?.at(-1);
    expect(exported).toMatchObject({
      type: "mdxjsEsm",
      value: "export const readingMinutes = 3;",
      data: {
        estree: {
          body: [
            {
              type: "ExportNamedDeclaration",
              declaration: {
                declarations: [
                  {
                    id: { name: "readingMinutes" },
                    init: { type: "Literal", value: 3 },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  });
});
