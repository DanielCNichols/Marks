import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/DanielCNichols/Marks">
        <FaGithub></FaGithub>
      </a>
      <span>2020</span>
    </div>
  );
}
