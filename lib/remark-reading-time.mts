export type MdastNode = {
  type: string;
  value?: string;
  children?: MdastNode[];
};

const wordsPerMinute = 230;
const proseNodes = new Set(["text", "inlineCode"]);

export function countWords(node: MdastNode): number {
  if (proseNodes.has(node.type)) {
    return node.value?.split(/\s+/u).filter(Boolean).length ?? 0;
  }
  return (node.children ?? []).reduce(
    (total, child) => total + countWords(child),
    0,
  );
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / wordsPerMinute));
}

function exportedNumber(name: string, value: number) {
  return {
    type: "mdxjsEsm",
    value: `export const ${name} = ${value};`,
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            specifiers: [],
            source: null,
            attributes: [],
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name },
                  init: { type: "Literal", value, raw: String(value) },
                },
              ],
            },
          },
        ],
      },
    },
  };
}

export default function remarkReadingTime() {
  return (tree: MdastNode) => {
    const minutes = readingMinutes(countWords(tree));
    tree.children = [
      ...(tree.children ?? []),
      exportedNumber("readingMinutes", minutes),
    ];
  };
}
