import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

// import Nav from "@/components/Nav";

// export const dynamic = "force-dynamic"; // Ensures layout and nested pages are dynamically rendered

// const user = [
//   { path: "/", name: "Home" },
//   { path: "/products", name: "Products" },
//   { path: "/orders", name: "Orders" },
//   // { path: "/account", name: "Account" },
//   // { path: "/account/orders", name: "Orders" },
//   // { path: "/account/logout", name: "Logout" },
// ];

// export default function UserLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <Nav routes={user} />
//       <div className="container my-6">{children}</div>
//     </>
//   );
// }

{
  /* @note

import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

*/
}
