'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Navbar() {
  // usePathname() is a Next.js hook that returns the current URL's pathname
  const pathname = usePathname();

  // Check if the current path matches the link
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="logo-container">
        <img 
          src="/assets/fitnessLogo/blackBack.png" 
          alt="KeepFit Logo" 
          className="logo-img"
        />
        <span className="logo-text">KeepFit</span>
      </Link>
      <div className="nav-links">
        <Link 
          href="/bodyParts" 
          className={`nav-link ${isActive('/bodyParts') ? 'active' : ''}`}
        >
          Body Parts
        </Link>
        <Link 
          href="/muscles" 
          className={`nav-link ${isActive('/muscles') ? 'active' : ''}`}
        >
          Muscles
        </Link>
        <Link 
          href="/equipments" 
          className={`nav-link ${isActive('/equipments') ? 'active' : ''}`}
        >
          Equipments
        </Link>
      </div>
      <SearchBar />
    </nav>
  );
}

