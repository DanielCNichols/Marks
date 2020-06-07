import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <a href="www.github.com/">
        <FaGithub></FaGithub>
      </a>
      <span>2020</span>
    </div>
  );
}
