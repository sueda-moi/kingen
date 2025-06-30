'use client';

import Image from 'next/image';
import './Pg004.css';
import { useEffect, useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import { FaBuilding, FaGlobeAsia, FaTools, FaCogs, FaChartLine, FaPlusCircle, FaUsers, FaRoute, FaHome, FaSitemap, FaHandshake } from 'react-icons/fa';

import { MenuItem, SectionData, IconMap, IconKey } from '@/types/Pg004';
import MobileSubmenu from '@/components/MobileSubmenu/MobileSubmenu';

const Pg004: React.FC = () => {
  const getMessage = useMessage();
  const [activeSection, setActiveSection] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionsData = getMessage<SectionData>('Pg004', 'pg004_sections');
  const mainTitle = getMessage('Pg004', 'pg004_title');
  const subTitle = getMessage('Pg004', 'pg004_hero_subtitle');

  const groupedItems = {
    main: [] as MenuItem[],
    solution: [] as MenuItem[],
    evolution: [] as MenuItem[],
  };

  const allSections = Object.entries(sectionsData);

  allSections.forEach(([id, section]) => {
    const category = section.category || 'main';
    groupedItems[category].push({ id: id as IconKey, label: section.title });
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowTop(scrollY > 300);

      const sections = document.querySelectorAll('h2[id]');
      let currentId = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentId = section.id;
        }
      });
      setActiveSection(currentId);

      const cards = document.querySelectorAll('.pg004-card');
      cards.forEach((card) => {
        if (!card.classList.contains('visible')) {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            card.classList.add('visible');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const iconMap: IconMap = {
    real_estate_sales: <FaBuilding />,
    development: <FaSitemap />,
    housing: <FaHome />,
    tourism: <FaRoute />,
    staffing: <FaUsers />,
    it_consulting: <FaTools />,
    international_trade: <FaGlobeAsia />,
    design: <FaBuilding />,
    consulting: <FaHandshake />,
    solution: <FaCogs />,
    collab: <FaPlusCircle />,
    dx: <FaChartLine />,
    newbiz: <FaPlusCircle />,
    it_development: <FaTools />,
    web_solution: <FaGlobeAsia />,
    global_biz: <FaHandshake />,
    startup: <FaChartLine />,
  };

  const renderMenu = (title: string, items: MenuItem[]) => (
    <div className="submenu-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
              {iconMap[item.id] ?? <FaBuilding />} {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="pg004-wrapper">
      {!isMobile && (
        <div className="pg004-submenu">
          {renderMenu(getMessage('Pg004', 'pg004_section_main'), groupedItems.main)}
          {renderMenu(getMessage('Pg004', 'pg004_section_solution'), groupedItems.solution)}
          {renderMenu(getMessage('Pg004', 'pg004_section_evolution'), groupedItems.evolution)}
        </div>

      )}

      {isMobile && (
        <MobileSubmenu iconMap={iconMap} groupedItems={groupedItems} />
      )}

      <section className="pg004-hero">
        <Image src="/image/pg004-hero.jpg" alt="Business Content" fill className="pg004-hero-image" />
        <div className="pg004-hero-text">
          <h1>{mainTitle}</h1>
          <p>{subTitle}</p>
        </div>
      </section>

      <div className="pg004-body">
        {allSections.map(([key, val]) => (
          <div key={key}>
            <h2 id={key}>{val.title}</h2>
            <div className="pg004-grid">
              {val.cards.map((text, idx) => (
                <div className="pg004-card" key={idx}>{text}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showTop && (
        <button className="pg004-top-btn" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
};

export default Pg004;
