import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

function parsePostFile(fileName: string): PostMeta & { content: string } {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const slug = (data.slug as string) ?? fileName.replace(/\.md$/, "");

  const rawDate = data.date as string | Date | undefined;
  const date =
    typeof rawDate === "string"
      ? rawDate
      : rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : "";

  return {
    slug,
    title: (data.title as string) ?? slug,
    date,
    description: data.description as string | undefined,
    tags: (data.tags as string[]) ?? [],
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = fileNames.map((fileName) => parsePostFile(fileName));

  return posts
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date < b.date ? 1 : -1;
    })
    .map(({ content: _content, ...meta }) => meta);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const match = fileNames
    .map((fileName) => parsePostFile(fileName))
    .find((p) => p.slug === slug);

  if (!match) {
    return null;
  }

  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(match.content);

  const contentHtml = processedContent.toString();

  const { content: _content, ...meta } = match;

  return {
    ...meta,
    contentHtml,
  };
}

