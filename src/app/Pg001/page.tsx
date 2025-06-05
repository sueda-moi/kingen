'use client';

import './Pg001.css';
import Image from 'next/image';
import { useMessage } from '@/lib/useMessage';

const Pg001: React.FC = () => {
  const getMessage = useMessage();

  return (
    <main className="pg001-container">
      {/* 🖼️ Hero Section */}
      <section className="pg001-hero">
        <Image src="/image/pg001-hero.jpg" alt="Hero" fill className="pg001-hero-image" />
        <div className="pg001-hero-text">
          <h1>{getMessage('Pg001','pg001_title')}</h1>
          <p>{getMessage('Pg001','pg001_subtitle')}</p>
        </div>
      </section>

      {/* 📰 News Section */}
      <section className="pg001-news">
        <h2 className="pg001-section-title">{getMessage('Pg001','pg001_news_title')}</h2>
        <ul className="pg001-news-list">
          <li><span className="pg001-news-date">2024.01.15</span> <span>[News] {getMessage('Pg001','pg001_news_1')}</span></li>
          <li><span className="pg001-news-date">2024.01.12</span> <span>{getMessage('Pg001','pg001_news_2')}</span></li>
          <li><span className="pg001-news-date">2023.12.28</span> <span>{getMessage('Pg001','pg001_news_3')}</span></li>
        </ul>
        <div className="pg001-news-more">View all</div>
      </section>

      {/* 🏢 Intro Section */}
      <section className="pg001-intro">
        <div className="pg001-intro-text">
          <h3>{getMessage('Pg001','pg001_intro_title')}</h3>
          <p>{getMessage('Pg001','pg001_intro_paragraph')}</p>
          <div className="pg001-intro-more">View more</div>
        </div>
        <div className="pg001-intro-image">
          <Image src="/image/pg001-intro.jpg" alt="Intro" width={600} height={400} />
        </div>
      </section>

      {/* ⭐ Features Section */}
      <section className="pg001-features">
        <h2 className="pg001-section-title">{getMessage('Pg001','pg001_features_title')}</h2>
        <div className="pg001-feature-grid">
          <div className="pg001-feature-card">
            <Image src="/image/pg001-feature1.jpg" alt="Feature 1" width={400} height={250} />
            <h4>① {getMessage('Pg001','pg001_feature1_title')}</h4>
            <p>{getMessage('Pg001','pg001_feature1_desc')}</p>
          </div>
          <div className="pg001-feature-card">
            <Image src="/image/pg001-feature2.jpg" alt="Feature 2" width={400} height={250} />
            <h4>② {getMessage('Pg001','pg001_feature2_title')}</h4>
            <p>{getMessage('Pg001','pg001_feature2_desc')}</p>
          </div>
          <div className="pg001-feature-card">
            <Image src="/image/pg001-feature3.jpg" alt="Feature 3" width={400} height={250} />
            <h4>③ {getMessage('Pg001','pg001_feature3_title')}</h4>
            <p>{getMessage('Pg001','pg001_feature3_desc')}</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Pg001;
