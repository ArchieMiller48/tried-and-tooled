/** Collapse whitespace and keep a meta description within the usual snippet length. */
export function clipMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const room = max - 1;
  let cut = clean.slice(0, room);
  const word = cut.lastIndexOf(' ');
  if (word >= 40) cut = cut.slice(0, word);
  cut = cut.replace(/[.,;:!? ]+$/g, '');
  return `${cut}…`;
}

/** Shorten the body, then keep a factual ending such as the pending-test label. */
export function clipMetaKeepingEnd(body: string, ending: string, max = 155): string {
  const clean = body.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const tail = ending.replace(/\s+/g, ' ').trim();
  const room = max - tail.length - 1;
  return `${clipMeta(clean, room)} ${tail}`;
}
