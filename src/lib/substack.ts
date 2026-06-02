// Fetch and parse a Substack RSS feed entirely client-side.
// Substack feeds (https://<name>.substack.com/feed) include CORS headers in some cases.
// If CORS fails, we transparently fall back to public read-only proxies.

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

async function fetchWithTimeout(input: RequestInfo, init?: RequestInit & { timeout?: number }): Promise<Response> {
  const { timeout = 8000, ...rest } = init ?? {};
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(input, { ...rest, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function tryFetch(url: string): Promise<SubstackPost[] | undefined> {
  try {
    const res = await fetchWithTimeout(url, { timeout: 6000 });
    if (!res.ok) return undefined;
    const text = await res.text();
    const posts = parseFeed(text);
    return posts.length ? posts : undefined;
  } catch {
    return undefined;
  }
}

async function tryProxy(url: string, proxyUrl: string): Promise<SubstackPost[] | undefined> {
  try {
    const res = await fetchWithTimeout(proxyUrl, { timeout: 10000 });
    if (!res.ok) return undefined;
    // Some proxies wrap the body in JSON { contents: "..." }, others return raw XML
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      const data = (await res.json()) as { contents?: string };
      if (!data.contents) return undefined;
      const posts = parseFeed(data.contents);
      return posts.length ? posts : undefined;
    }
    const text = await res.text();
    const posts = parseFeed(text);
    return posts.length ? posts : undefined;
  } catch {
    return undefined;
  }
}

export async function fetchSubstack(feedUrl: string): Promise<SubstackPost[]> {
  const url = feedUrl.replace(/\/$/, "") + "/feed";

  // 1. Direct fetch (works when Substack sends CORS headers)
  const direct = await tryFetch(url);
  if (direct) return direct;

  // 2. corsproxy.io (returns raw body)
  const proxy1 = await tryProxy(url, `https://corsproxy.io/?${encodeURIComponent(url)}`);
  if (proxy1) return proxy1;

  // 3. allorigins (returns JSON { contents })
  const proxy2 = await tryProxy(url, `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
  if (proxy2) return proxy2;

  throw new Error("Failed to fetch Substack feed from all sources");
}
