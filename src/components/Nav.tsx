"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <main>
      <nav className="text-primary flex justify-center px-4">{children}</nav>
    </main>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "relative p-4 text-base text-muted-foreground font-medium transition-all duration-300 fade-in fade-out hover:text-primary/80 focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "transition-all text-primary"
      )}
    >
      {props.children}
    </Link>
  );
}

// "use client";

// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Nav({
//   routes,
// }: {
//   routes: { path: string; name: string }[];
// }) {
//   const pathname = usePathname();

//   return (
//     <nav className="text-primary flex justify-center px-4">
//       {routes.map((route) => (
//         <Link
//           key={route.path}
//           href={route.path}
//           className={cn(
//             "relative p-4 text-base text-muted-foreground font-medium transition-all duration-300 fade-in fade-out hover:text-primary/80 focus-visible:bg-secondary focus-visible:text-secondary-foreground",
//             pathname === route.path && "transition-all text-primary"
//           )}
//         >
//           {route.name}
//         </Link>
//       ))}
//     </nav>
//   );
// }

{
  /* @note

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <main>
      <nav className="text-primary flex justify-center px-4">
        {children}
      </nav>
    </main>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "relative p-4 text-base text-muted-foreground font-medium transition-all duration-300 fade-in fade-out hover:text-primary/80 focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "transition-all text-primary"
      )}
    >
      {props.children}
    </Link>
  );
}

<nav className="fixed left-0 right-0 top-0 z-10 text-primary flex justify-center px-4 border-border border-b backdrop-blur bg-gradient-to-b from-inherit to-transparent">
{pathname === props.href && (
  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground" />
  <span className="absolute inset-x-0 bottom-0 border-border border-b" />
)}

*/
}
