"use client";

import { ReactNode } from "react";

export function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="h-10 w-10 bg-secondary rounded-none" />
          {children}
          {/* <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                shadcn
              </a>
              . Hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Vercel
              </a>
              . Illustrations by{" "}
              <a
                href="https://popsy.co"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Popsy
              </a>
              . The source code is available on{" "}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p> */}
        </div>
        <div className="h-10 w-10 bg-secondary rounded-full" />
      </div>
    </footer>
  );
}
