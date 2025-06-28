import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Async homepage that lists all blog posts
export default async function HomePage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 My Markdown Blog</h1>

      <ul className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Link href={`/posts/${post.slug}`}>
                <CardTitle className="text-lg hover:underline">
                  {post.title}
                </CardTitle>
              </Link>
              <CardDescription>
                {post.date} · {post.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {post.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </ul>
    </main>
  );
}
