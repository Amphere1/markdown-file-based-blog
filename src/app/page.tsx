import { getSortedPostsData } from "@/lib/posts";

export default async function Homepage() {
  const posts = getSortedPostsData();

  console.log("all posts", posts);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to my blog</h1>
      <p>check the terminal your posts bein loaded</p>
    </main>
  );
}
