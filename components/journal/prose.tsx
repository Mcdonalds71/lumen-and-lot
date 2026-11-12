import type { MDXComponents } from "mdx/types";
import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";

function ProseLink({ href = "", children }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href as Route} className="link-underline">
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className="link-underline">
      {children}
    </a>
  );
}

export const prose: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-16 font-display text-display-sm text-balance md:mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-10 text-title">{children}</h3>,
  p: ({ children }) => <p className="mt-6 text-lead">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-6 list-disc space-y-3 pl-6 text-lead marker:text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 text-lead marker:font-mono marker:text-muted">
      {children}
    </ol>
  ),
  strong: ({ children }) => <strong className="font-medium">{children}</strong>,
  a: ProseLink,
};
