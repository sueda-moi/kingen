// components/Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import { useMessage } from '@/lib/useMessage';
import { useLocaleStore } from '@/store/useLocaleStore';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {

  const getMessage = useMessage(); // メッセージ取得関数を使用

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false); //screen width detection 
  const [showLangMenu, setShowLangMenu] = useState(false);
  const pathname = usePathname();
  // const { messages } = useLocaleStore();
  // const headerMessages = messages['header'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 👇 2. screen width detection 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // init first time set up
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const navItems = [
  //   { path: '/Pg001', label: 'ホーム' },
  //   { path: '/Pg002', label: 'ネクサスの強み' },
  //   { path: '/Pg003', label: '企業情報' },
  //   { path: '/Pg004', label: '事業内容' },
  //   { path: '/Pg005', label: お問い合わせ},
  // { path: '/Pg006', label: 社内掲示板 },
  // ];
  const navItems = [
    { path: '/Pg001', label: getMessage('Pg001', 'nav_pg001') },
    { path: '/Pg002', label: getMessage('Pg001', 'nav_pg002') },
    { path: '/Pg003', label: getMessage('Pg001', 'nav_pg003') },
    { path: '/Pg004', label: getMessage('Pg001', 'nav_pg004') },
    { path: '/Pg005', label: getMessage('Pg001', 'nav_pg005') },
    { path: '/Pg006', label: getMessage('Pg001', 'nav_pg006') },
  ];


  return (
    <header className={`${scrolled ? 'scrolled' : ''}`}>

      <div className='home-vertical-container' >
        <div className="flex  items-center">
          {/* Logo */}
          <div className="logo-container flex-shrink-0 pt-[20px] pl-[20px]">
            <Image src="/image/headerImg.png" alt="Logo" width={75} height={75} />
            {!isMobile && (<p className="logo-text text-white text-[20px] font-bold">
              <span>金源株式会社</span>
              <span>Shared ambition is vital kingen between us</span>
            </p>
            )}

          </div>

          {/* Add onClick handler to toggle menu */}
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span>
              <FiAlignJustify size={24} color="white" />
            </span>
          </div>

          {/* Language Switcher (you can extract this as a component) */}
          {!isMobile && (
            <div className="lang-switcher">
              <LanguageSwitcher />
            </div>
          )}



        </div>



        {/* Mobile menu icon and navigation */}
        <div className="flex items-center justify-center w-full">


          {/* Navigation */}
          <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>

            {/* colose button，only show when nav open */}
            {isMenuOpen && isMobile && (
              <div className="close-icon"
                onClick={toggleMenu}>
                <FiX size={30} color="white" />
              </div>
            )}
            <ul className="nav-list">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <div key={item.path}>
                    {isActive ? (
                      <span className="nav-link active">{item.label}</span>
                    ) : (
                      <Link href={item.path}
                        className="nav-link"
                        onClick={toggleMenu}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              {isMobile && (
                <div className="mobile-lang-toggle">
                  <div className="nav-link" onClick={() => setShowLangMenu(!showLangMenu)}>
                    🌐 {getMessage('Pg001', 'language_toggle')}
                  </div>
                  {showLangMenu && (
                    <div className="mobile-lang-options">
                      {[
                        { code: 'ja', label: '日本語' },
                        { code: 'en', label: 'English' },
                        { code: 'zh', label: '中文' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            useLocaleStore.getState().setLocale(lang.code as 'ja' | 'en' | 'zh');
                            setShowLangMenu(false);
                          }}
                          className={`mobile-lang-button ${useLocaleStore.getState().locale === lang.code ? 'active' : ''
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </ul>

          </nav>
        </div>

      </div>




    </header>
  );
};

export default Header;
