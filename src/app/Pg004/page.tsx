'use client';

import './Pg004.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ExpandableTab from '@/components/ExpandableTab/ExpandableTab';
import dynamic from 'next/dynamic';
// import InfoCardButton from '@/components/InfoCardButton/InfoCardButton';
// import styles from '@/components/InfoCardButton/InfoCardButton.module.css';
import { useMessage } from '@/lib/useMessage';
import { GreetingSection } from '@/components/GreetingSection/GreetingSection';
import { CompanyTimeline } from '@/components/CompanyTimeline/CompanyTimeline';
//import { useLocaleStore } from '@/store/useLocaleStore';

// ⚙️ Lottie animation (disabled SSR for client-side only)
const ScrollLottie = dynamic(() => import('@/components/ScrollLottie/ScrollLottie'), { ssr: false });

const Pg002: React.FC = () => {
  const sectionTeamRef = useRef<HTMLDivElement>(null);
  const sectionCompanyRef = useRef<HTMLDivElement>(null);
  const getMessage = useMessage();
  const paragraphLines = getMessage('Pg002', 'pg002_paragraph_2');


  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollTop + windowHeight >= fullHeight - 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      {/* 🔖 Summary section */}
      <div className="flex w-full pb-[60px] relative h-[800px] mb-8">
        <Image
          src="/image/pg002-bktop.jpg"
          alt="Summary Image"
          fill
          className="w-full block object-cover z-[100]"
        />
        <div className="summaryText-container">
          <h1>{getMessage('Pg002', 'pg002_title')}</h1>
          <p>{getMessage('Pg002', 'pg002_paragraph_1')}</p>
          {/* <p>{getMessage('Pg002', 'pg002_paragraph_2')}</p> */}
          {
            Array.isArray(paragraphLines)
              ? paragraphLines.map((line, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">{line}</p>
              ))
              : <p className="mb-4 leading-relaxed">{paragraphLines}</p>
          }

        </div>
      </div>

      {/* 👇 まだ最下部でなければ、スクロール誘導アニメーションを表示 */}
      {!isAtBottom && (
        <div className="scroll-lottie-wrapper">
          <ScrollLottie onClick={() => scrollToSection(sectionTeamRef)} />
        </div>
      )}

      {/* 🧩 詳細セクション */}
      <div className="flex flex-col gap-[30px] childContent">

        {/* 🏢 会社概要 */}
        <div className="section-detail" ref={sectionCompanyRef}>
          <ExpandableTab
            title={getMessage('Pg002', 'pg002_section_company_title')}
            subtitle={getMessage('Pg002', 'pg002_section_company_subtitle')}
          >
            <GreetingSection />
            <CompanyTimeline />

          </ExpandableTab>
        </div>

      </div>
    </div>
  );
};

export default Pg002;
