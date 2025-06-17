'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MenuItem, IconMap } from '@/types/Pg004';
import './MobileSubmenu.css';


interface MobileSubmenuProps {
  iconMap: IconMap;
  groupedItems: {
    main: MenuItem[];
    solution: MenuItem[];
    evolution: MenuItem[];
  };
}

const MobileSubmenu: React.FC<MobileSubmenuProps> = ({ iconMap, groupedItems }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleScrollTo = (id: string) => {
    window.location.hash = id;
    setOpenSection(null); // 自动收起
  };

  const renderGroup = (title: string, key: keyof typeof groupedItems) => (
    <div className="mobile-submenu-group">
      <button
        className="mobile-submenu-toggle"
        onClick={() => setOpenSection(openSection === key ? null : key)}
      >
        <span>{title}</span>
        {openSection === key ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {openSection === key && (
        <ul className="mobile-submenu-list">
          {groupedItems[key].map((item) => (
            <li key={item.id}>
              <button onClick={() => handleScrollTo(item.id)}>
                {iconMap[item.id] ?? '•'} {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="mobile-submenu">
      {renderGroup('Main', 'main')}
      {renderGroup('Solution & Collaboration', 'solution')}
      {renderGroup('Evolution', 'evolution')}
    </div>
  );
};

export default MobileSubmenu;
