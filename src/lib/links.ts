/** Every outbound URL on the page, so a moved link is one edit, not five. */
export const SITE_URL = "https://osmedeus.org";
export const REPO_URL = "https://github.com/j3ssie/osmedeus";
export const REPO_API = "https://api.github.com/repos/j3ssie/osmedeus";
export const DOCS_URL = "https://docs.osmedeus.org";
export const SPONSOR_URL = `${DOCS_URL}/sponsor`;
export const DISCORD_URL = "https://discord.gg/mtQG2FQsYA";
export const TWITTER_URL = "https://twitter.com/OsijGov";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jessie-aiho/";

/*
 * Where the install command fetches from. A build-time env var, not the
 * request host: reading `headers()` made the page dynamic, so on Vercel every
 * visit ran a function (cache MISS, ~400 ms to first byte) instead of being
 * served from the CDN.
 */
export const INSTALL_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
