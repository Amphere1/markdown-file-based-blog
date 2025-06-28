import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// You can add more custom components here
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (props) => (
      <Link {...props} className="text-blue-600 underline hover:text-blue-800" />
    ),
  };
}
