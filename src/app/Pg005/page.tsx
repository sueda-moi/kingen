'use client';

import { useState } from 'react';
import styles from './Pg005.module.css';
import { useMessage } from '@/lib/useMessage';
import { sendContact } from '@/lib/sendContact';
import { ChevronDown } from 'lucide-react';

interface FaqSection {
  title: string;
  questions: string[];
}

const Pg005: React.FC = () => {
  const getMessage = useMessage();
  const faqData = getMessage<FaqSection[]>('Pg005', 'faq_categories');

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = async () => {
    if (!name || (!email && !phone) || !message) {
      alert(getMessage('Pg005', 'form_error'));
      return;
    }

    try {
      await sendContact({ name, email, phone, message });
      alert(getMessage('Pg005', 'form_success'));
      setModalOpen(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert(getMessage('Pg005', 'form_fail'));
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{getMessage('Pg005', 'pg005_title')}</h1>

      <div className={styles.faqList}>
        {faqData.map((section, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div
              key={idx}
              className={`${styles.faqCard} ${isOpen ? styles.open : ''}`}
            >
              <div className={styles.faqHeader} onClick={() => toggleFaq(idx)}>
                <span className={styles.faqTitle}>{section.title}</span>
                <ChevronDown
                  className={`${styles.faqIcon} ${isOpen ? styles.rotate : ''}`}
                  size={20}
                  strokeWidth={2.2}
                />
              </div>
              {isOpen && (
                <ul className={styles.faqContent}>
                  {section.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.contact}>
        <button className={styles.contactBtn} onClick={() => setModalOpen(true)}>
          {getMessage('Pg005', 'pg005_contact')}
        </button>
      </div>

      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{getMessage('Pg005', 'form_title')}</h2>
            <label>
              {getMessage('Pg005', 'form_name_label')}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              {getMessage('Pg005', 'form_email_label')}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              {getMessage('Pg005', 'form_phone_label')}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label>
              {getMessage('Pg005', 'form_message_label')}
              <textarea
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              {getMessage('Pg005', 'form_submit')}
            </button>
            <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
              {getMessage('Pg005', 'form_close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pg005;
