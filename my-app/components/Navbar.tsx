"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Over mij" },
    { href: "/projects", label: "Projecten" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-cyan-400 text-xl font-bold tracking-wide">
          Anass<span className="text-gray-300">Dev</span>
        </h1>

        {/* Links */}
        <ul className="flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
