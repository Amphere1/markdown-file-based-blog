import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const postDirectory = path.join(process.cwd(), "posts");

type postMetaData = {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
};

export function getSortedPostsData(): postMetaData[] {
  const fileNames = fs.readdirSync(postDirectory);

  const allPostsData = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx")) // ✅ support both
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, ""); // ✅ remove .md or .mdx
      const fullPath = path.join(postDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        author: data.author,
        description: data.description,
      };
    });

  allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allPostsData;
}

export type FullPostData = postMetaData & {
  contentHtml: string;
} 

export async function getPostData(slug: string) {
  const mdPath = path.join(postDirectory, `${slug}.md`);
  const mdxPath = path.join(postDirectory, `${slug}.mdx`);

  let filePath = "";
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    throw new Error("Post file not found");
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
    } satisfies Options)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author,
    description: data.description,
    contentHtml,
  };
}

