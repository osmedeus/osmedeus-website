"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { GitHubIcon, HeartIcon, MenuIcon } from "@/components/ui/icons";
import { StarCount } from "@/components/ui/star-count";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { REPO_URL, SPONSOR_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#showcases", label: "Showcases" },
  { href: "#workflow", label: "Workflow" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // A reload or #hash jump can land mid-page: start from where we are.
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "nav-drop fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200",
        scrolled ? "bg-[var(--bg)]" : "border-transparent bg-transparent"
      )}
    >
      <nav className="frame flex h-14 items-center justify-between">
        <BrandMark preload />

        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="stripe-hover px-3 py-2 text-[13px] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Outline, not accent: the hero's GitHub button is the page's one
              filled control, and two of them compete. */}
          <SponsorButton className="hidden sm:inline-flex" />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="menu-in border-b bg-[var(--bg)] md:hidden">
          <div className="frame flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="stripe-hover border-b py-3 text-[14px] text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  GitHub
                  <StarCount />
                </a>
              </Button>
              <SponsorButton onClick={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SponsorButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={cn("cta-glow", className)}
    >
      <a
        href={SPONSOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <HeartIcon className="text-[var(--accent-fg)]" />
        Sponsoring
      </a>
    </Button>
  );
}
