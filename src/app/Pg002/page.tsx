'use client';

import Image from 'next/image';
import './Pg002.css';
import { useMessage } from '@/lib/useMessage';

const Pg002: React.FC = () => {
  const getMessage = useMessage();
  const strengths = getMessage('Pg002', 'pg002_summary_items') || [];

  const grouped = Array.isArray(strengths)
    ? strengths.reduce<string[][]>((acc, cur: string) => {
      if (cur.startsWith('【') || cur.startsWith('＜')) {
        acc.push([cur]);
      } else {
        acc[acc.length - 1]?.push(cur);
      }
      return acc;
    }, [])
    : [];


  return (
    <div className="pg002-wrapper">
      <section className="pg002-section">
        <h2 className="pg002-title">{getMessage('Pg002', 'pg002_title')}</h2>

        <div className="pg002-grid">
          <div className="pg002-text">
            {grouped.map((block, idx) => (
              <div key={idx} className="pg002-block">
                <h3 className="pg002-subtitle">{block[0]}</h3>
                <ul className="pg002-list">
                  {block.slice(1).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pg002-image">
            <Image src="/image/pg002-bktop.jpg" alt="Kingen Strength" width={500} height={360} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pg002;










