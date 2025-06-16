export const prerender = false; // Not needed in 'server' mode
import { generateOG } from "@components/og";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const title = params.get("title") ?? "The Craft of UI";
  return generateOG({ title });
};