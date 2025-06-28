import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const { data } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      slug,
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

export async function getPostData(slug: string): Promise<FullPostData> {
  const fullPath = path.join(postDirectory, `${slug},md`);

  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    date: data.date,
    author: data.author,
    description: data.description,
    slug,
    contentHtml,
  };
}
