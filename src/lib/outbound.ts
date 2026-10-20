/** Vendor links are not sponsored. Affiliate URLs, once approved, are. */
export function outboundRel(affiliateUrl: string | null | undefined): string {
  return affiliateUrl ? 'sponsored nofollow noopener' : 'nofollow noopener';
}

export function outboundHref(url: string, affiliateUrl: string | null | undefined): string {
  return affiliateUrl ?? url;
}
