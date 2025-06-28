import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

// Async homepage that lists all blog posts
export default async function HomePage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 My Markdown Blog</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">
              By {post.author} · {post.date}
            </p>
            <p className="text-gray-700">{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
