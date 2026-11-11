"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { PreferenceToggles } from "@/components/preferences/preference-toggles";
import { ButtonLink } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";

import { primaryNavigation } from "./navigation";

export function MobileMenu({ className }: { className?: string }) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const close = () => setOpenOn(null);

  return (
    <div className={className}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpenOn(pathname)}
        className="link-underline text-small font-medium"
      >
        Menu
      </button>
      <Drawer
        open={openOn === pathname}
        onOpenChange={(open) => setOpenOn(open ? pathname : null)}
        title="Menu"
        size="full"
      >
        <nav aria-label="Main">
          <ul className="space-y-2">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={
                    pathname.startsWith(item.href) ? "page" : undefined
                  }
                  className="link-reveal font-display text-display-md"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <PreferenceToggles
          layout="stacked"
          className="mt-12 border-t border-rule pt-8"
        />
        <ButtonLink href="/brief" onClick={close} className="mt-10">
          Start a brief
        </ButtonLink>
      </Drawer>
    </div>
  );
}
