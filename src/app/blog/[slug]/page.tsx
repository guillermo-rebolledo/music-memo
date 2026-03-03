import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "../../../../lib/posts";
import { site } from "../../../../lib/site";
import { ReadingProgress } from "../../../components/reading-progress";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Entry not found" };
  }

  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: site.name,
      publishedTime: post.date,
      authors: [site.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div>
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground no-underline hover:text-primary"
        >
          <span>←</span>
          <span>Back</span>
        </Link>
        <p className="text-sm text-muted-foreground">Entry not found.</p>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: site.author.name,
      url: site.author.url,
    },
    url: `${site.url}/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <article className="pt-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <div className="mb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground no-underline hover:text-primary"
        >
          <span>←</span>
          <span>Back</span>
        </Link>
      </div>
      <header className="mb-3">
        <h1 className="mb-1 text-6xl font-serif">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {post.date && (
            <time
              dateTime={post.date}
              className="text-xs text-muted-foreground"
            >
              {post.date}
            </time>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
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
        </div>
      </header>
      <section
        className="text-[15px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
