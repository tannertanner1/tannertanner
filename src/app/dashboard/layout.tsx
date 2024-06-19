import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/dashboard/products">Products</NavLink>
        <NavLink href="/dashboard/users">Customers</NavLink>
        <NavLink href="/dashboard/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

// import Nav from "@/components/Nav";

// export const dynamic = "force-dynamic"; // Ensures layout and nested pages are dynamically rendered

// const admin = [
//   { path: "/dashboard", name: "Dashboard" },
//   { path: "/dashboard/products", name: "Products" },
//   { path: "/dashboard/orders", name: "Orders" },
//   { path: "/dashboard/users", name: "Users" },
//   // { path: "/dashboard/settings", name: "Settings" },
// ];

// export default function AdminLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <Nav routes={admin} />
//       <div className="container my-6">{children}</div>
//     </>
//   );
// }

{
  /* @note

import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/dashboard/products">Products</NavLink>
        <NavLink href="/dashboard/users">Customers</NavLink>
        <NavLink href="/dashboard/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

*/
}
