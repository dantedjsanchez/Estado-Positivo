// Fetch and parse a Substack RSS feed entirely client-side.
// Substack feeds (https://<name>.substack.com/feed) include CORS headers in most cases.
// If CORS fails, we transparently fall back to a public read-only proxy.

export type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  excerpt: string;
  image?: string;
  creator?: string;
};

function pickTag(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  if (!m) return undefined;
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(html: string): string | undefined {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1];
}

function parseFeed(xml: string): SubstackPost[] {
  const items = xml.split(/<item[\s>]/i).slice(1).map((chunk) => "<item " + chunk.split("</item>")[0] + "</item>");
  return items.map((raw) => {
    const title = pickTag(raw, "title") ?? "";
    const link = pickTag(raw, "link") ?? "";
    const pubDate = pickTag(raw, "pubDate") ?? "";
    const creator = pickTag(raw, "dc:creator");
    const contentEncoded = pickTag(raw, "content:encoded");
    const description = pickTag(raw, "description") ?? "";
    const html = contentEncoded || description;
    const image = firstImage(html);
    const excerpt = stripHtml(description || html).slice(0, 220);
    return { title, link, pubDate, description, excerpt, image, creator };
  });
}

export async function fetchSubstack(feedUrl: string): Promise<SubstackPost[]> {
  const url = feedUrl.replace(/\/$/, "") + "/feed";

  // Try direct first.
  try {
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      const posts = parseFeed(text);
      if (posts.length) return posts;
    }
  } catch {
    // fall through to proxy
  }

  // CORS fallback: AllOrigins (free, no key) returns the raw body wrapped in JSON.
  const proxied = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxied);
  if (!res.ok) throw new Error(`Failed to fetch Substack feed (${res.status})`);
  const data = (await res.json()) as { contents?: string };
  if (!data.contents) throw new Error("Empty feed response");
  return parseFeed(data.contents);
}