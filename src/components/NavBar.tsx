import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  links: { href: string; label: string }[];
}

export default function NavBar({ links }: NavBarProps) {
  return (
    <nav className="nav">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
