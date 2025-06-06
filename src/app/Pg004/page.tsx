'use client';

import Image from 'next/image';
import './Pg004.css';
import { useEffect, useState } from 'react';
import { useMessage } from '@/lib/useMessage';
import {
  FaBuilding, FaGlobeAsia, FaTools, FaCogs, FaChartLine, FaPlusCircle,
  FaUsers, FaRoute, FaHome, FaSitemap, FaHandshake
} from 'react-icons/fa';

import {
  MenuItem,
  SectionData,
  IconMap,
} from '@/types/Pg004';

const Pg004: React.FC = () => {
  const getMessage = useMessage();
  const [activeSection, setActiveSection] = useState('');
  const [showTop, setShowTop] = useState(false);

  const sectionsData = getMessage<SectionData>('Pg004', 'pg004_sections');
  const mainTitle = getMessage('Pg004', 'pg004_title');
  const subTitle = getMessage('Pg004', 'pg004_hero_subtitle');
  const sectionMain = getMessage('Pg004', 'pg004_section_main');
  const sectionSolution = getMessage('Pg004', 'pg004_section_solution');
  const sectionEvolution = getMessage('Pg004', 'pg004_section_evolution');
  const mainItems = getMessage<MenuItem[]>('Pg004', 'pg004_main_items');
  const solutionItems = getMessage<MenuItem[]>('Pg004', 'pg004_solution_items');
  const evolutionItems = getMessage<MenuItem[]>('Pg004', 'pg004_evolution_items');

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
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add('visible');
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
    newbiz: <FaPlusCircle />
  };

  const renderMenu = (title: string, items: MenuItem[]) => (
    <div className="submenu-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
              {iconMap[item.id]} {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="pg004-wrapper">
      <div className="pg004-submenu">
        {renderMenu(sectionMain, mainItems)}
        {renderMenu(sectionSolution, solutionItems)}
        {renderMenu(sectionEvolution, evolutionItems)}
      </div>

      <section className="pg004-hero">
        <Image src="/image/pg004-hero.jpg" alt="Business Content" fill className="pg004-hero-image" />
        <div className="pg004-hero-text">
          <h1>{mainTitle}</h1>
          <p>{subTitle}</p>
        </div>
      </section>

      <div className="pg004-body">
        {Object.entries(sectionsData).map(([key, val]) => (
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
