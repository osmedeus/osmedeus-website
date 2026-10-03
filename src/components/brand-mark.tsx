import Image from "next/image";
import Link from "next/link";

/** The logo and wordmark, linking home. Shared by the nav and the footer. */
export function BrandMark({ preload = false }: { preload?: boolean }) {
  return (
    // No prefetch: this IS "/", and prefetching it re-downloads the page's
    // own 70 KB RSC payload on every visit.
    <Link href="/" prefetch={false} className="flex items-center gap-2">
      <span className="logo-glow">
        {/* 96px WebP (1.3 KB), not the 8334px master PNG (2.4 MB): the
            static export ships images unoptimized, so the file is the size. */}
        <Image
          src="/osmedeus-logo-96.webp"
          alt="Osmedeus"
          width={28}
          height={28}
          className="block h-7 w-7"
          preload={preload}
        />
      </span>
      <span className="text-[15px] font-medium tracking-tight">Osmedeus</span>
    </Link>
  );
}
