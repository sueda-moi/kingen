// ✅ RightFloatingBar.tsx
'use client';

import React from 'react';
import './RightFloatingBar.css';

const RightFloatingBar = () => {
  return (
    <div className="right-floating-bar">
      <button className="float-button gray">モデルハウス</button>
      <button className="float-button red">無料カタログ</button>
      <button className="float-button red">無料資料請求</button>
    </div>
  );
};

export default RightFloatingBar;