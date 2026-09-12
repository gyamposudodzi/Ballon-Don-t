import type { MetadataRoute } from "next";
import { HUBS } from "@/data/categories";
import { nominees } from "@/data/nominees";
import { stories } from "@/data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/nominees", "/stories", "/the-ballon-dont", "/ceremony", "/fan-zone", "/vote", "/winners"].map(
    (path) => ({
      url: `https://ballondont.local${path}`,
      lastModified: new Date("2026-09-12"),
    }),
  );

  const hubs = HUBS.map((hub) => ({
    url: `https://ballondont.local/nominees/${hub.slug}`,
    lastModified: new Date("2026-09-12"),
  }));

  const players = nominees.map((nominee) => ({
    url: `https://ballondont.local/nominees/player/${nominee.slug}`,
    lastModified: new Date("2026-09-12"),
  }));

  const articles = stories.map((story) => ({
    url: `https://ballondont.local/stories/${story.slug}`,
    lastModified: new Date(story.date),
  }));

  return [...staticRoutes, ...hubs, ...players, ...articles];
}
