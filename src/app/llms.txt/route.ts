import { getAllPosts } from "../../../lib/posts";
import { site } from "../../../lib/site";

export function GET() {
  const posts = getAllPosts();

  const postList = posts
    .map(
      (p) =>
        `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description ?? "No description."}`
    )
    .join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} is a personal music journal by ${site.author.name}. It contains informal listening notes, album impressions, and small observations about music.

## Posts

${postList}

## Links

- Homepage: ${site.url}
- RSS Feed: ${site.url}/feed.xml
- Author: ${site.author.url}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
