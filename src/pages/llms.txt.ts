import type { APIRoute } from 'astro';
import { buildLlmsTxt } from '../lib/llms';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('site is not configured');
  const body = await buildLlmsTxt(site);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
