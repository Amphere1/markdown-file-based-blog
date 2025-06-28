import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";


export async function generateStaticParams(){
    const posts = getSortedPostsData();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}


type props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: props) {
  const {slug} = params;

  try {
    const post = await getPostData(slug);

    return (
      <article className="prose prose-neutral dark:prose-invert mx-auto px-4">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">
          By {post.author} · {post.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
