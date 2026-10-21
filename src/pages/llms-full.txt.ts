import type { APIRoute } from 'astro';
import { buildLlmsFull } from '../lib/llms';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('site is not configured');
  const body = await buildLlmsFull(site);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
