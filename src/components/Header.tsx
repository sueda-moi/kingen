// ✅ Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import { useMessage } from '@/lib/useMessage';

import './Header.css'; // ✅ 独立CSS样式文件

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const getMessage = useMessage();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/Pg001', label: getMessage('Pg001', 'nav_pg001') },
    { path: '/Pg002', label: getMessage('Pg001', 'nav_pg002') },
    { path: '/Pg003', label: getMessage('Pg001', 'nav_pg003') },
    { path: '/Pg004', label: getMessage('Pg001', 'nav_pg004') },
    { path: '/Pg005', label: getMessage('Pg001', 'nav_pg005') },
    { path: '/Pg006', label: getMessage('Pg001', 'nav_pg006') },
  ];

  return (
    <header className={`custom-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="custom-header-inner">
        <div className="logo-group">
          <Image src="/image/headerImg.png" alt="Logo" width={40} height={40} />
          {!isMobile && <span className="company-name">金源株式会社</span>}
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            pathname === item.path ? (
              <span key={item.path} className="nav-item active">{item.label}</span>
            ) : (
              <Link key={item.path} href={item.path} className="nav-item">{item.label}</Link>
            )
          ))}
        </nav>

        <div className="header-right">
          {!isMobile && <LanguageSwitcher scrolled={scrolled} />}


          {isMobile && <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={28} /> : <FiAlignJustify size={28} />}
          </button>}
        </div>
      </div>
    </header>
  );
};

export default Header;


