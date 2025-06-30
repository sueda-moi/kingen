// components/FaqCard/FaqCard.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FaqCard.css';

type FaqCardProps = {
  title: string;
  questions: string[];
};

const FaqCard: React.FC<FaqCardProps> = ({ title, questions }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-card ${isOpen ? 'open' : ''}`}>
      <div className="faq-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="faq-title">{title}</span>
        <ChevronDown
          className={`faq-icon ${isOpen ? 'rotate' : ''}`}
          size={20}
          strokeWidth={2.2}
        />
      </div>
      {isOpen && (
        <ul className="faq-content">
          {questions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqCard;
