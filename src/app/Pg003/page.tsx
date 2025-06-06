'use client';

import Image from 'next/image';
import './Pg003.css';
import { useMessage } from '@/lib/useMessage';

const Pg003: React.FC = () => {
  const getMessage = useMessage();
  const pg003_value_paragraphs = getMessage('Pg003', 'pg003_value');
  const pg003_about_items_paragraphs = getMessage('Pg003', 'pg003_about_items');

  return (
    <div className="pg003-wrapper">
      {/* Mission & Vision セクション */}
      <section className="pg003-mission-section">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_mission_title')}</h2>
        <div className="pg003-mission-grid">
          <div className="pg003-mission-text">
            <h3>Our Mission</h3>
            <p>{getMessage('Pg003', 'pg003_mission')}</p>

            <h3>Our Vision</h3>
            <p>{getMessage('Pg003', 'pg003_vision')}</p>

            <h3>Our Value</h3>
            <ul>
              {
                Array.isArray(pg003_value_paragraphs)
                  ? pg003_value_paragraphs.map((line: string, idx: number) => (
                    <li key={idx}>{line}</li>
                  ))
                  : <li>{pg003_value_paragraphs}</li>
              }
            </ul>
          </div>

          <div className="pg003-mission-image">
            <Image src="/image/company_people.jpg" alt="Company Team" width={500} height={360} />
          </div>
        </div>
      </section>

      {/* About セクション */}
      <section className="pg003-about-section">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_about_title')}</h2>
        <ul className="pg003-about-list">
          {
            Array.isArray(pg003_about_items_paragraphs)
              ? pg003_about_items_paragraphs.map((line: string, idx: number) => (
                <li key={idx}>{line}</li>
              ))
              : <li>{pg003_about_items_paragraphs}</li>
          }
        </ul>
      </section>

      {/* 想いセクション */}
      <section className="pg003-philosophy-section">
        <h2 className="pg003-section-title">{getMessage('Pg003', 'pg003_philosophy_title')}</h2>
        <p>{getMessage('Pg003', 'pg003_philosophy_text')}</p>
      </section>
    </div>
  );
};

export default Pg003;
