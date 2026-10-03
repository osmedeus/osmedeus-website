import { BrandMark } from "@/components/brand-mark";
import {
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DISCORD_URL,
  DOCS_URL,
  LINKEDIN_URL,
  REPO_URL,
  SITE_URL,
  TWITTER_URL,
} from "@/lib/links";

const columns = [
  {
    title: "Product",
    external: false,
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Workflow", href: "#workflow" },
    ],
  },
  {
    title: "Resources",
    external: true,
    links: [
      { label: "Documentation", href: DOCS_URL },
      { label: "Workflows", href: `${DOCS_URL}/workflows` },
      { label: "Blog", href: `${SITE_URL}/blog` },
      { label: "Changelog", href: `${REPO_URL}/releases` },
    ],
  },
  {
    title: "Community",
    external: true,
    links: [
      { label: "GitHub", href: REPO_URL },
      { label: "Discord", href: DISCORD_URL },
      { label: "Twitter", href: TWITTER_URL },
    ],
  },
];

const socialLinks = [
  { label: "GitHub", href: REPO_URL, icon: GitHubIcon },
  { label: "Discord", href: DISCORD_URL, icon: DiscordIcon },
  { label: "Twitter", href: TWITTER_URL, icon: TwitterIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--bg)]">
      <div className="frame py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <BrandMark />
            <p className="mt-4 max-w-xs text-[14px] leading-[150%] text-[var(--text-2)]">
              Modern orchestration engine for security automation. Build powerful
              workflows with declarative YAML.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
                  aria-label={link.label}
                >
                  <link.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow">{column.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} external={column.external}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 h-px bg-[var(--line)]" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[11px] tracking-[0.03em] text-[var(--text-3)]">
            &copy; {new Date().getFullYear()} Osmedeus. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex gap-6">
              <FooterLink href={`${SITE_URL}/privacy`}>Privacy Policy</FooterLink>
              <FooterLink href={`${SITE_URL}/terms`}>Terms of Service</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-[14px] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
    >
      {children}
    </a>
  );
}
