'use client';

import { useState } from 'react';
import './Pg005.css';
import { useMessage } from '@/lib/useMessage';
import { sendContact } from '@/lib/sendContact';


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
    <div className="pg005-wrapper">
      <h1 className="pg005-title">{getMessage('Pg005', 'pg005_title')}</h1>

      <div className="pg005-faq-list">
        {faqData.map((section, idx) => (
          <details key={idx} className="pg005-faq-item" open>
            <summary>{section.title}</summary>
            <ul>
              {section.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="pg005-contact">
        <button
          className="pg005-contact-btn"
          onClick={() => setModalOpen(true)}
        >
          {getMessage('Pg005', 'pg005_contact')}
        </button>
      </div>

      {modalOpen && (
        <div className="pg005-modal">
          <div className="pg005-modal-content">
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
            <button
              className="pg005-submit-btn"
              onClick={handleSubmit}
            >
              {getMessage('Pg005', 'form_submit')}
            </button>
            <button
              className="pg005-close-btn"
              onClick={() => setModalOpen(false)}
            >
              {getMessage('Pg005', 'form_close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pg005;
