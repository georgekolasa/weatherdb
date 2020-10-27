import React from 'react';
import './styles/Preview.css';

export default function Preview() {
  return (
    <div className="preview-layout">
      <p>
        todo: preview when query data exists, message indicating make query
        otherwise
      </p>

      <p>
        todo: set up state management for queries. this wont be in this
        component, rather something higher up. Mobx is a decent solution, might
        overly be excessive though. zustand is in my opinion a better option
      </p>
    </div>
  );
}
