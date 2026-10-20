/** Compare tool names from picks, guides and the feed without listing them by hand. */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9.+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Drop a parenthetical plan note from a product name. Leave source sentences intact. */
export function baseName(name: string): string {
  return normalize(name.replace(/\([^)]*\)/g, ' '));
}

export function toolId(name: string): string {
  return baseName(name).replace(/\s+/g, '-');
}

/** Word-boundary check so "Cursor" does not swallow "Cursor Bugbot" or the reverse. */
export function textHasName(text: string, name: string): boolean {
  const needle = baseName(name);
  if (needle.length < 3) return false;
  const hay = ` ${normalize(text)} `;
  return hay.includes(` ${needle} `);
}

/** Feed `tool` field against a pick name. A shorter feed name can match a longer pick ("Cursor" / "Cursor Bugbot"). */
export function newsMatchesTool(newsTool: string, toolName: string): boolean {
  const news = baseName(newsTool);
  const tool = baseName(toolName);
  if (news.length < 3 || tool.length < 3) return false;
  if (news === tool) return true;
  return tool.startsWith(`${news} `);
}
