"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { PreferenceToggles } from "@/components/preferences/preference-toggles";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useScrolled } from "@/hooks/use-scrolled";
import { cx } from "@/lib/cx";

import { MobileMenu } from "./mobile-menu";
import { primaryNavigation } from "./navigation";

const heroRoutes: ReadonlySet<string> = new Set(["/"]);

const residencesHref = "/residences";

const pageLinks = primaryNavigation.filter(
  (item) => item.href !== residencesHref,
);

export function SiteHeader({ residencesMenu }: { residencesMenu: ReactNode }) {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const [menuOn, setMenuOn] = useState<string | null>(null);
  const menuOpen = menuOn === pathname;
  const overHero = heroRoutes.has(pathname) && !scrolled && !menuOpen;

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOn(null);
      triggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const inside =
        event.target instanceof Node &&
        headerRef.current?.contains(event.target);
      if (!inside) setMenuOn(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const closeOnLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOn(null);
    }
  };

  return (
    <header
      ref={headerRef}
      data-over-hero={overHero}
      className={cx(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-base",
        overHero
          ? "border-transparent text-paper"
          : "border-rule bg-paper text-ink",
      )}
    >
      <Container className="flex h-header items-center justify-between gap-8">
        <Link href="/" className="font-display text-title">
          Lumen &amp; Lot
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8 text-small font-medium">
            <li>
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={menuOpen}
                aria-controls={panelId}
                aria-current={
                  pathname.startsWith(residencesHref) ? "page" : undefined
                }
                onClick={() => setMenuOn(menuOpen ? null : pathname)}
                className="link-reveal"
              >
                Residences
              </button>
            </li>
            {pageLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    pathname.startsWith(item.href) ? "page" : undefined
                  }
                  className="link-reveal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-8 xl:flex">
          <PreferenceToggles hideLabels tone={overHero ? "paper" : "ink"} />
          <ButtonLink href="/brief" variant="text">
            Start a brief
          </ButtonLink>
        </div>
        <MobileMenu className="xl:hidden" />
      </Container>
      <div
        id={panelId}
        hidden={!menuOpen}
        onClick={closeOnLink}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper text-ink transition-[opacity,translate,display] transition-discrete duration-base ease-out starting:-translate-y-2 starting:opacity-0"
      >
        {residencesMenu}
      </div>
    </header>
  );
}
