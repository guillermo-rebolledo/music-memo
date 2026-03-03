import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { site } from "../../lib/site";

export default function Home() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: site.name,
    description: site.description,
    url: site.url,
    author: {
      "@type": "Person",
      name: site.author.name,
      url: site.author.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${site.url}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nothing to see here (yet!)
        </p>
      ) : (
        <ul className="divide-y divide-border" role="list">
          {posts.map((post) => (
            <li key={post.slug} className="py-3">
              <Link
                href={`/blog/${post.slug}`}
                className="block no-underline text-inherit"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="m-0 text-sm font-medium">{post.title}</h2>
                  {post.date && (
                    <time
                      dateTime={post.date}
                      className="text-xs text-muted-foreground"
                    >
                      {post.date}
                    </time>
                  )}
                </div>
                {post.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2 text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
